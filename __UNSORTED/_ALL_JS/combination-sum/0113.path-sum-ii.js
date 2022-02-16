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
 * @return {number[][]}
 */
var pathSum = function (root, sum) {
  const solutions = [];

  dfs(root, sum, [], solutions);

  return solutions;
};

var dfs = function (node, s, path, solutions) {
  if (node === null) return;

  path.push(node.val);

  if (!node.left && !node.right && s === node.val) {
    solutions.push([...path]);
  } else {
    dfs(node.left, s - node.val, path, solutions);
    dfs(node.right, s - node.val, path, solutions);
  }

  path.pop();
};
