/**
 * @param {string} s
 * @param {number[]} indices
 * @return {string}
 */
var restoreString = function (s, indices) {
  const out = [];

  for (let i = 0; i < s.length; i++) {
    out[indices[i]] = s[i];
  }

  return out.join("");
};
