const marketState = {
  symbol: 'NULL',
  bestBid: [`${Number.NEGATIVE_INFINITY}`, '0'],
  bestAsk: [`${Number.POSITIVE_INFINITY}`, '0'],
  orders: [],
  fills: [],
};

export const getOrderLevels = ({tickSize, ticksBack}) => {
  const bestBid = parseFloat(marketState.bestBid[0]);
  const ourBid = bestBid - ticksBack * tickSize;
  const bestAsk = parseFloat(marketState.bestAsk[0]);
  const ourAsk = bestAsk + ticksBack * tickSize;
  return {
    ourBid,
    ourAsk
  }
};

export const handleSnapshot = (snapshot) => {
  marketState.symbol = snapshot.data.s;
  marketState.bestBid = snapshot.data.b[0];
  marketState.bestAsk = snapshot.data.a[0];
  return marketState;
};

export const handleDelta = (delta) => {
  if(delta.data.b.length){
    marketState.bestBid = delta.data.b[0];
  }
  if(delta.data.a.length){
    marketState.bestAsk = delta.data.a[0];
  }
  return marketState;
};

export const handleFill = (fill) => {
  marketState.fills.push(fill);
};

export const handleOrder = (order) => {
  marketState.orders.push(order);
}

export default {
  handleDelta,
  handleFill,
  handleOrder,
  handleSnapshot,
}