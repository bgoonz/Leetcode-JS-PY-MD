/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function (s) {
  for (let i = 0, j = s.length - 1; i < j; i++, j--) {
    while (i < j && !isAlphaNumeric(s[i])) {
      i++;
    }

    while (i < j && !isAlphaNumeric(s[j])) {
      j--;
    }

    if (s.charAt(i).toLowerCase() !== s.charAt(j).toLowerCase()) {
      return false;
    }
  }

  return true;
};

function isAlphaNumeric(c) {
  const CHAR_CODE_A = 65;
  const CHAR_CODE_Z = 90;
  const CHAR_CODE_AS = 97;
  const CHAR_CODE_ZS = 122;
  const CHAR_CODE_0 = 48;
  const CHAR_CODE_9 = 57;

  let code = c.charCodeAt(0);

  if (
    (code >= CHAR_CODE_A && code <= CHAR_CODE_Z) ||
    (code >= CHAR_CODE_AS && code <= CHAR_CODE_ZS) ||
    (code >= CHAR_CODE_0 && code <= CHAR_CODE_9)
  ) {
    return true;
  }

  return false;
}
