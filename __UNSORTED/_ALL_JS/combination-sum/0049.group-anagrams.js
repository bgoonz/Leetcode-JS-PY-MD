/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function (strs) {
  const groups = {};

  for (let i = 0; i < strs.length; i++) {
    const chars = strs[i].split("");
    chars.sort((a, b) => a.charCodeAt(0) - b.charCodeAt(0));
    const sortedStr = chars.join("");

    if (groups[sortedStr]) {
      groups[sortedStr].push(strs[i]);
    } else {
      groups[sortedStr] = [strs[i]];
    }
  }

  return Object.values(groups);
};
