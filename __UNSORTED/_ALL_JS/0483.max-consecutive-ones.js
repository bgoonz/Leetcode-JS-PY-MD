/**
 * @param {number[]} nums
 * @return {number}
 */
const findMaxConsecutiveOnes = nums => {
  let max = 0;
  let localMax = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === 1) {
      localMax++;
    } else {
      localMax = 0;
    }

    max = Math.max(max, localMax);
  }

  return max;
};
