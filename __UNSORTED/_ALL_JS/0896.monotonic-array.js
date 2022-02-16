/**
 * @param {number[]} A
 * @return {boolean}
 */
const isMonotonic = A => {
  if (A.length < 3) {
    return true;
  }

  return isIncreasing(A) || isDecreasing(A);
};

var isIncreasing = A => {
  for (let i = 1; i < A.length; i++) {
    if (A[i - 1] > A[i]) {
      return false;
    }
  }
  return true;
};

var isDecreasing = A => {
  for (let i = 1; i < A.length; i++) {
    if (A[i - 1] < A[i]) {
      return false;
    }
  }
  return true;
};
