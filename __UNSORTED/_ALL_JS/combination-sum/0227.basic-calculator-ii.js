/**
 * @param {string} s
 * @return {number}
 */
var calculate = function (s) {
  let currentNumber = "";
  let result = 0;
  let op = "+";
  let stack = [];

  for (let i = 0; i < s.length; i++) {
    const code = s.charCodeAt(i);

    if (code >= 48 && code <= 57) {
      currentNumber += s[i];
    }

    if ((s[i] !== " " && (code < 48 || code > 57)) || i === s.length - 1) {
      if (op === "+") {
        stack.push(parseInt(currentNumber));
      } else if (op === "-") {
        stack.push(-parseInt(currentNumber));
      } else if (op === "*") {
        stack.push(stack.pop() * parseInt(currentNumber));
      } else {
        stack.push(Math.trunc(stack.pop() / parseInt(currentNumber)));
      }
      op = s[i];
      currentNumber = "";
    }
  }

  while (stack.length) {
    result += stack.pop();
  }

  return result;
};
