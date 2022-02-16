/**
 * @param {string[]} words
 * @return {number}
 */
var uniqueMorseRepresentations = function (words) {
  const morse = [
    ".-",
    "-...",
    "-.-.",
    "-..",
    ".",
    "..-.",
    "--.",
    "....",
    "..",
    ".---",
    "-.-",
    ".-..",
    "--",
    "-.",
    "---",
    ".--.",
    "--.-",
    ".-.",
    "...",
    "-",
    "..-",
    "...-",
    ".--",
    "-..-",
    "-.--",
    "--..",
  ];
  const occurences = {};
  for (let i = 0; i < words.length; i++) {
    let m = Array.prototype.map
      .call(words[i], (c) => morse[c.charCodeAt(0) - 97])
      .join("");
    if (occurences[m] !== undefined) {
      occurences[m]++;
    } else {
      occurences[m] = 1;
    }
  }
  console.log(occurences);
  return Object.keys(occurences).length;
};
