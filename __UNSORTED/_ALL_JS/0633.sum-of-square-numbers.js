/**
 * @param {number} c
 * @return {boolean}
 */
const judgeSquareSum = c => {
  for (let a = 0; a ** 2 <= c; a++) {
    if (Number.isInteger(Math.sqrt(c - a ** 2))) {
      return true;
    }
  }

  return false;
};
