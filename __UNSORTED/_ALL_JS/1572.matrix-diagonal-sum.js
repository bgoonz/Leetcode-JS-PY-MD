/**
 * @param {number[][]} mat
 * @return {number}
 */
var diagonalSum = function (mat) {
  let s = 0;

  for (let i = 0; i < mat.length; i++) {
    s += mat[i][i];
    s += mat[i][mat.length - i - 1];
  }

  if (mat.length % 2 === 1) {
    const mid = Math.floor(mat.length / 2);
    s -= mat[mid][mid];
  }

  return s;
};
