/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function (coins, amount) {
  let dp = [];
  for (let i = 0; i <= amount; i++) {
    dp[i] = amount + 1;
  }

  dp[0] = 0;
  for (let i = 1; i < dp.length; i++) {
    for (v of coins) {
      if (i >= v) {
        dp[i] = Math.min(dp[i - v] + 1, dp[i]);
      }
    }
  }

  return dp[amount] === amount + 1 ? -1 : dp[amount];
};
