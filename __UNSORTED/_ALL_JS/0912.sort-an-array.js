/**
 * @param {number[]} nums
 * @return {number[]}
 */
const sortArray = nums => {
  nums.sort((a, b) => a - b);

  return nums;
};
