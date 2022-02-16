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
 * @return {string}
 */
const smallestFromLeaf = root => {
  let min = "|";

  const dfs = (node, accumulator) => {
    if (node === null) {
      return;
    }

    accumulator = String.fromCharCode(node.val + 97) + accumulator;
    if (!node.left && !node.right) {
      if (min > accumulator) {
        min = accumulator;
      }
    } else {
      dfs(node.left, accumulator);
      dfs(node.right, accumulator);
    }
  };

  dfs(root, "");

  return min;
};
