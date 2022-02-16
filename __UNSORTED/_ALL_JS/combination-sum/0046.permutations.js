/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function (nums, set = [], solutions = []) {
  if (!nums.length) {
    solutions.push([].concat(set));
  }

  for (let i = 0; i < nums.length; i++) {
    const newNums = nums.filter((_, j) => i !== j);
    set.push(nums[i]);
    permute(newNums, set, solutions);
    set.pop();
  }

  return solutions;
};
