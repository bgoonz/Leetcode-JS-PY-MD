/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function (s) {
  return isPalindromeHelper(s.replace(/[^a-zA-Z0-9]/gi, "").toLowerCase());
};

var isPalindromeHelper = function (s) {
  if (s.length < 2) return true;

  if (s.charAt(0) !== s.charAt(s.length - 1)) return false;

  return isPalindromeHelper(s.slice(1, s.length - 1));
};
