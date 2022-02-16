/**
 * @param {string} keyboard
 * @param {string} word
 * @return {number}
 */
var calculateTime = function (keyboard, word) {
  let time = 0;

  if (word === "") return time;

  if (word.length === 1) return keyboard.indexOf(word.charAt(0));

  time += keyboard.indexOf(word.charAt(0));
  for (let i = 1; i < word.length; i++) {
    time += Math.abs(
      keyboard.indexOf(word.charAt(i)) - keyboard.indexOf(word.charAt(i - 1))
    );
  }

  return time;
};
