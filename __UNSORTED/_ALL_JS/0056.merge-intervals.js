/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
const merge = intervals => {
  if (intervals.length < 2) {
    return intervals;
  }

  intervals.sort((a, b) => a[0] - b[0]);

  let [start, end] = intervals[0];
  const out = [];

  for (let i = 1; i < intervals.length; i++) {
    if (intervals[i][0] <= end) {
      end = Math.max(end, intervals[i][1]);
    } else {
      out.push([start, end]);
      [start, end] = intervals[i];
    }
  }

  out.push([start, end]);

  return out;
};
