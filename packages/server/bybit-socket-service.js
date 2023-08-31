import { WebsocketClient } from 'bybit-api';

const API_KEY = process.env.REACT_APP_BYBIT_API_KEY;
const PRIVATE_KEY = process.env.REACT_APP_BYBIT_PRIVATE_KEY;

const createByBitSocketConnection = (onOpenCallback, onMessageCallback) => {
  
  const wsConfig = {
    key: API_KEY,
    secret: PRIVATE_KEY,
    /*
      The following parameters are optional:
    */
    // Connects to livenet by default. Set testnet to true to use the testnet environment.
    testnet: true,
    // If you can, use the v5 market (the newest generation of Bybit's websockets)
    market: 'v5',
    // The older generations of Bybit's websockets are still available under the previous markets:
    // market: 'linear',
    // market: 'inverse',
    // market: 'spotv3',
    // market: 'usdcOption',
    // market: 'usdcPerp',
    // market: 'unifiedPerp',
    // market: 'unifiedOption',

    // how long to wait (in ms) before deciding the connection should be terminated & reconnected
    // pongTimeout: 1000,

    // how often to check (in ms) that WS connection is still alive
    // pingInterval: 10000,

    // how long to wait before attempting to reconnect (in ms) after connection is closed
    // reconnectTimeout: 500,

    // config options sent to RestClient (used for time sync). See RestClient docs.
    // restOptions: { },

    // config for axios used for HTTP requests. E.g for proxy support
    // requestOptions: { }

    // override which URL to use for websocket connections
    // wsUrl: 'wss://stream.bytick.com/realtime'
  };

  const ws = new WebsocketClient(wsConfig);

  // (before v5) subscribe to multiple topics at once
  // ws.subscribe(['position', 'execution', 'trade']);

  // (before v5) and/or subscribe to individual topics on demand
  // ws.subscribe('kline.BTCUSD.1m');

  // (v5) subscribe to multiple topics at once
  // ws.subscribeV5(['orderbook.50.BTCUSDT', 'orderbook.50.ETHUSDT'], 'linear');

  // (v5) and/or subscribe to individual topics on demand
  // ws.subscribeV5('position', 'linear');
  // ws.subscribeV5('publicTrade.BTC', 'option');

  // Listen to events coming from websockets. This is the primary data source
  ws.on('update', (data) => {
    // console.log('update', data);
    // console.dir(data);
    onMessageCallback(data);
  });

  // Optional: Listen to websocket connection open event (automatic after subscribing to one or more topics)
  ws.on('open', ({ wsKey, event }) => {
    console.log('connection open for websocket with ID: ' + wsKey);
    onOpenCallback(ws, wsKey);
  });

  // Optional: Listen to responses to websocket queries (e.g. the response after subscribing to a topic)
  ws.on('response', (response) => {
    console.log('response', response);
  });

  // Optional: Listen to connection close event. Unexpected connection closes are automatically reconnected.
  ws.on('close', () => {
    console.log('connection closed');
  });

  // Optional: Listen to raw error events. Recommended.
  ws.on('error', (err) => {
    console.error('error', err);
  });

    return ws;
  };

export default createByBitSocketConnection;
