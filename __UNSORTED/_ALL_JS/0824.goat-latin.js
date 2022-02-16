/**
 * @param {string} S
 * @return {string}
 */
const toGoatLatin = S => {
  const vowels = ["a", "e", "i", "o", "u"];
  const arr = S.split(" ");
  for (let i = 0; i < arr.length; i++) {
    if (vowels.includes(arr[i].toLowerCase().charAt(0))) {
      arr[i] = arr[i] + "ma";
    } else {
      arr[i] = arr[i].substr(1) + arr[i].charAt(0) + "ma";
    }

    for (let j = 0; j < i + 1; j++) {
      arr[i] = arr[i] + "a";
    }
  }

  return arr.join(" ");
};
