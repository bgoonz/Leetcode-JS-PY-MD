/**
 * @param {number[]} nums
 * @return {number}
 */
var findPeakElement = function (nums) {
  if (nums.length === 1) {
    return 0;
  }

  let prev = Number.MIN_SAFE_INTEGER;
  for (let i = 0; i < nums.length - 1; i++) {
    if (nums[i] > prev && nums[i] > nums[i + 1]) {
      return i;
    }

    prev = nums[i];
  }

  if (prev !== Number.MIN_SAFE_INTEGER) {
    if (nums[nums.length - 1] > nums[nums.length - 2]) {
      return nums.length - 1;
    }
  }
};
