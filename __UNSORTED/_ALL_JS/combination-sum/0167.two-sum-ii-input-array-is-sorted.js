/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (numbers, target) {
  const positions = {};
  for (let i = 0; i < numbers.length; i++) {
    if (positions[numbers[i]] === undefined) {
      positions[numbers[i]] = [i + 1];
    } else {
      positions[numbers[i]].push(i + 1);
    }
  }

  for (let i = 0; i < numbers.length; i++) {
    const rest = positions[target - numbers[i]];
    if (rest !== undefined) {
      for (let j = 0; j < rest.length; j++) {
        if (rest[j] !== i + 1) {
          return [i + 1, rest[j]];
        }
      }
    }
  }
};
