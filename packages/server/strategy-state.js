const marketState = {
  tradingEnabled: false,
  symbol: 'NULL',
  bestBid: [`${Number.NEGATIVE_INFINITY}`, '0'],
  bestAsk: [`${Number.POSITIVE_INFINITY}`, '0'],
  orders: [],
  fills: [],
};

export const getTradingEnabled = () => {
  return marketState.tradingEnabled;
}

export const setTradingEnabled = (tradingEnabled) => {
  marketState.tradingEnabled = tradingEnabled;
}

export const getOrderLevels = ({tickSize, ticksBack}) => {
  const bestBid = parseFloat(marketState.bestBid[0]);
  const ourBid = bestBid - ticksBack * tickSize;
  const bestAsk = parseFloat(marketState.bestAsk[0]);
  const ourAsk = bestAsk + ticksBack * tickSize;
  return {
    ourBid,
    ourAsk
  };
};

export const handleSnapshot = (snapshot) => {
  marketState.symbol = snapshot.s;
  marketState.bestBid = snapshot.b[0];
  marketState.bestAsk = snapshot.a[0];
  return marketState;
};

export const handleDelta = (delta) => {
  if(delta.b.length){
    marketState.bestBid = delta.b[0];
  }
  if(delta.a.length){
    marketState.bestAsk = delta.a[0];
  }
  return marketState;
};

export const handleFills = (fills) => {
  marketState.fills = [fills, marketState.fills];
};

export const handleOrders = (orders) => {
  const incommingOrderIds = orders.map((o) => o.orderId);
  const unaffectedOrders = marketState.filter(o => {
    return !incommingOrderIds.includes(o.orderId)
  });
  marketState.orders = [orders, unaffectedOrders];
}

export default {
  handleDelta,
  handleFills,
  handleOrders,
  handleSnapshot,
  getOrderLevels,
  getTradingEnabled,
  setTradingEnabled
}