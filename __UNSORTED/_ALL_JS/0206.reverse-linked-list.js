/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
const reverseList = head => {
  let prev = null;
  let curr = head;

  while (curr) {
    let swap = curr.next;
    curr.next = prev;
    prev = curr;
    curr = swap;
  }

  return prev;
};
