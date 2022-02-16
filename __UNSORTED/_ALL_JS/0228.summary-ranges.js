/**
 * @param {number[]} nums
 * @return {string[]}
 */
const summaryRanges = nums => {
  if (!nums.length) {
    return [];
  }

  const out = [];
  let prev = nums[0];
  out.push(`${prev}`);
  for (let i = 1; i < nums.length; i++) {
    if (Math.abs(nums[i] - nums[i - 1]) !== 1) {
      prev = nums[i];
      out.push(`${prev}`);
    } else {
      out[out.length - 1] = `${prev}->${nums[i]}`;
    }
  }

  return out;
};
