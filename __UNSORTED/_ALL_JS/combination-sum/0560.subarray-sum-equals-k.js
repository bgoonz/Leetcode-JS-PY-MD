/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var subarraySum = function (nums, k) {
  let count = 0;
  let sums = {};
  let s = 0;

  for (let i = 0; i < nums.length; i++) {
    s += nums[i];

    if (s === k) {
      count++;
    }

    if (sums[s - k] !== undefined) {
      count += sums[s - k];
    }

    if (!sums[s]) {
      sums[s] = 1;
    } else {
      sums[s]++;
    }
  }

  return count;
};
