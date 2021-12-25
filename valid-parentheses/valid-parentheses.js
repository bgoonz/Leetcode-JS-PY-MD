/**
 * @param {string} s
 * @return {boolean}
 */
let isValid = function (s) {
  let stack = [];

  s.split("").forEach(function (char) {
    if (char === "(" || char === "{" || char === "[") {
      stack.push(char);
    }

    if (char === ")") {
      if (stack.length > 0 && stack[stack.length - 1] === "(") {
        stack.pop();
      } else {
        stack.push(char);
      }
    }

    if (char === "]") {
      if (stack.length > 0 && stack[stack.length - 1] === "[") {
        stack.pop();
      } else {
        stack.push(char);
      }
    }

    if (char === "}") {
      if (stack.length > 0 && stack[stack.length - 1] === "{") {
        stack.pop();
      } else {
        stack.push(char);
      }
    }
  });

  return stack.length === 0;
};