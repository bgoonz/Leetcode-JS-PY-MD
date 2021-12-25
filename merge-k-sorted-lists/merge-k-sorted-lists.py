# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def mergeKLists(self, lists: List[Optional[ListNode]]) -> Optional[ListNode]:
        ret = ListNode()
        p = ret
        h = []
        cnt = 0
        for lst in lists:
            if lst:
                heapq.heappush(h, (lst.val, cnt, lst))
                cnt += 1
        while(len(h)):
            smallestPnt = heapq.heappop(h)[2]
            p.next = smallestPnt
            p = p.next
            if smallestPnt.next:
                heapq.heappush(h, (smallestPnt.next.val, cnt, smallestPnt.next))
                cnt += 1
        return ret.next