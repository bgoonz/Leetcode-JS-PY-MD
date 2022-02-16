/**
 * @param {string[]} strings
 * @return {string[][]}
 */
var groupStrings = function (strings) {
  const groups = new Map();
  for (let s of strings) {
    let chars = s.split("");
    let firstCode = s.charCodeAt(0);

    let hash = "";
    for (let i = 0; i < chars.length; i++) {
      hash += String.fromCharCode(mod(chars[i].charCodeAt(0) - firstCode, 26));
    }

    if (groups.has(hash)) {
      const x = groups.get(hash);
      x.push(s);
      groups.set(hash, x);
    } else {
      groups.set(hash, [s]);
    }
  }

  return Array.from(groups.values());
};

const mod = (x, y) => ((x % y) + y) % y;
