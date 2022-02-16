/**
 * @param {number} n
 * @return {string}
 */
const countAndSay = n => {
  if (n === 1) {
    return "1";
  }

  const word = countAndSay(n - 1);
  let count = 1;
  let x = "";
  let i = 0;

  for (i = 0; i < word.length - 1; i++) {
    if (word.charAt(i) === word.charAt(i + 1)) {
      count++;
    } else {
      x += `${count}`;
      x += word.charAt(i);
      count = 1;
    }
  }

  x += `${count}`;
  x += word.charAt(i);

  return x;
};
