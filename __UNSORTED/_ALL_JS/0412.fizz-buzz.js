/**
 * @param {number} n
 * @return {string[]}
 */
const fizzBuzz = n => Array.from({ length: n }, (i, v) => v + 1).map((i) => {
  if (i % 5 === 0) {
    if (i % 3 === 0) {
      return "FizzBuzz";
    }

    return "Buzz";
  }

  if (i % 3 === 0) {
    return "Fizz";
  }

  return `${i}`;
});
