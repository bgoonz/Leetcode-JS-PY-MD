/**
 * @param {string} s
 * @return {boolean}
 */
const repeatedSubstringPattern = s => (s + s).slice(0, -1).slice(1).includes(s);
