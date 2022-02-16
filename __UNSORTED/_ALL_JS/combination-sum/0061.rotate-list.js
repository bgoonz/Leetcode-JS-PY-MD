/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var rotateRight = function (head, k) {
  if (head === null) {
    return null;
  }

  if (head.next === null) {
    return head;
  }

  let t = new ListNode(null);
  t.next = head;

  let count = 0;
  let p = t.next;
  while (p) {
    p = p.next;
    count++;
  }

  let q = k;
  if (count < q) {
    q = k % count;
  }

  while (q) {
    let p = t.next;
    while (p.next.next) {
      p = p.next;
    }

    p.next.next = t.next;
    t.next = p.next;
    p.next = null;

    q--;
  }

  return t.next;
};
