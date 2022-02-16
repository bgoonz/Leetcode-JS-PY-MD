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
const preorder = root => {
  const out = [];
  pre(root, out);

  return out;
};

var pre = (root, out) => {
  if (root === null) {
    return null;
  }

  out.push(root.val);

  for (let child of root.children) {
    pre(child, out);
  }
};
