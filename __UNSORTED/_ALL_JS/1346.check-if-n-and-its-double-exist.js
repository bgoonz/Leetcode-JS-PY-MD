/**
 * @param {number[]} arr
 * @return {boolean}
 */
var checkIfExist = function (arr) {
  const d = arr.map((x) => x * 2);

  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < d.length; j++) {
      if (i !== j && arr[i] === d[j]) {
        return true;
      }
    }
  }

  return false;
};
