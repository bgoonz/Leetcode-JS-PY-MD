// With extra memory, linear complexity
// O(n) = 2n

/**
 * @param {number[]} nums
 * @return {number}
 */
const singleNumber = nums => {
  const freq = {};

  for (let n of nums) {
    if (freq[n] === undefined) {
      freq[n] = 1;
    } else {
      freq[n]++;
    }
  }

  for (let [k, v] of Object.entries(freq)) {
    if (v === 1) {
      return k;
    }
  }
};

// No extra memory solution, linear complexity
// O(n) = nlog(n) + n/3

/**
 * @param {number[]} nums
 * @return {number}
 */
// var singleNumber = function(nums) {
//   nums.sort();

//   for (let i = 0; i < nums.length - 3; i += 3) {
//     if (nums[i] === nums[i + 1] && nums[i+2] !== nums[i+1]) {
//       return nums[i+2]
//     }

//     if (nums[i] !== nums[i+1] && nums[i] === nums[i+2]) {
//       return nums[i+1]
//     }

//     if (nums[i+1] === nums[i+2] && nums[i+1] !== nums[i]) {
//       return nums[i]
//     }
//   }

//   return nums[nums.length - 1];
// };
