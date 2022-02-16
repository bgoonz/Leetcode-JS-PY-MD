/**
 * @param {number} rowIndex
 * @return {number[]}
 */
var getRow = function (rowIndex) {
  const out = new Array(rowIndex + 1);
  const mid = Math.round(out.length / 2);

  for (let i = 0; i < mid; i++) {
    const value = combinations(rowIndex, i);
    out[i] = value;
    out[out.length - 1 - i] = value;
  }

  return out;
};

const memo = {};

const combinations = function (n, k) {
  let nFact = memo[n] || fact(n);
  let kFact = memo[k] || fact(k);
  let nkFact = memo[n - k] || fact(n - k);

  return nFact / (kFact * nkFact);
};

const fact = function (n) {
  if (n === 0) {
    return 1;
  }

  return n * fact(n - 1);
};
