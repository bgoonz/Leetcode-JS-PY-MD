/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
const search = (nums, target) => {
  const findRotateIndex = (left, right) => {
    if (nums[left] < nums[right]) {
      return 0;
    }

    while (left <= right) {
      const pivot = Math.floor((left + right) / 2);
      if (nums[pivot] > nums[pivot + 1]) {
        return pivot + 1;
      } else {
        if (nums[pivot] < nums[left]) {
          right = pivot - 1;
        } else {
          left = pivot + 1;
        }
      }
    }

    return 0;
  };

  const binarySearch = (left, right) => {
    while (left <= right) {
      const pivot = Math.floor((left + right) / 2);
      if (nums[pivot] === target) {
        return pivot;
      }

      if (nums[pivot] > target) {
        right = pivot - 1;
      } else {
        left = pivot + 1;
      }
    }

    return -1;
  };

  if (nums.length === 0) {
    return -1;
  }

  if (nums.length === 1) {
    return nums[0] === target ? 0 : -1;
  }

  const rotateIndex = findRotateIndex(0, nums.length - 1);

  if (nums[rotateIndex] === target) {
    return rotateIndex;
  }

  if (rotateIndex === 0) {
    return binarySearch(0, nums.length - 1);
  }

  if (target < nums[0]) {
    return binarySearch(rotateIndex, nums.length - 1);
  }

  return binarySearch(0, rotateIndex);
};
