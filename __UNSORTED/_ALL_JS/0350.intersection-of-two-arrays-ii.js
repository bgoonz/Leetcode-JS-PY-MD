/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
const intersect = (nums1, nums2) => {
  const nums1Seen = {};
  const nums2Seen = {};

  for (let i = 0; i < nums1.length; i++) {
    if (nums1Seen[nums1[i]] === undefined) {
      nums1Seen[nums1[i]] = 1;
    } else {
      nums1Seen[nums1[i]]++;
    }
  }

  for (let i = 0; i < nums2.length; i++) {
    if (nums2Seen[nums2[i]] === undefined) {
      nums2Seen[nums2[i]] = 1;
    } else {
      nums2Seen[nums2[i]]++;
    }
  }

  const result = [];
  for ([number, frequency] of Object.entries(nums1Seen)) {
    if (!nums2Seen[number]) continue;

    let times = Math.min(frequency, nums2Seen[number]);
    while (times) {
      result.push(number);
      times--;
    }
  }

  return result;
};
