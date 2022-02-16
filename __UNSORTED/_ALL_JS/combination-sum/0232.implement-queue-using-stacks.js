/**
 * Initialize your data structure here.
 */
var MyQueue = function () {
  this.newStack = [];
  this.oldStack = [];
};

/**
 * Push element x to the back of queue.
 * @param {number} x
 * @return {void}
 */
MyQueue.prototype.push = function (x) {
  this.newStack.push(x);
};

/**
 * Removes the element from in front of queue and returns that element.
 * @return {number}
 */
MyQueue.prototype.pop = function () {
  this._archive();
  return this.oldStack.pop();
};

/**
 * Get the front element.
 * @return {number}
 */
MyQueue.prototype.peek = function () {
  this._archive();
  const x = this.oldStack.pop();
  this.oldStack.push(x);

  return x;
};

MyQueue.prototype._archive = function () {
  if (this.oldStack.length) {
    return;
  }

  while (this.newStack.length) {
    this.oldStack.push(this.newStack.pop());
  }
};

/**
 * Returns whether the queue is empty.
 * @return {boolean}
 */
MyQueue.prototype.empty = function () {
  return !this.newStack.length && !this.oldStack.length;
};

/**
 * Your MyQueue object will be instantiated and called as such:
 * var obj = new MyQueue()
 * obj.push(x)
 * var param_2 = obj.pop()
 * var param_3 = obj.peek()
 * var param_4 = obj.empty()
 */
