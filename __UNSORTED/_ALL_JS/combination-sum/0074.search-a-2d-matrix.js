/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function (matrix, target) {
  let arr = [];
  for (let i = 0; i < matrix.length; i++) {
    arr = arr.concat(matrix[i]);
  }

  let lo = 0,
    hi = arr.length - 1;
  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);

    if (arr[mid] === target) {
      return true;
    }

    if (arr[mid] > target) {
      hi = mid - 1;
    } else {
      lo = mid + 1;
    }
  }

  return false;
};
