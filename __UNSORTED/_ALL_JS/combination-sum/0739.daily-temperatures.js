/**
 * @param {number[]} T
 * @return {number[]}
 */
var dailyTemperatures = function (T) {
  const out = [];
  for (let i = 0; i < T.length; i++) {
    let j = i + 1;
    while (T[j] <= T[i] && j < T.length) {
      j++;
    }

    if (T[j] > T[i]) {
      out[i] = j - i;
    } else {
      out[i] = 0;
    }
  }

  return out;
};
