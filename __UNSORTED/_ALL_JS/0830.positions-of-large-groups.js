/**
 * @param {string} S
 * @return {number[][]}
 */
const largeGroupPositions = S => {
  const out = [];
  let prev = "";
  let count = 0;
  let i = 0;
  let startIdx = 0;

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
