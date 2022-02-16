/**
 * @param {number} num
 * @return {boolean}
 */
const isPowerOfFour = num => {
  while (num !== 1 && Math.floor(num) !== 0) {
    num /= 4;
  }

  return num === 1;
};
