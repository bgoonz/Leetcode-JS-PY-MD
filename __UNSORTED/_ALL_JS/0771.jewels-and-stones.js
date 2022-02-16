/**
 * @param {string} J
 * @param {string} S
 * @return {number}
 */
const numJewelsInStones = (J, S) => {
  const jewels = new Set(J.split(""));
  let count = 0;

  for (let i = 0; i < S.length; i++) {
    if (jewels.has(S.charAt(i))) {
      count++;
    }
  }

  return count;
};
