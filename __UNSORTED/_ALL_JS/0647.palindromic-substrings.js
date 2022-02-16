/**
 * @param {string} s
 * @return {number}
 */
const countSubstrings = s => {
  let count = 0;

  const expand = (s, start, end) => {
    while (s[start] === s[end] && start >= 0 && end < s.length) {
      start--;
      end++;
      count++;
    }
  };

  for (let i = 0; i < s.length; i++) {
    expand(s, i, i);
    expand(s, i, i + 1);
  }

  return count;
};
