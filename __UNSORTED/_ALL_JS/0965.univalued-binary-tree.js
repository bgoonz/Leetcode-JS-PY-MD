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
const isUnivalTree = root => {
  if (root === null) {
    return true;
  }

  const v = root.val;

  return helper(root, v);
};

var helper = (node, value) => {
  if (node === null) {
    return true;
  }

  const left = helper(node.left, value);

  if (!left) {
    return false;
  }

  const right = helper(node.right, value);

  if (!right) {
    return false;
  }

  if (node.val !== value) {
    return false;
  }

  return true;
};
