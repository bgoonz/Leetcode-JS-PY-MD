/**
 * @param {number} num
 * @return {boolean}
 */
const isUgly = num => {
  if (num === 0) {
    return false;
  }

  if (num === 1) {
    return true;
  }

  const divisors = [2, 3, 5];
  for (d of divisors) {
    while (num % d === 0) {
      num = num / d;

      if (num === 1) {
        return true;
      }
    }
  }

  return false;
};
