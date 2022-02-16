/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
const minDepth = root => {
  if (root === null) {
    return 0;
  }

  if (!root.left && !root.right) {
    return 1;
  }

  let minimumDepth = Number.MAX_SAFE_INTEGER;

  if (root.left != null) {
    minimumDepth = Math.min(minDepth(root.left), minimumDepth);
  }
  if (root.right != null) {
    minimumDepth = Math.min(minDepth(root.right), minimumDepth);
  }

  return minimumDepth + 1;
};
