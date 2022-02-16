/**
 * @param {number[]} arr
 * @return {number[][]}
 */
var minimumAbsDifference = function (arr) {
  arr.sort((a, b) => {
    return a > b ? 1 : -1;
  });

  let pairs = [[arr[0], arr[1]]];
  let min = Math.abs(arr[0] - arr[1]);
  for (let i = 1; i < arr.length; i++) {
    const diff = Math.abs(arr[i] - arr[i + 1]);

    if (diff === min) {
      pairs.push([arr[i], arr[i + 1]]);
    }

    if (min > diff) {
      pairs = [[arr[i], arr[i + 1]]];
      min = diff;
    }
  }

  return pairs;
};
