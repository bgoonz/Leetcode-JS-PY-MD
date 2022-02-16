var isValid = function (x) {
  let ok = false;
  do {
    let c = x % 10;

    if (c === 3 || c === 4 || c === 7) {
      return false;
    }

    if (!ok) {
      if (c === 2 || c === 5 || c === 6 || c === 9) {
        ok = true;
      }
    }

    x = Math.floor(x / 10);
  } while (x > 0);

  return ok;
};

/**
 * @param {number} N
 * @return {number}
 */
var rotatedDigits = function (N) {
  let count = 0;
  for (let i = 2; i <= N; i++) {
    if (isValid(i)) {
      count++;
    }
  }

  return count;
};
