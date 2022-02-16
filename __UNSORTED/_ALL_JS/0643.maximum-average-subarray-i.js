/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
const findMaxAverage = (nums, k) => {
  let max = -Number.MAX_SAFE_INTEGER;

  let i = 0;
  let j = k - 1;

  let s = 0;
  for (let q = i; q <= j; q++) {
    s += nums[q];
  }

  while (j < nums.length) {
    if (i > 0) {
      s -= nums[i - 1];
      s += nums[j];
    }

    let avg = s / k;
    if (avg > max) {
      max = avg;
    }

    i++;
    j++;
  }

  return max;
};
