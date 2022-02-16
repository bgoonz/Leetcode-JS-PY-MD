/**
 * @param {number} A
 * @param {number} B
 * @return {string}
 */
const strWithout3a3b = (A, B) => {
  let result = [];

  while (A || B) {
    let writeA;

    if (
      result.length >= 2 &&
      result[result.length - 1] === result[result.length - 2]
    ) {
      writeA = result[result.length - 1] === "b";
    } else {
      writeA = A >= B;
    }

    if (writeA) {
      A--;
      result.push("a");
    } else {
      B--;
      result.push("b");
    }
  }

  return result.join("");
};
