/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function (s, t) {
  if (s.length !== t.length) {
    return false;
  }

  let counter = [];
  const aCode = "a".charCodeAt(0);

  for (let i = 0; i < 26; i++) {
    counter[i] = 0;
  }

  for (let i = 0; i < s.length; i++) {
    counter[s[i].charCodeAt(0) - aCode]++;
    counter[t[i].charCodeAt(0) - aCode]--;
  }

  for (let i = 0; i < 26; i++) {
    if (counter[i] !== 0) {
      return false;
    }
  }

  return true;
};
