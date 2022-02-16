/**
 * @param {string[]} words
 * @param {number} k
 * @return {string[]}
 */
const topKFrequent = (words, k) => {
  const freq = {};

  for (let i = 0; i < words.length; i++) {
    if (freq[words[i]] === undefined) {
      freq[words[i]] = 1;
    } else {
      freq[words[i]]++;
    }
  }

  const sortedWords = Object.keys(freq);
  sortedWords.sort((a, b) => {
    const x = freq[a];
    const y = freq[b];

    if (x === y) {
      return a < b ? -1 : 1;
    } else {
      return y - x;
    }
  });

  const out = [];
  for (let i = 0; i < k; i++) {
    out.push(sortedWords[i]);
  }

  return out;
};
