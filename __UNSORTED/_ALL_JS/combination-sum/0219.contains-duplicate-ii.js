/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
var containsNearbyDuplicate = function (nums, k) {
  const seen = new Map();

  for (let i = 0; i < nums.length; ++i) {
    if (seen.has(nums[i])) {
      return true;
    }

    seen.set(nums[i], 1);
    if (seen.size > k) {
      seen.delete(nums[i - k]);
    }
  }

  return false;
};
