/**
 * @param {number} L
 * @param {number} R
 * @return {number}
 */
const countPrimeSetBits = (L, R) => {
  let count = 0;
  const primes = [2, 3, 5, 7, 11, 13, 17, 19];

  for (let i = L; i <= R; i++) {
    const str = Number(i).toString(2);
    const chars = [];
    for (let j = 0; j < str.length; j++) {
      chars.push(str.charAt(j));
    }

    let ones = 0;
    for (let k = 0; k < chars.length; k++) {
      if (chars[k] === "1") ones++;
    }

    if (primes.includes(ones)) count++;
  }

  return count;
};
