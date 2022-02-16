/**
 * @param {string} s
 * @return {string[]}
 */
var restoreIpAddresses = function (s) {
  const isRangeValid = function (s) {
    if (!s.length || (s.length > 1 && s.charAt(0) === "0")) {
      return false;
    }

    const x = Number.parseInt(s);
    return x >= 0 && x <= 255;
  };

  if (s === undefined || s === null || s === "") {
    return [];
  }

  if (s.length < 4 || s.length > 12) {
    return [];
  }

  const solutions = [];

  for (let i = 1; i <= s.length - 3; i++) {
    for (let j = i + 1; j <= s.length - 2; j++) {
      for (let k = j + 1; k <= s.length - 1; k++) {
        let a = s.slice(0, i);
        let b = s.slice(i, j);
        let c = s.slice(j, k);
        let d = s.slice(k);

        if (
          isRangeValid(a) &&
          isRangeValid(b) &&
          isRangeValid(c) &&
          isRangeValid(d)
        ) {
          solutions.push(`${a}.${b}.${c}.${d}`);
        }
      }
    }
  }

  return solutions;
};
