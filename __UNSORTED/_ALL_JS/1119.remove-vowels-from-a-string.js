/**
 * @param {string} S
 * @return {string}
 */
var removeVowels = function (S) {
  let result = "";

  for (let i = 0; i < S.length; i++) {
    const c = S.charAt(i);
    if (c === "a" || c === "e" || c === "i" || c === "o" || c === "u") continue;
    result += c;
  }

  return result;
};
