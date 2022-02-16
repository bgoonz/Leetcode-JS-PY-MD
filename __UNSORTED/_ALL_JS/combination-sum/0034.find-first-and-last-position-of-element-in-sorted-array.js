/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function (nums, target) {
  let firstMatch = binarySearch(nums, 0, nums.length - 1, target);

  if (firstMatch === -1) return [-1, -1];

  let i = firstMatch,
    j = firstMatch;
  while (i > -1 && nums[i - 1] === target) {
    i--;
  }
  while (j < nums.length - 1 && nums[j + 1] === target) {
    j++;
  }

  return [i, j];
};

const binarySearch = function (nums, left, right, target) {
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) {
      return mid;
    }

    if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return -1;
};
