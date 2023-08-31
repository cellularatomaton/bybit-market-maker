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

export const getOrderLevels = ({tickSize, tickPrecision, ticksBack}) => {
  const bestBid = parseFloat(marketState.bestBid[0]);
  const ourBid = (bestBid - ticksBack * tickSize).toFixed(tickPrecision);
  const bestAsk = parseFloat(marketState.bestAsk[0]);
  const ourAsk = (bestAsk + ticksBack * tickSize).toFixed(tickPrecision);
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
  marketState.fills = [...fills, ...marketState.fills];
};

export const handleOrders = (orders) => {
  const cancelledOrFilledIds = orders
    .filter(o => {
      return o.orderStatus === 'Cancelled' || o.orderStatus === 'Filled';
    })
    .map((o) => o.orderId);
  const remainingCurrentOrders = marketState.orders.filter(o => {
    return !cancelledOrFilledIds.includes(o.orderId)
  });
  const remainingNewOrders = orders.filter(o => {
    return !cancelledOrFilledIds.includes(o.orderId)
  });

  marketState.orders = [...remainingNewOrders, ...remainingCurrentOrders];
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