/**
 * @param {number[]} A
 * @return {boolean}
 */
const validMountainArray = A => {
  let i = 0;

  while (i + 1 < A.length && A[i] < A[i + 1]) {
    i++;
  }

  if (i === 0 || i === A.length - 1) {
    return false;
  }

  while (i + 1 < A.length && A[i] > A[i + 1]) {
    i++;
  }

  return i === A.length - 1;
};
