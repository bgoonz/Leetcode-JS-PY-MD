/**
 * @param {string[]} words
 * @param {string} order
 * @return {boolean}
 */
const isAlienSorted = (words, order) => {
  const w = [];
  for (let i = 0; i < words.length; i++) {
    w[i] = words[i];
  }

  w.sort((a, b) => {
    let i = 0;
    let j = 0;
    while (i < a.length && j < b.length) {
      if (order.indexOf(a[i]) < order.indexOf(b[j])) {
        return -1;
      } else if (order.indexOf(a[i]) > order.indexOf(b[j])) {
        return 1;
      }

      i++;
      j++;
    }

    if (i === a.length && j < b.length) {
      return -1;
    } else if (i < b.length && j === b.length) {
      return 1;
    }

    return 0;
  });

  let i = 0;
  while (i < words.length) {
    if (words[i] != w[i]) {
      return false;
    }

    i++;
  }

  return true;
};
