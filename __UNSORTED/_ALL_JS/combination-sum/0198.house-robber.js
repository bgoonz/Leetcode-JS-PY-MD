/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {
  if (nums.length === 0) {
    return 0;
  }
  var even = 0;
  var odd = 0;

  for (let i = 0; i < nums.length; i++) {
    if (i % 2 === 0) {
      even += nums[i];
      even = even > odd ? even : odd;
    } else {
      odd += nums[i];
      odd = even > odd ? even : odd;
    }
  }

  return even > odd ? even : odd;
};
