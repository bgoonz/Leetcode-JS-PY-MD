/**
 * Definition for isBadVersion()
 *
 * @param {integer} version number
 * @return {boolean} whether the version is bad
 * isBadVersion = function(version) {
 *     ...
 * };
 */

/**
 * @param {function} isBadVersion()
 * @return {function}
 */
const solution = isBadVersion => /**
 * @param {integer} n Total versions
 * @return {integer} The first bad version
 */
n => {
  let lo = 1;
  let hi = n;

  while (lo <= hi) {
    let mid = Math.floor((hi + lo) / 2);

    if (!isBadVersion(mid)) {
      lo = mid + 1;
    } else {
      hi = mid - 1;
    }
  }

  return lo;
};
