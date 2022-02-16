/**
 * @param {number} numRows
 * @return {number[][]}
 */
var generate = function (numRows) {
  const out = [];
  for (let i = 0; i < numRows; i++) {
    out[i] = [1];
    out[i][i] = 1;

    for (let j = 1; j < i; j++) {
      out[i][j] = out[i - 1][j - 1] + out[i - 1][j];
    }
  }

  return out;
};
