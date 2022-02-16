/**
 * @param {number} N
 * @return {number}
 */
var binaryGap = function (N) {
  const binaryN = N.toString(2);

  let prevIndex = -1;
  let dist = 0;
  for (let i = 0; i < binaryN.length; i++) {
    if (binaryN.charAt(i) === "1") {
      dist = Math.max(dist, prevIndex > -1 ? i - prevIndex : i);
      prevIndex = i;
    }
  }

  return dist;
};
