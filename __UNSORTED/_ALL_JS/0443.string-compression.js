/**
 * @param {character[]} chars
 * @return {number}
 */
const compress = chars => {
  let str = "";
  let prev = chars[0];
  let n = 0;

  for (let i = 0; i < chars.length; i++) {
    if (chars[i] !== prev) {
      str += prev;
      prev = chars[i];

      if (n > 1) {
        str += String(n);
      }

      n = 1;
    } else {
      n++;
    }
  }

  str += prev;
  if (n > 1) {
    str += String(n);
  }

  let i;
  for (i = 0; i < str.length; i++) {
    chars[i] = str[i];
  }

  return i;
};
