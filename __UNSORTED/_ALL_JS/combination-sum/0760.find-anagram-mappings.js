/**
 * @param {number[]} A
 * @param {number[]} B
 * @return {number[]}
 */
var anagramMappings = function (A, B) {
  const result = [];
  for (let i = 0; i < A.length; i++) {
    result.push(B.indexOf(A[i]));
  }

  return result;
};
