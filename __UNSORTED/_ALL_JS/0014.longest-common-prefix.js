/**
 * @param {string[]} strs
 * @return {string}
 */
const longestCommonPrefix = strs => {
  if (!strs.length) {
    return "";
  }

  let prefix = strs[0];
  for (let i = 1; i < strs.length; i++) {
    prefix = LCP(prefix, strs[i]);
  }

  return prefix;
};

var LCP = (s1, s2) => {
  let prefix = "";

  let start = 0;
  for (let i = start, j = start; i < s1.length && j < s2.length; i++, j++) {
    if (s1[i] !== s2[j]) {
      break;
    }

    prefix += s1[i];
  }

  return prefix;
};
