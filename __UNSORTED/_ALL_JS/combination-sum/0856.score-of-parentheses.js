/**
 * @param {string} S
 * @return {number}
 */
var scoreOfParentheses = function (S) {
  let score = 0;
  let open = 0;

  for (let i = 0; i < S.length; i++) {
    if (S[i] === "(") {
      open++;
    } else {
      open--;
      if (S[i - 1] === "(") {
        score += Math.pow(2, open);
      }
    }
  }

  return score;
};
