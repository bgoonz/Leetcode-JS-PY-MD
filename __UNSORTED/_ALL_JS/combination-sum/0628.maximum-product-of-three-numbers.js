/**
 * @param {number[]} nums
 * @return {number}
 */
var maximumProduct = function (nums) {
  nums.sort((a, b) => {
    return a - b;
  });

  const len = nums.length;

  return Math.max(
    nums[len - 1] * nums[len - 2] * nums[len - 3],
    nums[0] * nums[1] * nums[len - 1]
  );
};
