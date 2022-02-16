/**
 * @param {number[]} nums
 * @return {number}
 */
const minMoves = nums => {
  let s = 0;
  for (let i = 0; i < nums.length; i++) {
    s += nums[i];
  }

  return s - nums.length * Math.min(...nums);
};
