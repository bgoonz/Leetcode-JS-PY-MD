/**
 * @param {number[]} nums
 */
class Solution {
  constructor(nums) {
    this.original = Array.from(nums);
    this.nums = nums;
  }

  /**
   * Resets the array to its original configuration and return it.
   * @return {number[]}
   */
  reset() {
    return this.original;
  }

  /**
   * Returns a random shuffling of the array.
   * @return {number[]}
   */
  shuffle() {
    for (let i = 0; i < this.nums.length; i++) {
      let j = Math.floor(Math.random() * (this.nums.length - 1));

      let swap = this.nums[i];
      this.nums[i] = this.nums[j];
      this.nums[j] = swap;
    }

    return this.nums;
  }

  /**
   * Your Solution object will be instantiated and called as such:
   * var obj = new Solution(nums)
   * var param_1 = obj.reset()
   * var param_2 = obj.shuffle()
   */
}
