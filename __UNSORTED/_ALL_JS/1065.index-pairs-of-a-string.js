/**
 * @param {string} text
 * @param {string[]} words
 * @return {number[][]}
 */
var indexPairs = function (text, words) {
  const out = [];

  for (let i = 0; i < text.length; i++) {
    for (let j = 0; j < words.length; j++) {
      if (
        text[i] === words[j][0] &&
        words[j] === text.slice(i, i + words[j].length)
      ) {
        out.push([i, i + words[j].length - 1]);
      }
    }
  }

  out.sort((a, b) => {
    if (a[0] < b[0]) {
      return -1;
    } else if (a[0] > b[0]) {
      return 1;
    }

    if (a[1] < b[1]) {
      return -1;
    } else if (a[1] > b[1]) {
      return 1;
    }

    return 0;
  });

  return out;
};
