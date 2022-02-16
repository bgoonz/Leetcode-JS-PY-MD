/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {number[]} nums
 * @return {TreeNode}
 */
const sortedArrayToBST = (nums, start, end) => {
  if (start === undefined && end === undefined) {
    start = 0;
    end = nums.length - 1;
  }

  if (start > end) {
    return null;
  }

  let mid = Math.floor((start + end) / 2);
  let root = new TreeNode(nums[mid]);

  root.left = sortedArrayToBST(nums, start, mid - 1);
  root.right = sortedArrayToBST(nums, mid + 1, end);

  return root;
};
