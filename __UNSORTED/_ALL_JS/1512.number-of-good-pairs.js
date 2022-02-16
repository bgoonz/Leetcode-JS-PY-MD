/**
 * @param {number[]} nums
 * @return {number}
 */
var numIdenticalPairs = function (nums) {
  const identical = new Array(nums.length);
  for (let i = 0; i < nums.length; i++) {
    identical[i] = 0;
  }

  for (let i = 0; i < nums.length - 1; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] === nums[j]) {
        identical[i]++;
      }
    }
  }

  let s = 0;
  for (let i = 0; i < nums.length; i++) {
    s += identical[i];
  }

  return s;
};
