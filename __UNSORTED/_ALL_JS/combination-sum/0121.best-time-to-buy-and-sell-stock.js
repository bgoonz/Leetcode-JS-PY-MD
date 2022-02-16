/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
  var min = Math.pow(2, 63);
  var max_profit = 0;

  for (var i = 0; i < prices.length; i++) {
    if (prices[i] < min) {
      min = prices[i];
    } else if (max_profit < prices[i] - min) {
      max_profit = prices[i] - min;
    }
  }

  return max_profit;
};
