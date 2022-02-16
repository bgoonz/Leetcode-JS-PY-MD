/**
 * @param {number[]} nums
 * @return {number}
 */
const removeDuplicates = nums => {
  let i = 0;
  let j = 0;
  let n = nums.length;

  while (i < n) {
    i++;

    if (nums[i] != nums[j]) {
      nums[++j] = nums[i];
    }
  }

  return j;
};
