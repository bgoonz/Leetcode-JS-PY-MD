/**
 * Initialize your data structure here.
 */
var TwoSum = function () {
  this.numbers = [];
  this.sums = new Map();
};

/**
 * Add the number to an internal data structure..
 * @param {number} number
 * @return {void}
 */
TwoSum.prototype.add = function (number) {
  for (let i = 0; i < this.numbers.length; i++) {
    const s = this.numbers[i] + number;

    this.sums.set(s, true);
  }

  this.numbers.push(number);
};

/**
 * Find if there exists any pair of numbers which sum is equal to the value.
 * @param {number} value
 * @return {boolean}
 */
TwoSum.prototype.find = function (value) {
  return this.sums.has(value) ? this.sums.get(value) : false;
};

/**
 * Your TwoSum object will be instantiated and called as such:
 * var obj = Object.create(TwoSum).createNew()
 * obj.add(number)
 * var param_2 = obj.find(value)
 */
