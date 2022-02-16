/**
 * @param {number[][]} v
 */
class Vector2D {
  constructor(v) {
    this.inner = 0;
    this.outer = 0;

    this.v = v;
  }

  /**
   * @return {number}
   */
  next() {
    if (!this.hasNext()) {
      return null;
    }

    return this.v[this.outer][this.inner++];
  }

  advance() {
    while (
      this.outer < this.v.length &&
      this.inner === this.v[this.outer].length
    ) {
      this.inner = 0;
      this.outer++;
    }
  }

  /**
   * @return {boolean}
   */
  hasNext() {
    this.advance();

    return this.outer < this.v.length;
  }

  /**
   * Your Vector2D object will be instantiated and called as such:
   * var obj = new Vector2D(v)
   * var param_1 = obj.next()
   * var param_2 = obj.hasNext()
   */
}
