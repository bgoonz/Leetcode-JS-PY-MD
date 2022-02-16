/**
 * @param {string} paragraph
 * @param {string[]} banned
 * @return {string}
 */
const mostCommonWord = (paragraph, banned) => {
  const wordCounts = {};
  let maxWord;
  let maxCount = 0;

  paragraph
    .split(/[!?',;.\ ]/gi)
    .filter((w) => w != "")
    .map((w) => w.toLowerCase())
    .forEach((word) => {
      if (banned.includes(word)) {
        return;
      }

      if (wordCounts[word] !== undefined) {
        wordCounts[word]++;
      } else {
        wordCounts[word] = 1;
      }

      if (maxCount < wordCounts[word]) {
        maxCount = wordCounts[word];
        maxWord = word;
      }
    });

  return maxWord;
};
