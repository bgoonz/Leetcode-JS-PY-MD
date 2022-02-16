/**
 * @param {number} n
 * @return {number[]}
 */
var sumZero = function (n) {
  const mid = Math.floor(n / 2);

  const result = [];
  let x = -1;
  for (let i = mid - 1; i >= 0; i--) {
    result[i] = x--;
  }

  x = n % 2 === 1 ? 0 : 1;
  for (let i = mid; i < n; i++) {
    result[i] = x++;
  }

  return result;
};
