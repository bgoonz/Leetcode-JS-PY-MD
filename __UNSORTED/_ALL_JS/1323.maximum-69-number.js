/**
 * @param {number} num
 * @return {number}
 */
var maximum69Number = function (num) {
  const s = String(num);

  for (let i = 0; i < s.length; i++) {
    if (s.charAt(i) === "6") {
      return Number.parseInt(s.slice(0, i) + "9" + s.slice(i + 1));
    }
  }

  return num;
};
