/**
 * @param {string} s
 * @return {string}
 */
var reverseVowels = function (s) {
  let i = 0,
    j = s.length - 1,
    out = [...s],
    v = new Set(["a", "e", "i", "o", "u", "A", "E", "I", "O", "U"]);

  while (i < j) {
    while (i < j && !v.has(s.charAt(i))) {
      i++;
    }

    while (i < j && !v.has(s.charAt(j))) {
      j--;
    }

    out[i] = s.charAt(j);
    out[j] = s.charAt(i);
    i++;
    j--;
  }

  return out.join("");
};
