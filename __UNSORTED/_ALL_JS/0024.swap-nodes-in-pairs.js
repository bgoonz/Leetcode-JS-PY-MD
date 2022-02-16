/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
const swapPairs = head => {
  const h = new ListNode(null);
  h.next = head;

  let prev = h;

  while (head && head.next) {
    let p = head;
    let q = head.next;

    prev.next = q;
    p.next = q.next;
    q.next = p;

    prev = p;
    head = p.next;
  }

  return h.next;
};
