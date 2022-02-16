/**
 * @param {number[]} arr
 * @return {boolean}
 */
var uniqueOccurrences = function (arr) {
  const freq = new Map();

  for (let i = 0; i < arr.length; i++) {
    if (!freq.has(arr[i])) {
      freq.set(arr[i], 1);
    } else {
      freq.set(arr[i], freq.get(arr[i]) + 1);
    }
  }

  const set = new Set();
  for (let value of freq.values()) {
    if (set.has(value)) {
      return false;
    }

    set.add(value);
  }

  return true;
};
