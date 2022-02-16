/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
const postorderTraversal = root => {
  if (root === null) {
    return [];
  }

  const stack = [];
  let output = [];

  stack.push(root);
  while (stack.length) {
    const node = stack.pop();
    output = [node.val].concat(output);

    if (node.left) {
      stack.push(node.left);
    }

    if (node.right) {
      stack.push(node.right);
    }
  }

  return output;
};
