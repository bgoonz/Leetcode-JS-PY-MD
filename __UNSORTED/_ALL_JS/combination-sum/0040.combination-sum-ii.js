/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum2 = function (candidates, target) {
  const out = [];

  candidates.sort((a, b) => {
    return a - b;
  });

  var helper = function (sum, start, combination) {
    if (sum === 0) {
      out.push(Array.from(combination));
      return;
    }

    if (sum < 0) {
      return;
    }

    for (let i = start; i < candidates.length; i++) {
      if (i > start && candidates[i] === candidates[i - 1]) {
        continue;
      }

      combination.push(candidates[i]);
      helper(sum - candidates[i], i + 1, combination);
      combination.pop();
    }
  };

  helper(target, 0, []);

  return out;
};
