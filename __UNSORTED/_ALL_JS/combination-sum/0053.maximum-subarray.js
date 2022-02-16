/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
  if (nums.length === 1) {
    return nums[0];
  }

  let s = nums[0];
  let max = nums[0];

  for (let i = 1; i < nums.length; i++) {
    s = Math.max(nums[i], s + nums[i]);
    max = Math.max(s, max);
  }

  return max;
};
