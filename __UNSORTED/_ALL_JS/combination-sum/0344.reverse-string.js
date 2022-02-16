/**
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
var reverseString = function (s) {
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
