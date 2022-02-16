/**
 * @param {string} s
 * @return {string}
 */
var reverseWords = function (s) {
  const stack = [];
  let rev = "";

  for (let i = 0; i < s.length; i++) {
    const c = s[i];

    if (c !== " ") {
      stack.push(c);
      continue;
    }

    while (stack.length) {
      rev += stack.pop();
    }

    rev += " ";
  }

  while (stack.length) {
    rev += stack.pop();
  }

  return rev;
};
