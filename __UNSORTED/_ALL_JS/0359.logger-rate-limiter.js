/**
 * Initialize your data structure here.
 */
class Logger {
  constructor() {
    this.history = {};
  }

  /**
   * Returns true if the message should be printed in the given timestamp, otherwise returns false.
          If this method returns false, the message will not be printed.
          The timestamp is in seconds granularity. 
   * @param {number} timestamp 
   * @param {string} message
   * @return {boolean}
   */
  shouldPrintMessage(timestamp, message) {
    if (this.history[message] === undefined) {
      this.history[message] = timestamp;

      return true;
    }

    if (timestamp - this.history[message] >= 10) {
      this.history[message] = timestamp;

      return true;
    }

    return false;
  }

  /**
   * Your Logger object will be instantiated and called as such:
   * var obj = Object.create(Logger).createNew()
   * var param_1 = obj.shouldPrintMessage(timestamp,message)
   */
}
