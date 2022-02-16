/**
 * @param {string} s
 * @return {number}
 */
const lengthOfLastWord = s => {
  let max = 0;
  for (let i = s.length - 1; i >= 0; i--) {
    if (s.charAt(i) !== " ") {
      max++;
    } else {
      if (max > 0) {
        return max;
      }
    }
  }

  return max;
};
