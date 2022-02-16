/**
 * @param {string} s
 * @return {boolean}
 */
var canPermutePalindrome = function (s) {
  const o = {};

  for (let i = 0; i < s.length; i++) {
    if (o[s.charAt(i)] === undefined) {
      o[s.charAt(i)] = 0;
    }

    o[s.charAt(i)]++;
  }

  let count = 0;
  for (let [k, v] of Object.entries(o)) {
    if (v % 2 === 1) {
      count++;
    }
  }

  return count <= 1;
};
