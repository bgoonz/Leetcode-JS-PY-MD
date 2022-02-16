/**
 * @param {number[]} nums
 */
var Solution = function (nums) {
  this.nums = nums;
  this.cache = {};

  for (let i = 0; i < nums.length; i++) {
    if (!this.cache[nums[i]]) {
      this.cache[nums[i]] = [i];
    } else {
      this.cache[nums[i]].push(i);
    }
  }
};

/**
 * @param {number} target
 * @return {number}
 */
Solution.prototype.pick = function (target) {
  return this.cache[target][
    Math.floor(Math.random() * this.cache[target].length)
  ];
};

/**
 * Your Solution object will be instantiated and called as such:
 * var obj = new Solution(nums)
 * var param_1 = obj.pick(target)
 */
