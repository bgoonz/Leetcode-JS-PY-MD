/**
 * @param {string} s
 * @return {number}
 */
var balancedStringSplit = function (s) {
  let strings = 0,
    lcount = 0,
    rcount = 0,
    i = 0;

  while (i <= s.length) {
    if (s.charAt(i) === "L") {
      lcount++;
    } else {
      rcount++;
    }
    i++;

    if (lcount === rcount) {
      strings++;
      lcount = 0;
      rcount = 0;
    }
  }

  return strings;
};
