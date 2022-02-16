/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
const sumNumbers = root => {
  let sum = 0;

  const dfs = (node, accumulator) => {
    if (node === null) {
      return;
    }

    accumulator = accumulator * 10 + node.val;
    if (!node.left && !node.right) {
      sum += parseInt(accumulator);
    } else {
      dfs(node.left, accumulator);
      dfs(node.right, accumulator);
    }
  };

  dfs(root, 0);

  return sum;
};
