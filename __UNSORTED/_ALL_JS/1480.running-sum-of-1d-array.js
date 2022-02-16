/**
 * @param {number[]} nums
 * @return {number[]}
 */
var runningSum = function (nums) {
  const out = [nums[0]];

  let s = nums[0];
  for (let i = 1; i < nums.length; i++) {
    s += nums[i];
    out[i] = s;
  }

  return out;
};
