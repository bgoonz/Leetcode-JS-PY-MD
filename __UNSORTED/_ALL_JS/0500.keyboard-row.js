/**
 * @param {string[]} words
 * @return {string[]}
 */
const findWords = words => {
  const rows = [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    ["z", "x", "c", "v", "b", "n", "m"],
  ];
  const out = [];

  for (let i = 0; i < words.length; i++) {
    let f = false;
    let s = false;
    let t = false;
    let ok = true;
    for (let j = 0; j < words[i].length; j++) {
      if (rows[0].includes(words[i].charAt(j))) f = true;
      if (rows[1].includes(words[i].charAt(j))) s = true;
      if (rows[2].includes(words[i].charAt(j))) t = true;

      if ((f && s) || (f && t) || (s && t)) {
        ok = false;
        break;
      }
    }

    ok && out.push(words[i]);
  }

  return out;
};
