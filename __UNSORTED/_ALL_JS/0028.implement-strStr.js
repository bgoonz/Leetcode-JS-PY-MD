/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
const strStr = (haystack, needle) => {
  if (!needle.length) {
    return 0;
  }

  if (!haystack.length) {
    return -1;
  }

  for (let i = 0; i < haystack.length; i++) {
    if (haystack.charAt(i) === needle.charAt(0)) {
      if (haystack.slice(i, i + needle.length) === needle) {
        return i;
      }
    }
  }

  return -1;
};
