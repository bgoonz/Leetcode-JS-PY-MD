/**
 * @param {string[]} ops
 * @return {number}
 */
var calPoints = function (ops) {
  const scores = [];

  for (let i = 0; i < ops.length; i++) {
    if (ops[i] === "+") {
      const score = scores.pop();
      const prevScore = scores.pop();

      scores.push(prevScore);
      scores.push(score);
      scores.push(score + prevScore);
    } else if (ops[i] === "D") {
      const score = scores.pop();

      scores.push(score);
      scores.push(score * 2);
    } else if (ops[i] === "C") {
      scores.pop();
    } else {
      scores.push(Number.parseInt(ops[i], 10));
    }
  }

  let sum = 0;
  for (let i = 0; i < scores.length; i++) {
    sum += scores[i];
  }
  return sum;
};
