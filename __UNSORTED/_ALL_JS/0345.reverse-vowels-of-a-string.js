/**
 * @param {string} s
 * @return {string}
 */
const reverseVowels = s => {
  let i = 0;
  let j = s.length - 1;
  let out = [...s];
  let v = new Set(["a", "e", "i", "o", "u", "A", "E", "I", "O", "U"]);

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
