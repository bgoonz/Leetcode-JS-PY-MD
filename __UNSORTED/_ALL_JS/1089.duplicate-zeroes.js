/**
 * @param {number[]} arr
 * @return {void} Do not return anything, modify arr in-place instead.
 */
var duplicateZeros = function (arr) {
  const indexes = [];
  const n = arr.length;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === 0) {
      indexes.push(i);
    }
  }

  for (let i = indexes.length - 1; i >= 0; i--) {
    arr.splice(indexes[i], 0, 0);
  }

  if (n < arr.length) {
    const diff = arr.length - n;
    arr.splice(arr.length - diff, diff);
  }
};
