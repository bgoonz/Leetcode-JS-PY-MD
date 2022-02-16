/**
 * @param {number} n
 * @return {number}
 */
var trailingZeroes = function (n) {
  if (n === 0) {
    return 0;
  }

  return Math.floor(n / 5) + trailingZeroes(Math.floor(n / 5));
};
