/**
 * Initialize your data structure here.
 * @param {number} size
 */
var MovingAverage = function (size) {
  this.values = [];
  this.size = size;
};

/**
 * @param {number} val
 * @return {number}
 */
MovingAverage.prototype.next = function (val) {
  this.values.push(val);

  if (this.values.length > this.size) {
    this.values.splice(0, 1);
  }

  let sum = 0;
  for (let i = 0; i < this.values.length; i++) {
    sum += this.values[i];
  }

  return sum / this.values.length;
};

/**
 * Your MovingAverage object will be instantiated and called as such:
 * var obj = Object.create(MovingAverage).createNew(size)
 * var param_1 = obj.next(val)
 */
