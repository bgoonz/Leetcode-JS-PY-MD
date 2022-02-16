/**
 * @param {number[]} nums
 * @return {number}
 */
var missingNumber = function (nums) {
  var min = 0;
  var s = 0;
  for (var i = 0; i < nums.length; i++) {
    if (nums[i] < min) {
      min = nums[i];
    }

    s += nums[i];
  }

  var sum = ((2 * min + nums.length) * (nums.length + 1)) / 2;
  return sum - s;
};
