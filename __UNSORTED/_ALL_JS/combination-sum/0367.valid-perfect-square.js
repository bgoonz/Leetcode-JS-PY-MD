/**
 * @param {number} num
 * @return {boolean}
 */
var isPerfectSquare = function (num) {
  let start = 0;
  let end = num;

  while (end >= start) {
    let mid = Math.floor((end + start) / 2);
    if (mid * mid > num) {
      end = mid - 1;
    } else if (mid * mid < num) {
      start = mid + 1;
    } else {
      return true;
    }
  }

  return false;
};
