/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function (s) {
  let maxPalindrome = "";
  for (let i = 0; i < s.length; i++) {
    let s1 = expand(s, i, i);
    let s2 = expand(s, i, i + 1);

    if (s1.length > maxPalindrome.length) {
      maxPalindrome = s1;
    }

    if (s2.length > maxPalindrome.length) {
      maxPalindrome = s2;
    }
  }

  return maxPalindrome;
};

let expand = function (s, start, end) {
  while (s[start] === s[end] && start >= 0 && end < s.length) {
    start--;
    end++;
  }

  return s.slice(start + 1, end);
};
