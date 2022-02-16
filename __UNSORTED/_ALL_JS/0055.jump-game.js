/**
 * @param {number[]} nums
 * @return {boolean}
 */
const canJump = nums => {
  const memo = new Array(nums.length);

  for (let i = 0; i < memo.length; i++) {
    memo[i] = -1;
  }
  memo[memo.length - 1] = 1;

  for (let i = nums.length - 2; i >= 0; i--) {
    let maxJump = Math.min(i + nums[i], nums.length - 1);

    for (let j = i + 1; j <= maxJump; j++) {
      if (memo[j] === 1) {
        memo[i] = 1;
        break;
      }
    }
  }

  return memo[0] === 1;
};
