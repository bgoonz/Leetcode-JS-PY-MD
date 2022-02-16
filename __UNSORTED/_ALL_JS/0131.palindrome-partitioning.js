/**
 * @param {string} s
 * @return {string[][]}
 */
const partition = s => {
  const results = [];
  dfs(s, 0, [], results);
  return results;
};

var dfs = (s, start, set, results) => {
  if (start >= s.length) {
    results.push(Array.from(set));
    return;
  }

  for (let end = start; end < s.length; end++) {
    if (isPalindrome(s, start, end)) {
      set.push(s.slice(start, end + 1));
      dfs(s, end + 1, set, results);
      set.pop();
    }
  }
};

const isPalindrome = (s, start, end) => {
  while (start < end) {
    if (s[start++] !== s[end--]) {
      return false;
    }
  }

  return true;
};
