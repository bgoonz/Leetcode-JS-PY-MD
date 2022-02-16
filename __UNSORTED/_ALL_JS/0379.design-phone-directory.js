/**
 * Initialize your data structure here
        @param maxNumbers - The maximum numbers that can be stored in the phone directory.
 * @param {number} maxNumbers
 */
class PhoneDirectory {
  constructor(maxNumbers) {
    this.dir = new Array(maxNumbers);

    for (let i = 0; i < this.dir.length; i++) {
      this.dir[i] = {
        no: i,
        free: true,
      };
    }
  }

  /**
   * Provide a number which is not assigned to anyone.
          @return - Return an available number. Return -1 if none is available.
   * @return {number}
   */
  get() {
    for (let i = 0; i < this.dir.length; i++) {
      if (this.dir[i].free) {
        this.dir[i].free = false;
        return i;
      }
    }

    return -1;
  }

  /**
   * Check if a number is available or not.
   * @param {number} number
   * @return {boolean}
   */
  check(number) {
    if (number > this.dir.length) {
      return false;
    }

    return this.dir[number].free;
  }

  /**
   * Recycle or release a number.
   * @param {number} number
   * @return {void}
   */
  release(number) {
    this.dir[number].free = true;
  }

  /**
   * Your PhoneDirectory object will be instantiated and called as such:
   * var obj = new PhoneDirectory(maxNumbers)
   * var param_1 = obj.get()
   * var param_2 = obj.check(number)
   * obj.release(number)
   */
}
