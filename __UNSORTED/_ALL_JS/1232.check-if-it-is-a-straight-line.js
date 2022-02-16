/**
 * @param {number[][]} coordinates
 * @return {boolean}
 */
var checkStraightLine = function (coordinates) {
  if (coordinates.length < 3) {
    return true;
  }

  let s = 0;
  for (let i = 1; i < coordinates.length; i++) {
    const localSlope = slope(
      coordinates[i - 1][0],
      coordinates[i - 1][1],
      coordinates[i][0],
      coordinates[i][1]
    );
    if (s !== 0) {
      if (localSlope !== s) {
        return false;
      }
    } else {
      s = localSlope;
    }
  }

  return true;
};

const slope = function (x1, y1, x2, y2) {
  return (y2 - y1) / (x2 - x1);
};
