/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
const topKFrequent = (nums, k) => {
  const freq = new Map();

  for (let i = 0; i < nums.length; i++) {
    if (!freq.has(nums[i])) {
      freq.set(nums[i], 1);
    } else {
      const val = freq.get(nums[i]);
      freq.set(nums[i], val + 1);
    }
  }

  pqueue = [];
  for (let [k, v] of freq) {
    pqueue.push({ value: k, priority: v });
  }

  pqueue.sort((a, b) => a.priority < b.priority ? -1 : a.priority > b.priority ? 1 : 0);

  const result = [];
  for (let i = pqueue.length - 1; i >= pqueue.length - k; i--) {
    result.push(pqueue[i].value);
  }

  return result;
};
