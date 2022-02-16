/**
 * @param {string[]} words
 * @return {number[][]}
 */
const palindromePairs = words => {
  const results = [];

  for (let i = 0; i < words.length; i++) {
    for (let j = 0; j < words.length; j++) {
      if (i === j) {
        continue;
      }

      let p = words[i] + words[j];

      let k = 0;
      let m = p.length - 1;
      if (p.charAt(k) !== p.charAt(m)) {
        continue;
      }

      while (k < m && p.charAt(k) === p.charAt(m)) {
        k++;
        m--;
      }

      if (p.charAt(k) === p.charAt(m) && k - m <= 1) {
        results.push([i, j]);
      }
    }
  }

  return results;
};
