class MyCalendar {
  constructor() {
    this.data = [];
  }

  /**
   * @param {number} start
   * @param {number} end
   * @return {boolean}
   */
  book(start, end) {
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i][0] < end && start < this.data[i][1]) {
        return false;
      }
    }

    this.data.push([start, end]);

    return true;
  }

  /**
   * Your MyCalendar object will be instantiated and called as such:
   * var obj = new MyCalendar()
   * var param_1 = obj.book(start,end)
   */
}
