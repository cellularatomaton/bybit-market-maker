import dotEnv from 'dotenv';
import createByBitSocketConnection from './bybit-socket-service.js';
import getRestApi from './bybit-rest-api-service.js';
import {
  handleDelta, 
  handleSnapshot, 
  handleOrders, 
  handleFills,
  getOrderLevels,
  getTradingEnabled,
  setTradingEnabled
} from './strategy-state.js';
import WebSocket from 'ws';
import throttle from 'lodash.throttle';

dotEnv.config();
console.log(JSON.stringify(process.env));
const category = 'spot';
const symbol = 'BTCUSDT';
const orderSize = 0.01;
const ticksBack = 1;

const bybitRest = getRestApi();
let commands = null;

// Create the WebSocket for the UI:
const uiWebsocketServer = new WebSocket.Server({ port: 8080 });
uiWebsocketServer.on('connection', (uiWebsocket) => {
  console.log('Client connected');

  // Handle incoming messages
  uiWebsocket.on('message', (message) => {
      console.log(`Received: ${message}`);
      if(commands){
        const json = JSON.parse(message);
        if(json.command === 'START'){
          setTradingEnabled(true);
          commands.startStrategy();
        }else if(json.command === 'STOP'){
          setTradingEnabled(false);
          commands.stopStrategy();
        }
      }
  });

  // Handle disconnection
  uiWebsocket.on('close', () => {
      console.log('Client disconnected');
  });
});
uiWebsocketServer.on('error', (error) => {
  console.error(`WebSocket error: ${error}`);
});

const updateUi = (marketState) => {
  const json = JSON.stringify(marketState)
  throttle((uiUpdate) => {
    uiWebsocketServer.clients.forEach((client) => {
      if(client.readyState === WebSocket.OPEN){
        client.send(uiUpdate);
      }
    });
  }, 100)(json);
};

// Configure Strategy:
const configureStrategy = (then) => {
  bybitRest.getInstrumentInfo({
    category,
    symbol,
    then: (infoResponse) => {
      const infos = infoResponse.result.list;
      const symbolInfo = infos.filter(i => {
        return i.symbol === symbol;
      })[0];

      const tickPrecision = symbolInfo.priceFilter.tickSize.split('.')[1].length
      const tickSize = parseFloat(symbolInfo.priceFilter.tickSize).toFixed(tickPrecision);
      
      const startStrategy = () => {
        console.log(`Starting Strategy.`);
        const tradingEnabled = getTradingEnabled();
        console.log(`Trading Enabled: ${tradingEnabled}`);
        if(tradingEnabled){
          const {ourBid, ourAsk} = getOrderLevels({
            tickSize,
            tickPrecision, 
            ticksBack
          });
          bybitRest.placeBid({
            category,
            symbol, 
            qty: orderSize, 
            price: ourBid, 
            then: ()=>{} 
          });
          bybitRest.placeAsk({
            category,
            symbol, 
            qty: orderSize, 
            price: ourAsk, 
            then: ()=>{} 
          });
        }
      };

      const updateStrategy = () => {
        console.log(`Updating Strategy.`);
        bybitRest.cancelAllOpenOrders({
          category,
          symbol,
          then: ()=> {
            console.log(`Restarting Strategy.`);
            startStrategy();
          }
        });
      };

      const stopStrategy = () => {
        console.log(`Stopping Strategy.`);
        bybitRest.cancelAllOpenOrders({
          category,
          symbol,
          then: ()=> {}
        });
      };

      commands = {
        startStrategy,
        stopStrategy
      };

      const handleWebSocketMessage = (payload) => {
        // Route:
        const topic = payload.topic;
        if(topic==='order'){
          // Route Order
          console.log(JSON.stringify(payload));
          if(payload.data.some(o => o.orderStatus === 'Filled')){
            updateStrategy();
          }
          handleOrders(payload.data);
        }else if(topic === 'execution'){
          // Route Fill
          console.log(JSON.stringify(payload));
          handleFills(payload.data);
        }else{
          // Route Market Update
          const type = payload.type;
          if(type === 'snapshot'){
            console.log(JSON.stringify(payload));
            const marketState = handleSnapshot(payload.data);
            updateUi(marketState);
          }
          else if(type === 'delta'){
            const marketState = handleDelta(payload.data);
            updateUi(marketState);
          }
        }
      };
      
      const handleWebSocketOpen = (bybit, key) => {
        console.log('Websocket Handler: "open"');
      };
    
      const bybitSocket = createByBitSocketConnection(
        handleWebSocketOpen,
        handleWebSocketMessage,
      );
      bybitSocket.subscribeV5([`orderbook.1.${symbol}`, 'execution', 'order'], 'spot');
      
    }
  })
  
};

configureStrategy();

