/**
 * @param {number[]} widths
 * @param {string} S
 * @return {number[]}
 */
const numberOfLines = (widths, S) => {
  let lines = 1;
  let lineWidth = 0;
  for (let i = 0; i < S.length; i++) {
    const w = widths[S.charCodeAt(i) - 97];

    if (lineWidth + w > 100) {
      lines++;
      lineWidth = w;
    } else {
      lineWidth += w;
    }
  }

  return [lines, lineWidth];
};
