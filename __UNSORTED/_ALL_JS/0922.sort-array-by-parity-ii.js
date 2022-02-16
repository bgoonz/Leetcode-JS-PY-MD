/**
 * @param {number[]} A
 * @return {number[]}
 */
const sortArrayByParityII = A => {
  const out = [];

  let j = 0;
  let k = 1;
  for (let i = 0; i < A.length; i++) {
    if (A[i] % 2 === 0) {
      out[j] = A[i];
      j += 2;
    } else {
      out[k] = A[i];
      k += 2;
    }
  }

  return out;
};
