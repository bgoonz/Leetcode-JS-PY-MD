/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} s
 * @param {TreeNode} t
 * @return {boolean}
 */
const isSubtree = (s, t) => dfs(s, "left").indexOf(dfs(t, "left")) !== -1;

var dfs = (node, side) => {
  if (node === null) {
    if (side === "left") {
      return "leftNull";
    } else {
      return "rightNull";
    }
  }

  return (
    "$" +
    node.val +
    " " +
    dfs(node.left, "left") +
    " " +
    dfs(node.right, "right")
  );
};
