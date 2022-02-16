/**
 * Forward declaration of guess API.
 * @param {number} num   your guess
 * @return 	            -1 if num is lower than the guess number
 *			             1 if num is higher than the guess number
 *                       otherwise return 0
 * var guess = function(num) {}
 */

/**
 * @param {number} n
 * @return {number}
 */
const guessNumber = n => {
  let lo = 1;
  let hi = n;

  while (lo <= hi) {
    let mid = Math.floor((lo + hi) / 2);
    const g = guess(mid);
    if (g === 0) {
      return mid;
    } else if (g === -1) {
      hi = mid - 1;
    } else {
      lo = mid + 1;
    }
  }

  return -1;
};
