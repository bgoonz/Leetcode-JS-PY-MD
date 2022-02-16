/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var sortColors = function (nums) {
  let zeroes = 0,
    ones = 0,
    twos = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === 0) zeroes++;
    else if (nums[i] === 1) ones++;
    else twos++;
  }

  if (zeroes) {
    for (let i = 0; i < zeroes; i++) {
      nums[i] = 0;
    }
  }

  if (ones) {
    for (let i = zeroes; i < zeroes + ones; i++) {
      nums[i] = 1;
    }
  }

  if (twos) {
    for (let i = zeroes + ones; i < zeroes + ones + twos; i++) {
      nums[i] = 2;
    }
  }
};
