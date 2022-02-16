/**
 * @param {number[]} nums
 * @return {number}
 */
var dominantIndex = function (nums) {
  let max = (pos = -1);
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > max) {
      max = nums[i];
      pos = i;
    }
  }

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > 0 && i !== pos && Math.floor(max / nums[i]) < 2) {
      return -1;
    }
  }

  return pos;
};
