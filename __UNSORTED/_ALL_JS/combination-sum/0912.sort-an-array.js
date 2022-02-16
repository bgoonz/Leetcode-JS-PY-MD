/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortArray = function (nums) {
  nums.sort((a, b) => {
    return a - b;
  });

  return nums;
};
