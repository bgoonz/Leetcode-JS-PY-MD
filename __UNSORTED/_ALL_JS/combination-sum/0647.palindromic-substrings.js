/**
 * @param {string} s
 * @return {number}
 */
var countSubstrings = function (s) {
  let count = 0;

  var expand = function (s, start, end) {
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
