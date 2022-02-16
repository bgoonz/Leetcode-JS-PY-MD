/**
 * @param {number[]} citations
 * @return {number}
 */
const hIndex = citations => {
  citations.sort((a, b) => a > b ? 1 : -1);

  let i = 0;
  while (i < citations.length && citations[citations.length - 1 - i] > i) {
    i++;
  }

  return i;
};
