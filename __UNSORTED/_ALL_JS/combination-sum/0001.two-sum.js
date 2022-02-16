/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
  const x = {};

  for (let i = 0; i < nums.length; i++) {
    x[nums[i]] = i;
  }

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];

    if (x[complement] && x[complement] !== i) {
      return [i, x[complement]];
    }
  }
};
