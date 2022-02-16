/**
 * @param {number[]} A
 * @return {number}
 */
var peakIndexInMountainArray = function (A) {
  let x = A[0];
  for (let i = 1; i < A.length; i++) {
    if (A[i] < x) {
      return i - 1;
    }

    x = A[i];
  }
};
