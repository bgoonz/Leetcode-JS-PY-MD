/**
 * @param {number[]} nums
 * @return {string}
 */
var largestNumber = function (nums) {
  nums.sort((a, b) => {
    const x = String(a) + String(b);
    const y = String(b) + String(a);

    return x > y ? -1 : x < y ? 1 : 0;
  });

  if (nums[0] === 0) {
    return "0";
  }

  return nums.join("");
};
