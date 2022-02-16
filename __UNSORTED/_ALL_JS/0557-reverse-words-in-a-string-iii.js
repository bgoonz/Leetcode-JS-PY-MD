/**
 * @param {string} s
 * @return {string}
 */
const reverseWords = s => {
  const stack = [];
  let rev = "";

  for (const c of s) {
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
