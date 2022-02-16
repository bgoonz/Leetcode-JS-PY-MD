/**
 * @param {number} x
 * @return {boolean}
 */
const isPalindrome = x => {
  if (x < 0) {
    return false;
  }

  let temp = x;
  let rev = 0;

  while (temp) {
    let c = temp % 10;
    rev = rev * 10 + c;
    temp = Math.floor(temp / 10);
  }

  return rev === x;
};
