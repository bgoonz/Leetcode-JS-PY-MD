/**
 * @param {number[]} prices
 * @return {number}
 */
const maxProfit = prices => {
  let t1Cost = Number.MAX_SAFE_INTEGER;
  let t1Profit = -Number.MAX_SAFE_INTEGER;
  let t2Cost = Number.MAX_SAFE_INTEGER;
  let t2Profit = -Number.MAX_SAFE_INTEGER;

  for (let i = 0; i < prices.length; i++) {
    t1Cost = Math.min(prices[i], t1Cost);
    t1Profit = Math.max(prices[i] - t1Cost, t1Profit);

    t2Cost = Math.min(prices[i] - t1Profit, t2Cost);
    t2Profit = Math.max(prices[i] - t2Cost, t2Profit);
  }

  return t2Profit;
};
