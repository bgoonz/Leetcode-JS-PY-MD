/**
 * @param {number} num
 * @return {boolean}
 */
const checkPerfectNumber = num => {
  if (num === 0) return false;

  let sum = 0;
  for (let i = 1; i < num; i++) {
    if (num % i === 0) sum += i;

    if (sum > num) return false;
  }

  return num === sum;
};
