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
const postorder = root => {
  const results = [];
  postorderHelper(root, results);
  root && results.push(root.val);

  return results;
};

var postorderHelper = (root, results) => {
  if (root === null) {
    return null;
  }

  for (const child of root.children) {
    postorderHelper(child, results);
    results.push(child.val);
  }
};
