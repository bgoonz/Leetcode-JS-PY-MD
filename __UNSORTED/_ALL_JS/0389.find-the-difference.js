/**
 * @param {string} s
 * @param {string} t
 * @return {character}
 */
const findTheDifference = (s, t) => {
  let sumS = 0;
  let sumT = 0;

  for (let i = 0; i < s.length; i++) {
    sumS += s.charCodeAt(i);
    sumT += t.charCodeAt(i);
  }

  sumT += t.charCodeAt(t.length - 1);

  return String.fromCharCode(sumT - sumS);
};
