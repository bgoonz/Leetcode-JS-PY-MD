/**
 * @param {number[]} A
 * @return {number[]}
 */
const sortedSquares = A => {
  A = A.map((x) => (x *= x));
  A.sort((a, b) => {
    if (a < b) {
      return -1;
    }

    if (a > b) {
      return 1;
    }

    return 0;
  });

  return A;
};
