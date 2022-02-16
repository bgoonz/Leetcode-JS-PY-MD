/**
 * @param {number[]} citations
 * @return {number}
 */
var hIndex = function (citations) {
  citations.sort((a, b) => {
    return a > b ? 1 : -1;
  });

  let i = 0;
  while (i < citations.length && citations[citations.length - 1 - i] > i) {
    i++;
  }

  return i;
};
