/**
 * @param {number[]} nums
 * @param {number} n
 * @return {number[]}
 */
var shuffle = function (nums, n) {
  const out = [];
  let i = 0;
  let j = 0;
  let k = n;
  while (i < 2 * n) {
    out[i] = nums[j];
    out[i + 1] = nums[k];

    i += 2;
    j++;
    k++;
  }

  return out;
};
