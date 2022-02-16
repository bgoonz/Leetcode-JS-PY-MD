/**
 * @param {string} S
 * @return {number[]}
 */
const diStringMatch = S => {
  const result = [];
  let lo = 0;
  let hi = S.length;

  for (let i = 0; i < S.length; i++) {
    if (S.charAt(i) === "I") {
      result.push(lo);
      lo++;
    } else {
      result.push(hi);
      hi--;
    }
  }

  return result.concat([lo]);
};
