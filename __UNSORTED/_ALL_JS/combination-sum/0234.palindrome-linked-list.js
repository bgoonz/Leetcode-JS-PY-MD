/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {boolean}
 */
var isPalindrome = function (head) {
  const list = [];

  let p = head;
  while (p) {
    list.push(p.val);
    p = p.next;
  }

  let i = 0,
    j = list.length - 1;
  while (i < j && list[i] === list[j]) {
    i++;
    j--;
  }

  return list[i] === list[j] && j - i <= 1;
};
