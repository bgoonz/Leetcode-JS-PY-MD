/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
const addTwoNumbers = (l1, l2) => {
  let carry = 0;
  let head = new ListNode(0);
  let curr = head;
  let p = l1;
  let q = l2;

  while (p !== null || q !== null) {
    let x = p !== null ? p.val : 0;
    let y = q !== null ? q.val : 0;
    addition = x + y + carry;
    carry = Math.floor(addition / 10);

    curr.next = new ListNode(addition % 10);
    curr = curr.next;
    if (p !== null) p = p.next;
    if (q !== null) q = q.next;
  }

  if (carry > 0) {
    curr.next = new ListNode(carry);
  }

  return head.next;
};
