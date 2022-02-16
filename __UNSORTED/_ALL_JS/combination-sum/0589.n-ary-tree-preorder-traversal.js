/**
 * // Definition for a Node.
 * function Node(val,children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */
/**
 * @param {Node} root
 * @return {number[]}
 */
var preorder = function (root) {
  const out = [];
  pre(root, out);

  return out;
};

var pre = function (root, out) {
  if (root === null) {
    return null;
  }

  out.push(root.val);

  for (let child of root.children) {
    pre(child, out);
  }
};
