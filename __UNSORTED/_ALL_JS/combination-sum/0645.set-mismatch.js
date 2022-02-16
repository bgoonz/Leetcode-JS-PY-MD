/**
 * @param {number[]} nums
 * @return {number[]}
 */
var findErrorNums = function (nums) {
  const seen = {};
  const out = [];

  for (let i = 0; i < nums.length; i++) {
    if (seen[nums[i]] === undefined) {
      seen[nums[i]] = 1;
    } else {
      out[0] = nums[i];
    }
  }

  for (let i = 1; i <= nums.length; i++) {
    if (seen[i] === undefined) {
      out[1] = i;
    }
  }

  return out;
};
