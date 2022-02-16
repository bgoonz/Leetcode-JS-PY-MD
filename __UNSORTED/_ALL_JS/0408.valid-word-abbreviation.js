/**
 * @param {string} word
 * @param {string} abbr
 * @return {boolean}
 */
const validWordAbbreviation = (word, abbr) => {
  if (abbr.length > word.length) {
    return false;
  }

  let i = 0;
  let j = 0;
  let number = 0;
  while (i < word.length) {
    let c = parseInt(abbr[j]);

    if (isNaN(c)) {
      if (word[i] !== abbr[j]) {
        return false;
      } else {
        i++;
        j++;
      }
    } else {
      const next = parseInt(abbr[j + 1]);
      if (!isNaN(next)) {
        if (c === 0 && next > 0) {
          return false;
        }

        c = 10 * c + next;
        j += 2;
      } else {
        j += 1;
      }

      i += c;
    }
  }

  return i === word.length && j === abbr.length;
};
