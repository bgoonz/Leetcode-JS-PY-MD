/**
 * @param {string} s
 * @return {number}
 */
var countSegments = function (s) {
  let count = 0;

  for (let i = 0; i < s.length; i++) {
    if (s.charAt(i) !== " " && (i === 0 || s.charAt(i - 1) === " ")) {
      count++;
    }
  }

  return count;
};
