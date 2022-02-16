/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
const merge = (nums1, m, nums2, n) => {
  const nums1Copy = Array.from(nums1);
  let i = 0;
  let j = 0;
  let p = 0;

  while (i < m && j < n) {
    if (nums1Copy[i] < nums2[j]) {
      nums1[p] = nums1Copy[i];
      i++;
    } else {
      nums1[p] = nums2[j];
      j++;
    }

    p++;
  }

  if (i === m) {
    for (let k = j; k < n; k++) {
      nums1[p++] = nums2[k];
    }
  } else if (j === n) {
    for (let k = i; k < m; k++) {
      nums1[p++] = nums1Copy[k];
    }
  }
};
