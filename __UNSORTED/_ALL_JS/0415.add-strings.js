/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
const addStrings = (num1, num2) => {
  let out = "";

  let carry = 0;
  let p1 = num1.length - 1;
  let p2 = num2.length - 1;
  while (p1 >= 0 || p2 >= 0) {
    let x1 = parseInt(num1[p1]);
    let x2 = parseInt(num2[p2]);

    if (isNaN(x1)) {
      x1 = 0;
    }

    if (isNaN(x2)) {
      x2 = 0;
    }

    let value = (x1 + x2 + carry) % 10;
    carry = Math.floor((x1 + x2 + carry) / 10);
    out += value;

    p1--;
    p2--;
  }

  if (carry) {
    out += String(carry);
  }

  return out.split("").reverse().join("");
};
