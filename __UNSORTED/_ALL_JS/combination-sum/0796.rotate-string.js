/**
 * @param {string} A
 * @param {string} B
 * @return {boolean}
 */
var rotateString = function (A, B) {
  return A.length === B.length && (A + A).includes(B);
};
