/**
 * @param {number[]} nums
 * @return {number}
 */
const pivotIndex = nums => {
  let sum = 0;
  let leftSum = 0;

  for (let i = 0; i < nums.length; i++) {
    sum += nums[i];
  }

  for (let i = 0; i < nums.length; i++) {
    if (leftSum === sum - nums[i] - leftSum) {
      return i;
    }

    leftSum += nums[i];
  }

  return -1;
};
