// Given a binary tree, return the zigzag level order traversal of its nodes' values. (ie, from left to right, then right to left for the next level and alternate between).

// For example:
// Given binary tree [3,9,20,null,null,15,7],
//     3
//    / \
//   9  20
//     /  \
//    15   7
// return its zigzag level order traversal as:
// [
//   [3],
//   [20,9],
//   [15,7]
// ]
// Hide Company Tags LinkedIn Bloomberg Microsoft
// Hide Tags Tree Breadth-first Search Stack
// Hide Similar Problems (E) Binary Tree Level Order Traversal

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
let zigzagLevelOrder = function (root) {
  // bfs

  if (!root) {
    return [];
  }

  let curLevel = [];
  curLevel.push(root);

  let fromLeft = true;
  let result = [];
  let tmpResult = [];
  let nextLevel = [];

  while (curLevel.length > 0) {
    let len = curLevel.length;

    for (let i = 0; i < len; i++) {
      let node = curLevel.pop();
      tmpResult.push(node.val);

      if (fromLeft) {
        if (node.left) {
          nextLevel.push(node.left);
        }
        if (node.right) {
          nextLevel.push(node.right);
        }
      } else {
        if (node.right) {
          nextLevel.push(node.right);
        }
        if (node.left) {
          nextLevel.push(node.left);
        }
      }
    }

    fromLeft = !fromLeft;
    curLevel = nextLevel;
    nextLevel = [];
    result.push(tmpResult);
    tmpResult = [];
  }

  return result;
};
