/**
 * @param {string} s
 * @return {number}
 */
const longestPalindrome = s => {
  const unique = new Set();

  for (let i = 0; i < s.length; i++) {
    if (unique.has(s[i])) {
      unique.delete(s[i]);
    } else {
      unique.add(s[i]);
    }
  }

  if (unique.size) {
    return s.length - (unique.size - 1);
  } else {
    return s.length;
  }
};
