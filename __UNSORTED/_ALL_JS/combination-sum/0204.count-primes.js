/**
 * @param {number} n
 * @return {number}
 */
var countPrimes = function (n) {
  let count = 0;

  for (let i = 2; i < n; i++) {
    if (isPrime(i)) count++;
  }

  return count;
};

var isPrime = function (x, memo) {
  const sqrt = Math.floor(Math.sqrt(x));
  for (let i = 2; i <= sqrt; i++) {
    if (x % i === 0) {
      return false;
    }
  }

  return true;
};
