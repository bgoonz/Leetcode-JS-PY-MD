/**
 * @param {string} s
 * @return {number}
 */
var firstUniqChar = function (s) {
  const freq = {};

  for (let i = 0; i < s.length; i++) {
    if (freq[s.charAt(i)] === undefined) {
      freq[s.charAt(i)] = 1;
    } else {
      freq[s.charAt(i)]++;
    }
  }

  for (let i = 0; i < s.length; i++) {
    if (freq[s.charAt(i)] === 1) {
      return i;
    }
  }

  return -1;
};
