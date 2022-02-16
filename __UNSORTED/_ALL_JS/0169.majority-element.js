/**
 * @param {number[]} nums
 * @return {number}
 */
const majorityElement = nums => {
  const spots = {};
  for (let i = 0; i < nums.length; i++) {
    if (spots[nums[i]] === undefined) {
      spots[nums[i]] = 1;
    } else {
      spots[nums[i]]++;
    }

    if (spots[nums[i]] > Math.floor(nums.length / 2)) {
      return nums[i];
    }
  }
};
