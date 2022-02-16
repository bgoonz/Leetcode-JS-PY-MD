/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
const combinationSum = (candidates, target) => {
  const out = [];

  const helper = (sum, combination, start) => {
    if (sum === 0) {
      out.push(Array.from(combination));
      return;
    }

    if (sum < 0) {
      return;
    }

    for (let i = start; i < candidates.length; i++) {
      combination.push(candidates[i]);
      helper(sum - candidates[i], combination, i);
      combination.pop();
    }
  };

  helper(target, [], 0);

  return out;
};
