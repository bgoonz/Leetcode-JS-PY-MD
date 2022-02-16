/**
 * @param {number[]} nums
 * @return {number[]}
 */
var smallerNumbersThanCurrent = function (nums) {
  const out = [];

  for (let i = 0; i < nums.length; i++) {
    out[i] = 0;
  }

  for (let i = 0; i < nums.length; i++) {
    for (let j = 0; j < nums.length; j++) {
      if (i !== j && nums[i] > nums[j]) {
        out[i]++;
      }
    }
  }

  return out;
};
