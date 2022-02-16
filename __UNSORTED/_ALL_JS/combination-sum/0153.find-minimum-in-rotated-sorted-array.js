/**
 * @param {number[]} nums
 * @return {number}
 */
var findMin = function (nums) {
  for (let i = 1; i < nums.length; i++) {
    if (nums[i - 1] > nums[i]) {
      return nums[i];
    }
  }

  return nums[0];
};
