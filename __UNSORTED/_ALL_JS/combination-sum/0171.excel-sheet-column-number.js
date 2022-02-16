/**
 * @param {string} s
 * @return {number}
 */
var titleToNumber = function (s) {
  let sum = 0;
  for (let i = s.length - 1; i >= 0; i--) {
    sum += Math.pow(26, i) * (s.charCodeAt(s.length - i - 1) - 64);
  }

  return sum;
};
