/**
 * @param {string} A
 * @param {string} B
 * @return {boolean}
 */
const rotateString = (A, B) => A.length === B.length && (A + A).includes(B);
