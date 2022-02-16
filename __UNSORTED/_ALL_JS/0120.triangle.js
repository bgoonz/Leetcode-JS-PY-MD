/**
 * @param {number[][]} triangle
 * @return {number}
 */
const minimumTotal = triangle => {
  if (!triangle.length) return 0;

  let dp = new Array(triangle.length);
  for (let i = 0; i < dp.length; i++) {
    dp[i] = 0;
  }
  dp[0] = triangle[0][0];

  for (let i = 1; i < triangle.length; ++i) {
    for (let j = triangle[i].length - 1; j >= 0; --j) {
      if (j === 0) {
        dp[j] = dp[j] + triangle[i][j];
      } else if (j === triangle[i].length - 1) {
        dp[j] = dp[j - 1] + triangle[i][j];
      } else {
        dp[j] = Math.min(dp[j], dp[j - 1]) + triangle[i][j];
      }
    }
  }

  return Math.min(...dp);
};
