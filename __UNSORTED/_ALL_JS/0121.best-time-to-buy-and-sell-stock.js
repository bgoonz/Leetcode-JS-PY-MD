/**
 * @param {number[]} prices
 * @return {number}
 */
const maxProfit = prices => {
  let min = Math.pow(2, 63);
  let max_profit = 0;

  for (let i = 0; i < prices.length; i++) {
    if (prices[i] < min) {
      min = prices[i];
    } else if (max_profit < prices[i] - min) {
      max_profit = prices[i] - min;
    }
  }

  return max_profit;
};
