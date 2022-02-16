/**
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
const reverseString = s => {
  let start = 0;
  let end = s.length - 1;

  while (start < end) {
    swap = s[start];
    s[start] = s[end];
    s[end] = swap;

    end--;
    start++;
  }
};
