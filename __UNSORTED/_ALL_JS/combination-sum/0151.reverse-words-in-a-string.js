/**
 * @param {string} s
 * @return {string}
 */
var reverseWords = function (s) {
  const input = s.split(" ");

  if (input.length === 1) {
    return input[0];
  }

  const words = [];
  for (let i = input.length - 1; i >= 0; i--) {
    if (input[i] !== "") words.push(input[i]);
  }

  return words.join(" ");
};
