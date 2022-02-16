/**
 * @param {number} n
 * @return {boolean}
 */
const isPowerOfTwo = n => {
  if (n === 1) {
    return true;
  }

  if (n <= 0) {
    return false;
  }

  let c = 1;
  for (let i = 0; i < n; i++) {
    c *= 2;

    if (c === n) {
      return true;
    }

    if (c > n) {
      return false;
    }
  }

  return false;
};
