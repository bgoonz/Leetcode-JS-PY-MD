/**
 * @param {number} n
 * @return {boolean}
 */
var isHappy = function (n) {
  let counter = 0;

  do {
    n = squareDigitsSum(n);

    counter++;
  } while (counter < 100 && n !== 1);

  if (counter === 100) {
    return false;
  }

  return true;
};

const squareDigitsSum = function (x) {
  let s = 0;

  while (x) {
    const c = x % 10;
    s += c ** 2;

    x = Math.floor(x / 10);
  }

  return s;
};
