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
const mergeTwoLists = (l1, l2) => {
  const head = new ListNode(0);
  let prev = head;

  while (l1 && l2) {
    if (l1.val < l2.val) {
      prev.next = l1;
      l1 = l1.next;
    } else {
      prev.next = l2;
      l2 = l2.next;
    }

    prev = prev.next;
  }

  if (!l1) {
    prev.next = l2;
  }

  if (!l2) {
    prev.next = l1;
  }

  return head.next;
};
