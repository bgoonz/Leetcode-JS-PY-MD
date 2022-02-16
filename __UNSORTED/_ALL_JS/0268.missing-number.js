/**
 * @param {number[]} nums
 * @return {number}
 */
const missingNumber = nums => {
  let min = 0;
  let s = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] < min) {
      min = nums[i];
    }

    s += nums[i];
  }

  const sum = ((2 * min + nums.length) * (nums.length + 1)) / 2;
  return sum - s;
};
