/**
 * @param {string[]} words
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
const shortestDistance = (words, word1, word2) => {
  const positions = {
    [word1]: [],
    [word2]: [],
  };

  for (let i = 0; i < words.length; i++) {
    if (words[i] === word1) positions[word1].push(i);
    else if (words[i] === word2) positions[word2].push(i);
  }

  let min = Number.MAX_SAFE_INTEGER;
  for (let i = 0; i < positions[word1].length; i++) {
    for (let j = 0; j < positions[word2].length; j++) {
      const diff = Math.abs(positions[word1][i] - positions[word2][j]);
      if (diff < min) min = diff;
    }
  }

  return min;
};
