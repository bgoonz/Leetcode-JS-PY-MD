/**
 * @param {string} S
 * @return {number[][]}
 */
var largeGroupPositions = function (S) {
  const out = [];
  let prev = "",
    count = 0,
    i = 0,
    startIdx = 0;

  while (i < S.length) {
    let c = S.charAt(i);

    if (c !== prev) {
      prev = c;

      if (count > 2) {
        out.push([startIdx, i - 1]);
      }

      startIdx = i;
      count = 1;
    } else {
      count++;
    }

    i++;
  }

  if (count > 2) {
    out.push([startIdx, i - 1]);
  }

  return out;
};
