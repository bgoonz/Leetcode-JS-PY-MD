/**
 * @param {string} num
 * @return {boolean}
 */
const isStrobogrammatic = num => {
  const strob = {
    0: 0,
    1: 1,
    2: -1,
    3: -1,
    4: -1,
    5: -1,
    6: 9,
    7: -1,
    8: 8,
    9: 6,
  };

  let i = 0;
  let j = num.length - 1;
  while (i <= j) {
    const char1 = Number.parseInt(num.charAt(i));
    const char2 = Number.parseInt(num.charAt(j));

    if (strob[char1] === -1 || strob[char2] === -1) {
      return false;
    }

    if (strob[char1] !== char2) {
      return false;
    }

    i++;
    j--;
  }

  return true;
};
