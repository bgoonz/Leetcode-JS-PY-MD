/**
 * @param {number} n
 * @return {boolean}
 */
const isPowerOfThree = n => {
  if (n === 1) {
    return true;
  }

  if (n === 0) {
    return false;
  }

  while (n) {
    n /= 3;

    if (n === 1) {
      return true;
    }

    if (n < 1) {
      return false;
    }
  }
};
