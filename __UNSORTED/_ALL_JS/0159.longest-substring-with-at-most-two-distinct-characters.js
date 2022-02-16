/**
 * @param {string} s
 * @return {number}
 */
const lengthOfLongestSubstringTwoDistinct = s => {
  if (s.length < 3) {
    return s.length;
  }

  let left = 0;
  let right = 0;
  let map = {};
  let max = 2;

  while (right < s.length) {
    if (Object.keys(map).length < 3) {
      map[s[right]] = right;
      right++;
    }

    if (Object.keys(map).length === 3) {
      let min = Number.MAX_SAFE_INTEGER;
      let c = "";
      for (let [k, v] of Object.entries(map)) {
        if (v < min) {
          min = v;
          c = k;
        }
      }

      delete map[c];
      left = min + 1;
    }

    max = Math.max(max, right - left);
  }

  return max;
};
