/**
 * @param {string} moves
 * @return {boolean}
 */
var judgeCircle = function (moves) {
  let x = 0;
  let y = 0;

  for (let i = 0; i < moves.length; i++) {
    switch (moves[i]) {
      case "L":
        y--;
        break;
      case "R":
        y++;
        break;
      case "U":
        x++;
        break;
      default:
        x--;
        break;
    }
  }

  return x === 0 && y === 0;
};
