/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} x
 * @return {ListNode}
 */
const partition = (head, x) => {
  let leftHead = new ListNode();
  let left = leftHead;

  let rightHead = new ListNode();
  let right = rightHead;

  while (head) {
    if (head.val < x) {
      left.next = head;
      left = left.next;
    } else {
      right.next = head;
      right = right.next;
    }

    head = head.next;
  }

  right.next = null;
  left.next = rightHead.next;
  return leftHead.next;
};
