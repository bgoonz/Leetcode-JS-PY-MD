/**
 * @param {string} S
 * @return {string}
 */
const reverseOnlyLetters = S => {
  const stack = [];
  const out = new Array(S.length).map((x) => undefined);

  for (let i = 0; i < S.length; i++) {
    const c = S.charAt(i);
    if (isLetter(c)) {
      stack.push(c);
    } else {
      out[i] = c;
    }
  }

  for (let i = 0; i < out.length; i++) {
    if (out[i] === undefined) {
      out[i] = stack.pop();
    }
  }

  return out.join("");
};

var isLetter = a => {
  const c = a.charCodeAt(0);

  return (c >= 65 && c <= 90) || (c >= 97 && c <= 122);
};
