const scores = {
  I: 1,
  V: 5,
  X: 10,
  L: 50,
  C: 100,
  D: 500,
  M: 1000,
};

/**
 * @param {string} s
 * @return {number}
 */
const romanToInt = s => {
  let prev = s[s.length - 1];
  let num = scores[prev];
  for (let i = s.length - 2; i >= 0; i--) {
    const score = scores[s[i]];

    if (score < scores[prev]) {
      num -= score;
    } else {
      num += score;
    }

    prev = s[i];
  }

  return num;
};
