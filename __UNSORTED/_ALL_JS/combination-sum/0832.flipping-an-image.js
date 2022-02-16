/**
 * @param {number[][]} A
 * @return {number[][]}
 */
var flipAndInvertImage = function (A) {
  var reverse = function (row) {
    let start = 0;
    let end = row.length - 1;
    const x = new Array(row.length);

    while (end >= start) {
      x[start] = row[end];
      x[end] = row[start];

      end--;
      start++;
    }

    if (row.length % 2 === 1) {
      const mid = Math.floor((start + end) / 2);
      x[mid] = row[mid];
    }

    return x;
  };

  var flip = function (row) {
    const x = [];
    for (let i = 0; i < row.length; i++) {
      x[i] = row[i] === 0 ? 1 : 0;
    }

    return x;
  };

  const result = [];
  for (let i = 0; i < A.length; i++) {
    result[i] = flip(reverse(A[i]));
  }

  return result;
};
