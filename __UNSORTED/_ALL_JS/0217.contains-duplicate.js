/**
 * @param {number[]} nums
 * @return {boolean}
 */
const containsDuplicate = nums => {
  const seen = {};
  for (let i = 0; i < nums.length; i++) {
    if (seen[nums[i]] !== undefined) {
      return true;
    } else {
      seen[nums[i]] = 1;
    }
  }

  return false;
};
