/**
 * @param {number[]} prices
 * @param {number} fee
 * @return {number}
 */
var maxProfit = function (prices, fee) {
  let profit = 0,
    balance = -prices[0];

  for (let i = 1; i < prices.length; i++) {
    profit = Math.max(profit, balance + prices[i] - fee);
    balance = Math.max(balance, profit - prices[i]);
  }

  return profit;
};
