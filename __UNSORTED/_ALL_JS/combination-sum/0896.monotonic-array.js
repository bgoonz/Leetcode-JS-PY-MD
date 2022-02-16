/**
 * @param {number[]} A
 * @return {boolean}
 */
var isMonotonic = function (A) {
  if (A.length < 3) {
    return true;
  }

  return isIncreasing(A) || isDecreasing(A);
};

var isIncreasing = function (A) {
  for (let i = 1; i < A.length; i++) {
    if (A[i - 1] > A[i]) {
      return false;
    }
  }
  return true;
};

var isDecreasing = function (A) {
  for (let i = 1; i < A.length; i++) {
    if (A[i - 1] < A[i]) {
      return false;
    }
  }
  return true;
};
