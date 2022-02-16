/**
 * @param {number} x
 * @return {number}
 */
var reverse = function (x) {
  let rev = 0;
  let negative = x < 0;

  x = Math.abs(x);

  while (x) {
    rev = rev * 10 + (x % 10);

    if (rev >= Math.pow(2, 31)) {
      return 0;
    }

    x = Math.floor(x / 10);
  }

  return negative ? 0 - rev : rev;
};
