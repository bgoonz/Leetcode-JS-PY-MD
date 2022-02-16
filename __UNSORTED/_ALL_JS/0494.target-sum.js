/**
 * @param {number[]} nums
 * @param {number} S
 * @return {number}
 */
const findTargetSumWays = (nums, S) => {
  let count = 0;

  const helper = (nums, i, sum, S) => {
    if (i === nums.length) {
      if (sum === S) count++;
    } else {
      helper(nums, i + 1, sum + nums[i], S);
      helper(nums, i + 1, sum - nums[i], S);
    }
  };

  helper(nums, 0, 0, S);

  return count;
};
