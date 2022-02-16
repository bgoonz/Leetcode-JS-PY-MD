/**
 * @param {number[]} nums
 * @return {number}
 */
var findNumbers = function (nums) {
  let total = 0;

  for (let i = 0; i < nums.length; i++) {
    const digits = digitCount(nums[i]);
    if (digits % 2 === 0) {
      total++;
    }
  }

  return total;
};

var digitCount = function (num) {
  let c = 0;

  do {
    num = Math.floor(num / 10);
    c++;
  } while (num);

  return c;
};
