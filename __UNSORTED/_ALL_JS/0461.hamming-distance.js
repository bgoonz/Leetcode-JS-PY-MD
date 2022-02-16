/**
 * @param {number} x
 * @param {number} y
 * @return {number}
 */
const hammingDistance = (x, y) => {
  const hammingWeight = n => {
    let mask = 1;
    let count = 0;
    while (mask > 0) {
      if ((n & mask) !== 0) {
        count++;
      }

      mask = mask << 1;
    }

    return count;
  };

  return hammingWeight(x ^ y);
};
