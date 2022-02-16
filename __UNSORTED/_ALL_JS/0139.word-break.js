/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
const wordBreak = (s, wordDict) => {
  const memo = {};
  const dict = {};
  for (let i = 0; i < wordDict.length; i++) {
    dict[wordDict[i]] = 1;
  }

  let helper = start => {
    if (start === s.length) {
      return true;
    }

    if (memo[start] !== undefined) {
      return memo[start];
    }

    for (let end = start + 1; end <= s.length; end++) {
      const slice = s.slice(start, end);
      if (dict[slice] && helper(end)) {
        memo[start] = true;
        return true;
      }
    }

    memo[start] = false;
    return false;
  };

  return helper(0);
};
