/**
 * @param {string} s
 * @return {boolean}
 */
const checkRecord = s => {
  let absences = 0;
  let lastLate = Number.MIN_SAFE_INTEGER;
  let prevLastLate = Number.MIN_SAFE_INTEGER;
  for (let i = 0; i < s.length; i++) {
    if (s.charAt(i) === "A") {
      absences++;
      if (absences > 1) {
        return false;
      }
    }

    if (s.charAt(i) === "L") {
      if (lastLate === i - 1 && prevLastLate === i - 2) {
        return false;
      }
      prevLastLate = lastLate;
      lastLate = i;
    }
  }

  return true;
};
