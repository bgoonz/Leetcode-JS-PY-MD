/**
 * @param {number[]} nums
 * @return {number}
 */
var minMoves = function (nums) {
  let s = 0;
  for (let i = 0; i < nums.length; i++) {
    s += nums[i];
  }

  return s - nums.length * Math.min(...nums);
};
