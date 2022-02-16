/**
 * // Definition for a Node.
 * function Node(val,children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */
/**
 * @param {Node} root
 * @return {number}
 */
const maxDepth = root => {
  if (root === null) {
    return 0;
  } else if (root.children.length === 0) {
    return 1;
  } else {
    const heights = [];

    for (const child of root.children) {
      heights.push(maxDepth(child));
    }
    return Math.max(...heights) + 1;
  }
};
