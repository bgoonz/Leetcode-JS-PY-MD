/**
 * @param {string} S
 * @param {string} T
 * @return {boolean}
 */
const backspaceCompare = (S, T) => typed(S) === typed(T);

var typed = S => {
  const stack = [];
  for (let i = 0; i < S.length; i++) {
    if (S.charAt(i) === "#") stack.pop();
    else stack.push(S.charAt(i));
  }

  return stack.join("");
};
