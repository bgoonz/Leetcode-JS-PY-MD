/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */

function ListNode(val) {
      this.val = val;
       this.next = null;
}
let mergeTwoLists = function(list1, list2) {
    let dummyHead = new ListNode(0);
    let currentNode = dummyHead; 

    while(list1 !== null && list2 !== null){

        if(list1.val < list2.val){
            currentNode.next = list1;
            list1 = list1.next
        } else {
            currentNode.next = list2
            list2 = list2.next
        }

        currentNode = currentNode.next
    }

    if(list1 !== null) {
        currentNode.next = list1;
    } else if (list2 !== null) {
        currentNode.next = list2
    }

    return dummyHead.next


    
};
