/**
 * @param {number[]} nums
 * @return {number}
 */
const firstMissingPositive = nums => {
  const seen = {};

  let n = 1;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] < 0) continue;

    seen[nums[i]] = true;

    if (nums[i] === n) {
      while (seen[n]) n++;
    }
  }

  return n;
};
