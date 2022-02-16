const memo = {
  0: 0,
  1: 1,
  2: 1,
};

/**
 * @param {number} n
 * @return {number}
 */
var tribonacci = function (n) {
  if (memo[n] !== undefined) return memo[n];

  const result = tribonacci(n - 3) + tribonacci(n - 2) + tribonacci(n - 1);
  memo[n] = result;

  return result;
};
