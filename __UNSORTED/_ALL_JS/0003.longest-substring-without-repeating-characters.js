/**
 * @param {string} s
 * @return {number}
 */
const lengthOfLongestSubstring = s => {
  let set = new Set();
  let i = 0;
  let j = 0;
  let max = 0;
  let n = s.length;

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
