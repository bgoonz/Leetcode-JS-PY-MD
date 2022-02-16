/**
 * @param {string} date
 * @return {number}
 */
var dayOfYear = function (date) {
  const daysEachMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  const [y, m, d] = date.split("-").map((x) => Number.parseInt(x, 10));

  if (y % 400 === 0 || (y % 100 !== 0 && y % 4 === 0)) {
    daysEachMonth[1] = 29;
  }

  let days = 0;
  for (let i = 0; i < m - 1; i++) {
    days += daysEachMonth[i];
  }

  return days + d;
};
