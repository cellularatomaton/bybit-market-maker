import { RestClientV5 } from 'bybit-api';

const API_KEY = process.env.REACT_APP_BYBIT_API_KEY;
const API_SECRET = process.env.REACT_APP_BYBIT_PRIVATE_KEY;

const useTestnet = true;

const client = new RestClientV5({
    key: API_KEY,
    secret: API_SECRET,
    testnet: useTestnet
  }
);

const getRestApi = () => {
  return {
    getInstrumentInfo: ({category, symbol, then}) => {
      client.getInstrumentsInfo({
        category,
        symbol
      })
      .then(response => {
        then(response);
      })
      .catch(error => {
        console.error('Error Getting Instrument Info:', error);
      });
    },
    getOpenOrders: ({category, symbol, then}) => {
      client.getActiveOrders({
        category,
        symbol
      }).then(response => {
          then(response);
        })
        .catch(rror => {
          console.error('Error Getting Open Orders:', error);
        })
    },
    placeBid: ({symbol, qty, price, then}) => {
      client.submitOrder({
        symbol: symbol,
        side: 'Buy',
        orderType: 'Limit',
        qty: qty,
        price: price,
        timeInForce: 'GTC'
      }).then(response => {
          then(response);
        })
        .catch(error => {
          console.error('Error Placing Bid:', error);
        });
    },
    placeAsk: ({symbol, qty, price, then}) => {
      client.submitOrder({
        symbol: symbol,
        side: 'Sell',
        orderType: 'Limit',
        qty: qty,
        price: price,
        timeInForce: 'GTC'
      }).then(response => {
          then(response);
        })
        .catch(error => {
          console.error('Error Placing Ask:', error);
        });
    },
    cancelAllOpenOrders: ({category, symbol, then}) => {
      client.cancelAllOrders({
        category,
        symbol
      }).then(response => {
          then(response);
        })
        .catch(error => {
          console.error('Error Cancelling All Open Orders:', error);
        });
    },
  };
}

export default getRestApi;