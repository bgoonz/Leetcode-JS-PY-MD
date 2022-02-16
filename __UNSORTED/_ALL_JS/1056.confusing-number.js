/**
 * @param {number} N
 * @return {boolean}
 */
var confusingNumber = function (N) {
  const chars = String(N).split("").reverse();
  const mirrorChars = {
    1: "1",
    2: "x",
    3: "x",
    4: "x",
    5: "x",
    6: "9",
    7: "x",
    8: "8",
    9: "6",
    0: "0",
  };

  let newNumber = "";
  for (let i = 0; i < chars.length; i++) {
    if (mirrorChars[chars[i]] === "x") {
      return false;
    }

    newNumber += mirrorChars[chars[i]];
  }

  if (Number(newNumber) === N) {
    return false;
  }

  return true;
};
