/**
 * @param {string} word
 * @return {boolean}
 */
var detectCapitalUse = function (word) {
  if (word.toUpperCase() === word) {
    return true;
  }

  if (word.toLowerCase() === word) {
    return true;
  }

  if (word.length > 1 && word.charAt(0) === word.charAt(0).toUpperCase()) {
    const substr = word.slice(1);
    if (substr.toLowerCase() === substr) {
      return true;
    }
  }

  return false;
};
