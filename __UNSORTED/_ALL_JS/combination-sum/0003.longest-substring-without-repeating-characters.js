/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  let set = new Set();
  let i = 0,
    j = 0,
    max = 0,
    n = s.length;

  while (i < n && j < n) {
    if (set.has(s[j])) {
      set.delete(s[i]);
      i++;
    } else {
      set.add(s[j]);
      max = Math.max(max, j - i + 1);
      j++;
    }
  }

  return max;
};
