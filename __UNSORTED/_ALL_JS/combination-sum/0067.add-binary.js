/**
 * @param {string} a
 * @param {string} b
 * @return {string}
 */
var addBinary = function (a, b) {
  let i = a.length;
  let j = b.length;

  if (i === 0) return b;
  if (j === 0) return a;

  let carry = 0;
  let result = "";
  while (i && j) {
    const s = carry + parseInt(a.charAt(i - 1)) + parseInt(b.charAt(j - 1));

    if (s < 2) {
      result = String(s) + result;
      carry = 0;
    } else {
      carry = 1;
      result = String(s % 2) + result;
    }

    i--;
    j--;
  }

  if (i) {
    while (i) {
      const s = carry + parseInt(a.charAt(i - 1));

      if (s < 2) {
        result = String(s) + result;
        carry = 0;
      } else {
        carry = 1;
        result = String(s % 2) + result;
      }

      i--;
    }
  }

  if (j) {
    while (j) {
      const s = carry + parseInt(b.charAt(j - 1));

      if (s < 2) {
        result = String(s) + result;
        carry = 0;
      } else {
        carry = 1;
        result = String(s % 2) + result;
      }

      j--;
    }
  }

  if (carry) {
    return "1" + result;
  }

  return result;
};
