import axios from 'axios';
const baseUrl = '';

const getRestApi = () => {
  return {
    getInstrumentInfo: (category, symbol, callback) => {
      axios.get(`${baseUrl}/v5/market/instruments-info?category=${category}&symbol=${symbol}`)
        .then(response => {
          callback(response.data);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    },
    placeBatchOrder: (callback) => {
      axios.get(`${baseUrl}/v5/order/create-batch`)
        .then(response => {
          callback(response.data);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    },
    cancelAllOpenOrders: (callback) => {
      axios.get(`${baseUrl}/v5/order/cancel-all`)
        .then(response => {
          callback(response.data);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    },
  };
}

export default getRestApi;