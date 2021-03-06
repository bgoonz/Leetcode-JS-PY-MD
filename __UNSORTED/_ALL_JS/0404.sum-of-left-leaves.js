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
const sumOfLeftLeaves = function (root) {
  if (root === null) {
    return 0;
  }

  this.s = { total: 0 };

  sum(root, this.s);

  return s.total;
};

var sum = (node, s) => {
  if (node === null) {
    return 0;
  }

  if (node.left && isLeaf(node.left)) {
    s.total += node.left.val;
  }

  sum(node.left, s);
  sum(node.right, s);
};

var isLeaf = node => node !== null && node.left === null && node.right === null;
