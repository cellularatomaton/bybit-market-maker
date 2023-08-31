import { RestClientV5 } from 'bybit-api';

const API_KEY = process.env.BYBIT_API_KEY;
const API_SECRET = process.env.BYBIT_PRIVATE_KEY;

const client = new RestClientV5({
    key: API_KEY,
    secret: API_SECRET,
    testnet: true
  },
);

const getRestApi = () => {
  return {
    getInstrumentInfo: ({category, symbol, then}) => {
      const infoRequest = {
        category,
        symbol
      };
      console.log(`Requesting Info:`);
      console.dir(infoRequest);
      client.getInstrumentsInfo(infoRequest)
      .then(response => {
        console.log(`Handling Info Response:`);
        console.dir(response);
        then(response);
      })
      .catch(error => {
        console.error('Error Getting Instrument Info:', error);
      });
    },
    getOpenOrders: ({category, symbol, then}) => {
      const activeOrderRequest = {
        category,
        symbol
      };
      console.log(`Requesting Active Orders:`);
      console.dir(activeOrderRequest);
      client.getActiveOrders(activeOrderRequest).then(response => {
          console.log(`Handling Active Orders Response:`);
          console.dir(response);
          then(response);
        })
        .catch(error => {
          console.error('Error Getting Open Orders:', error);
        })
    },
    placeBid: ({category, symbol, qty, price, then}) => {
      const bid = {
        category,
        symbol,
        qty: `${qty}`,
        price: `${price}`,
        side: 'Buy',
        orderType: 'Limit',
        timeInForce: 'PostOnly',
        isLeverage: 0
      };
      console.log(`Placing Bid:`);
      console.dir(bid);
      client.submitOrder(bid)
        .then(response => {
          console.log(`Handling Bid Response:`);
          console.dir(response);
          then(response);
        })
        .catch(error => {
          console.error('Error Placing Bid:', error);
        });
    },
    placeAsk: ({category, symbol, qty, price, then}) => {
      const ask = {
        category,
        symbol,
        qty: `${qty}`,
        price: `${price}`,
        side: 'Sell',
        orderType: 'Limit',
        timeInForce: 'PostOnly',
        isLeverage: 0
      };
      console.log(`Placing Ask:`);
      console.dir(ask);
      client.submitOrder(ask)
        .then(response => {
          console.log(`Handling Ask Response:`);
          console.dir(response);
          then(response);
        })
        .catch(error => {
          console.error('Error Placing Ask:', error);
        });
    },
    cancelAllOpenOrders: ({category, symbol, then}) => {
      const info = {
        category,
        symbol
      };
      console.log(`Cancel All:`);
      console.dir(info);
      client.cancelAllOrders({
        category,
        symbol
      }).then(response => {
          console.log(`Cancel All Response:`);
          console.dir(response);
          then(response);
        })
        .catch(error => {
          console.error('Error Cancelling All Open Orders:', error);
        });
    },
  };
}

export default getRestApi;