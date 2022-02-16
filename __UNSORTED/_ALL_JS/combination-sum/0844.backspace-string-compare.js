/**
 * @param {string} S
 * @param {string} T
 * @return {boolean}
 */
var backspaceCompare = function (S, T) {
  return typed(S) === typed(T);
};

var typed = function (S) {
  const stack = [];
  for (let i = 0; i < S.length; i++) {
    if (S.charAt(i) === "#") stack.pop();
    else stack.push(S.charAt(i));
  }

  return stack.join("");
};
