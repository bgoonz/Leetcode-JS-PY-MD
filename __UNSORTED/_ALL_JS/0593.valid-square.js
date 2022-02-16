/**
 * @param {number[]} p1
 * @param {number[]} p2
 * @param {number[]} p3
 * @param {number[]} p4
 * @return {boolean}
 */
const validSquare = (p1, p2, p3, p4) => {
  const dist = (p1, p2) => (p2[1] - p1[1]) * (p2[1] - p1[1]) + (p2[0] - p1[0]) * (p2[0] - p1[0]);

  const check = (p1, p2, p3, p4) => dist(p1, p2) > 0 &&
  dist(p1, p2) === dist(p2, p3) &&
  dist(p2, p3) === dist(p3, p4) &&
  dist(p1, p3) === dist(p2, p4) &&
  dist(p3, p4) === dist(p4, p1);

  return (
    check(p1, p2, p3, p4) || check(p1, p3, p2, p4) || check(p1, p2, p4, p3)
  );
};
