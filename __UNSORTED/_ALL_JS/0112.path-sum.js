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
 * @param {number} sum
 * @return {boolean}
 */
const hasPathSum = (root, sum) => {
  let isPossible = false;

  const dfs = (node, s) => {
    if (node === null) {
      return;
    }

    s -= node.val;

    if (!node.left && !node.right) {
      if (s === 0) {
        isPossible = true;
        return;
      } else if (s < 0) {
        return;
      }
    } else {
      dfs(node.left, s);
      dfs(node.right, s);
    }
  };

  dfs(root, sum);

  return isPossible;
};
