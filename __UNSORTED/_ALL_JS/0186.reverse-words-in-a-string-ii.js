/**
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
const reverseWords = s => {
  let i = 0;
  let j = s.length - 1;
  reverse(s, i, j);

  let start = 0;
  let end = 0;
  for (end = 0; end < s.length; end++) {
    if (s[end] === " ") {
      reverse(s, start, end - 1);
      start = end + 1;
    }
  }

  reverse(s, start, end - 1);
};

var reverse = (s, i, j) => {
  while (i < j) {
    let swap = s[i];
    s[i] = s[j];
    s[j] = swap;

    i++;
    j--;
  }

  return s;
};
