/**
 * @param {number[]} digits
 * @return {number[]}
 */
var plusOne = function (digits) {
  let carry = 1;
  for (let i = digits.length - 1; i >= 0; i--) {
    if (carry) digits[i] += carry;

    if (digits[i] > 9) {
      digits[i] %= 10;
      carry = 1;
    } else {
      carry = 0;
    }
  }

  if (carry) return [1].concat(digits);

  return digits;
};
