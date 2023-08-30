import dotEnv from 'dotenv';
import createByBitSocketConnection from './bybit-socket-service.js';
import { handleDelta, handleSnapshot } from './strategy-state.js';
import WebSocket from 'ws';
import throttle from 'lodash.throttle';

dotEnv.config();

const uiWebsocketServer = new WebSocket.Server({ port: 8080 });
uiWebsocketServer.on('connection', (uiWebsocket) => {
  console.log('Client connected');

  // Handle incoming messages
  uiWebsocket.on('message', (message) => {
      console.log(`Received: ${message}`);
      // The UI is Read Only.
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

const setupByBit = () => {
  const handleWebSocketMessage = (payload) => {
    // Route:
    if(payload.type === 'snapshot'){
      console.log('Websocket Handler: "snapshot"');
      // console.dir(payload);
      console.log(JSON.stringify(payload));
      const marketState = handleSnapshot(payload);
      updateUi(marketState);
    }
    else if(payload.type === 'delta'){
      const marketState = handleDelta(payload);
      updateUi(marketState);
    }
  };
  
  const handleWebSocketOpen = (bybit, key) => {
    console.log('Websocket Handler: "open"');
  };

  const bybitSocket = createByBitSocketConnection(
    handleWebSocketOpen,
    handleWebSocketMessage,
  );
  bybitSocket.subscribeV5(['orderbook.1.BTCUSDT', 'execution', 'order'], 'spot');
};

setupByBit();

