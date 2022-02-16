/**
 * Definition for read4()
 *
 * @param {character[]} buf4 Destination buffer
 * @return {number} The number of actual characters read
 * read4 = function(buf4) {
 *     ...
 * };
 */

/**
 * @param {function} read4()
 * @return {function}
 */
const solution = read4 => /**
 * @param {character[]} buf Destination buffer
 * @param {number} n Number of characters to read
 * @return {number} The number of actual characters read
 */
(buf, n) => {
  let c = 0;
  let total = 0;
  do {
    const intBuffer = [];
    c = read4(intBuffer);
    total += c;
    let offset = 0;
    if (total > n) {
      offset = total - n;
    }

    for (let i = 0; i < intBuffer.length - offset; i++) {
      buf.push(intBuffer[i]);
    }
  } while (c && total <= n);
};
