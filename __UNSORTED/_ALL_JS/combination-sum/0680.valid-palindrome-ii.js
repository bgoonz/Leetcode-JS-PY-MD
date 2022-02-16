/**
 * @param {string} s
 * @return {boolean}
 */
var validPalindrome = function (s) {
  let start = 0,
    end = s.length - 1;

  while (start < end) {
    if (s[start] !== s[end]) {
      const s1 = s.slice(0, start) + s.slice(start + 1);
      const s2 = s.slice(0, end) + s.slice(end + 1);

      return isPalindrome(s1) || isPalindrome(s2);
    }

    start++;
    end--;
  }

  return true;
};

const isPalindrome = (s) => {
  let start = 0,
    end = s.length - 1;

  while (start < end) {
    if (s[start++] !== s[end--]) return false;
  }

  return true;
};
