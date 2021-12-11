/**
 * @param {string} s
 * @return {string}
 */
function longestPalindrome(s) {
  let maxLength = 0, left = 0, right = 0;
  for (let i = 0; i < s.length; i++) {
    let singleCharLength = getPalLenByCenterChar(s, i, i);
    let doubleCharLength = getPalLenByCenterChar(s, i, i + 1);
    let max = Math.max(singleCharLength, doubleCharLength);
    if (max > maxLength) {
      maxLength = max;
      left = i - parseInt((max - 1) / 2);
      right = i + parseInt(max / 2);
    }
  }
  return s.slice(left, right + 1);
}

function getPalLenByCenterChar(s, left, right) {

  if (s[left] != s[right]) {
    return right - left; 
  }
  while (left > 0 && right < s.length - 1) {

    left--;
    right++;
    if (s[left] != s[right]) {
      return right - left - 1;
    }
  }
  return right - left + 1;
}

console.log(longestPalindrome("cbbd"));
