/**
 * @param {number[]} nums
 * @return {number[]}
 */
const findDisappearedNumbers = nums => {
  const seen = {};
  for (let i = 1; i <= nums.length; i++) {
    seen[i] = 0;
  }

  for (let i = 0; i < nums.length; i++) {
    seen[nums[i]]++;
  }

  return Object.keys(seen).filter(k => seen[k] === 0);
};
