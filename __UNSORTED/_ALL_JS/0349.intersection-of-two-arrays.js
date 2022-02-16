/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
const intersection = (nums1, nums2) => {
  const nums = nums1.length > nums2.length ? nums2 : nums1;
  const uset = new Set(nums);

  const out = [];
  for (num of uset) {
    if (nums1.length > nums2.length) {
      if (nums1.indexOf(num) !== -1) out.push(num);
    } else {
      if (nums2.indexOf(num) !== -1) out.push(num);
    }
  }

  return out;
};
