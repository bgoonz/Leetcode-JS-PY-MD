/**
 * @param {number} left
 * @param {number} right
 * @return {number[]}
 */
var selfDividingNumbers = function (left, right) {
  const results = [];

  for (let x = left; x <= right; x++) {
    let y = x;
    let ok = true;
    while (y && ok) {
      let c = y % 10;

      if (c === 0 || x % c > 0) ok = false;

      y = Math.floor(y / 10);
    }

    if (ok) results.push(x);
  }

  return results;
};
