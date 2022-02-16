class UndergroundSystem {
  constructor() {
    this.data = {};
    this.locations = {};
  }

  /**
   * @param {number} id
   * @param {string} stationName
   * @param {number} t
   * @return {void}
   */
  checkIn(id, stationName, t) {
    this.locations[id] = {
      stationName,
      t,
    };
  }

  /**
   * @param {number} id
   * @param {string} stationName
   * @param {number} t
   * @return {void}
   */
  checkOut(id, stationName, t) {
    const timeTaken = t - this.locations[id]["t"];
    const startStation = this.locations[id]["stationName"];

    if (!this.data[startStation]) {
      this.data[startStation] = {
        [stationName]: {
          trips: 1,
          sum: timeTaken,
          avg: timeTaken,
        },
      };
    } else {
      if (this.data[startStation][stationName]) {
        this.data[startStation][stationName]["trips"]++;
        this.data[startStation][stationName]["sum"] += timeTaken;
        this.data[startStation][stationName]["avg"] =
          this.data[startStation][stationName]["sum"] /
          this.data[startStation][stationName]["trips"];
      } else {
        this.data[startStation][stationName] = {
          trips: 1,
          sum: timeTaken,
          avg: timeTaken,
        };
      }
    }

    delete this.locations[id];
  }

  /**
   * @param {string} startStation
   * @param {string} endStation
   * @return {number}
   */
  getAverageTime(startStation, endStation) {
    return this.data[startStation][endStation]["avg"];
  }

  /**
   * Your UndergroundSystem object will be instantiated and called as such:
   * var obj = new UndergroundSystem()
   * obj.checkIn(id,stationName,t)
   * obj.checkOut(id,stationName,t)
   * var param_3 = obj.getAverageTime(startStation,endStation)
   */
}
