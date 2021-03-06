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
 * @return {string[]}
 */
const binaryTreePaths = root => {
  const solutions = [];

  dfs(root, "", solutions);

  return solutions;
};

var dfs = (node, currPath, solutions) => {
  if (node === null) {
    return;
  }

  currPath += node.val;
  if (!node.left && !node.right) {
    solutions.push(currPath);
  } else {
    currPath += "->";
    dfs(node.left, currPath, solutions);
    dfs(node.right, currPath, solutions);
  }
};
