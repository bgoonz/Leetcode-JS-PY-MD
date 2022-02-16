/**
 * @param {number[][]} workers
 * @param {number[][]} bikes
 * @return {number[]}
 */
var assignBikes = function (workers, bikes) {
  const workerBikeDistances = [];

  for (let i = 0; i < bikes.length; i++) {
    for (let j = 0; j < workers.length; j++) {
      workerBikeDistances.push({
        w: j,
        b: i,
        distance: dist(bikes[i], workers[j]),
      });
    }
  }

  workerBikeDistances.sort((x, y) => {
    if (x.distance < y.distance) {
      return -1;
    }

    if (x.distance > y.distance) {
      return 1;
    }

    if (x.w < y.w) {
      return -1;
    }

    if (x.w > y.w) {
      return 1;
    }

    if (x.b < y.b) {
      return -1;
    }

    if (x.b > y.b) {
      return 1;
    }

    return 0;
  });

  const b = new Map(bikes.map((bike, index) => [index, 1]));
  const w = new Map(workers.map((worker, index) => [index, 1]));

  const ans = [];
  for (let i = 0; i < workerBikeDistances.length; i++) {
    if (
      b.get(workerBikeDistances[i].b) === 1 &&
      w.get(workerBikeDistances[i].w) === 1
    ) {
      ans[workerBikeDistances[i].w] = workerBikeDistances[i].b;

      b.set(workerBikeDistances[i].b, 0);
      w.set(workerBikeDistances[i].w, 0);
    }
  }

  return ans;
};

const dist = function (p1, p2) {
  return Math.abs(p1[0] - p2[0]) + Math.abs(p1[1] - p2[1]);
};
