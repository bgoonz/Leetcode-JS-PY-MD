/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
const invertTree = root => {
  if (root === null) {
    return null;
  }

  invertTree(root.left);
  invertTree(root.right);

  const swap = root.right;
  root.right = root.left;
  root.left = swap;

  return root;
};
