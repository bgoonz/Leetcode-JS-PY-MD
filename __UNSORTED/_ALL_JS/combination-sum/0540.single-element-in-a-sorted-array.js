/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNonDuplicate = function (nums) {
  for (let i = 1; i < nums.length; i += 2) {
    if (nums[i - 1] !== nums[i]) {
      return nums[i - 1];
    }
  }

  return nums[nums.length - 1];
};
