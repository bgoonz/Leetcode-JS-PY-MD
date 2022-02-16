/**
 * @param {string} paragraph
 * @param {string[]} banned
 * @return {string}
 */
var mostCommonWord = function (paragraph, banned) {
  var wordCounts = {};
  var maxWord;
  var maxCount = 0;

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
