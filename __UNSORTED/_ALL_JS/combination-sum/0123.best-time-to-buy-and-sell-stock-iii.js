/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
  let t1Cost = Number.MAX_SAFE_INTEGER,
    t1Profit = -Number.MAX_SAFE_INTEGER,
    t2Cost = Number.MAX_SAFE_INTEGER,
    t2Profit = -Number.MAX_SAFE_INTEGER;

  for (let i = 0; i < prices.length; i++) {
    t1Cost = Math.min(prices[i], t1Cost);
    t1Profit = Math.max(prices[i] - t1Cost, t1Profit);

    t2Cost = Math.min(prices[i] - t1Profit, t2Cost);
    t2Profit = Math.max(prices[i] - t2Cost, t2Profit);
  }

  return t2Profit;
};
