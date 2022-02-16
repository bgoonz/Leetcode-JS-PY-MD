/**
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */
var longestCommonSubsequence = function (text1, text2) {
  const memo = [];

  for (let i = 0; i < text1.length; i++) {
    memo[i] = [];
  }

  return LCS(text1, text2, 0, 0, memo);
};

const LCS = function (text1, text2, i, j, memo) {
  if (i >= text1.length || j >= text2.length) {
    return 0;
  }

  if (memo[i][j] !== undefined) {
    return memo[i][j];
  }

  if (text1[i] === text2[j]) {
    const result = 1 + LCS(text1, text2, i + 1, j + 1, memo);
    memo[i][j] = result;
    return result;
  }

  const result = Math.max(
    LCS(text1, text2, i + 1, j, memo),
    LCS(text1, text2, i, j + 1, memo)
  );
  memo[i][j] = result;
  return result;
};
