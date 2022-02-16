/**
 * @param {number} N
 * @return {boolean}
 */
var isArmstrong = function (N) {
  let result = 0;
  let c = N;
  const digits = [];

  do {
    digits.push(c % 10);
    c = Math.floor(c / 10);
  } while (c);

  for (let i = 0; i < digits.length; i++) {
    result += Math.pow(digits[i], digits.length);
  }

  return result === N;
};
