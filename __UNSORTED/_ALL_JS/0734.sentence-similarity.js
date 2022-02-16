/**
 * @param {string[]} sentence1
 * @param {string[]} sentence2
 * @param {string[][]} similarPairs
 * @return {boolean}
 */
const areSentencesSimilar = (sentence1, sentence2, similarPairs) => {
  if (sentence1.length !== sentence2.length) {
    return false;
  }

  const similar = {};
  for (let i = 0; i < similarPairs.length; i++) {
    const a = similarPairs[i][0];
    const b = similarPairs[i][1];

    if (!similar[a]) {
      similar[a] = new Set([b]);
    } else {
      similar[a].add(b);
    }

    if (!similar[b]) {
      similar[b] = new Set([a]);
    } else {
      similar[b].add(a);
    }
  }

  for (let i = 0; i < sentence1.length; i++) {
    if (
      sentence1[i] !== sentence2[i] &&
      (!similar[sentence1[i]] || !similar[sentence1[i]].has(sentence2[i])) &&
      (!similar[sentence2[i]] || !similar[sentence2[i]].has(sentence1[i]))
    ) {
      return false;
    }
  }

  return true;
};
