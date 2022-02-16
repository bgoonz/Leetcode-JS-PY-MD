/**
 * @param {string} str
 * @return {string}
 */
const toLowerCase = str => {
  let result = "";
  for (let c of str) {
    let code = c.charCodeAt(0);
    if (code > 64 && code < 97) {
      result += String.fromCharCode(code + 32);
    } else {
      result += c;
    }
  }

  return result;
};
