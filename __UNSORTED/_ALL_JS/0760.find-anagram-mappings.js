/**
 * @param {number[]} A
 * @param {number[]} B
 * @return {number[]}
 */
const anagramMappings = (A, B) => {
  const result = [];
  for (let i = 0; i < A.length; i++) {
    result.push(B.indexOf(A[i]));
  }

  return result;
};
