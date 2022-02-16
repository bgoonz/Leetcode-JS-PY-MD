/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function (nums1, nums2) {
  let i = nums1.length - 1;
  let j = nums2.length - 1;
  let k = nums1.length + nums2.length - 1;

  const nums3 = [];
  while (i >= 0 && j >= 0) {
    if (nums1[i] >= nums2[j]) {
      nums3[k--] = nums1[i--];
    } else {
      nums3[k--] = nums2[j--];
    }
  }

  while (j >= 0) {
    nums3[k--] = nums2[j--];
  }

  while (i >= 0) {
    nums3[k--] = nums1[i--];
  }

  if (nums3.length % 2 === 1) {
    return nums3[Math.floor((1 + nums3.length) / 2) - 1];
  } else {
    const mid = Math.floor((1 + nums3.length) / 2) - 1;
    return ((nums3[mid] + nums3[mid + 1]) / 2).toFixed(1);
  }
};
