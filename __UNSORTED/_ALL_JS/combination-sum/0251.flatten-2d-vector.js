/**
 * @param {number[][]} v
 */
var Vector2D = function (v) {
  this.inner = 0;
  this.outer = 0;

  this.v = v;
};

/**
 * @return {number}
 */
Vector2D.prototype.next = function () {
  if (!this.hasNext()) {
    return null;
  }

  return this.v[this.outer][this.inner++];
};

Vector2D.prototype.advance = function () {
  while (
    this.outer < this.v.length &&
    this.inner === this.v[this.outer].length
  ) {
    this.inner = 0;
    this.outer++;
  }
};

/**
 * @return {boolean}
 */
Vector2D.prototype.hasNext = function () {
  this.advance();

  return this.outer < this.v.length;
};

/**
 * Your Vector2D object will be instantiated and called as such:
 * var obj = new Vector2D(v)
 * var param_1 = obj.next()
 * var param_2 = obj.hasNext()
 */
