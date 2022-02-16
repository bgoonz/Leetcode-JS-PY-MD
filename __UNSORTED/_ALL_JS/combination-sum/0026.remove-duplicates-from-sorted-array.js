/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function (nums) {
  let i = 0,
    j = 0;
  let n = nums.length;

  while (i < n) {
    i++;

    if (nums[i] != nums[j]) {
      nums[++j] = nums[i];
    }
  }

  return j;
};
