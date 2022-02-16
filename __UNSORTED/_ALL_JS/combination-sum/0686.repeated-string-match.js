/**
 * @param {string} A
 * @param {string} B
 * @return {number}
 */
var repeatedStringMatch = function (A, B) {
  let i = 0;
  let S = "";
  while (S.length < 10000 && S.indexOf(B) === -1) {
    S += A;
    i++;
  }

  if (S.indexOf(B) !== -1) {
    return i;
  }

  return -1;
};
