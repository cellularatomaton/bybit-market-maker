import React, { useEffect, useContext } from 'react';
import createWebSocketConnection from './WebSocketService';
import getRestApi from './RestApiService';
import MarketContext from './MarketContext';

function WebSocketComponent() {
  useEffect(() => {
    const { marketState, setMarketState } = useContext(MarketContext);
    const ws = createWebSocketConnection(
      'wss://stream-testnet.bybit.com/v5/public/spot', 
      handleWebSocketMessage
    );
    const topic = 'orderbook.1.BTCUSDT';
    ws.on("connect", () => {
      console.log("Websocket Connected.");
      console.log(`Subscribing To ${topic}`);
      ws.emit(
        'eventType', 
        // Subscribing level 1 orderbook
        {
            "req_id": "test", // optional
            "op": "subscribe",
            "args": [ topic ]
        }
      );
    });

    return () => {
      ws.disconnect();
    };
  }, []);

  const handleWebSocketMessage = (message) => {
    console.log('Websocket Handler: message');
    console.dir(message);
  };

  return (
    <></>
  );
}

export default WebSocketComponent;
