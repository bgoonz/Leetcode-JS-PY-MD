/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
const isBalanced = root => {
  if (root === null) {
    return true;
  }

  if (Math.abs(height(root.left) - height(root.right)) > 1) {
    return false;
  } else {
    return isBalanced(root.left) && isBalanced(root.right);
  }
};

const height = node => {
  if (node === null) {
    return -1;
  }

  return 1 + Math.max(height(node.left), height(node.right));
};
