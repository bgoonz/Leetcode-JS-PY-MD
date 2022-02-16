/**
 * @param {number[][]} moves
 * @return {string}
 */
var tictactoe = function (moves) {
  const grid = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];
  for (let i = 0; i < moves.length; i++) {
    grid[moves[i][0]][moves[i][1]] = i % 2 === 0 ? "X" : "O";
  }

  let state;
  if (moves.length < 9) {
    state = "Pending";
  }

  if (moves.length === 9) {
    state = "Draw";
  }

  for (let i = 0; i < 3; i++) {
    let rowValue = grid[i][0];
    if (rowValue !== null) {
      let ok = true;
      for (let j = 0; j < 3; j++) {
        if (rowValue !== grid[i][j]) {
          ok = false;
        }
      }

      if (ok) return rowValue === "X" ? "A" : "B";
    }
  }

  for (let i = 0; i < 3; i++) {
    let colValue = grid[0][i];
    if (colValue !== null) {
      let ok = true;

      for (let j = 0; j < 3; j++) {
        if (colValue !== grid[j][i]) {
          ok = false;
        }
      }

      if (ok) return colValue === "X" ? "A" : "B";
    }
  }

  let dValue = grid[0][0];
  if (dValue !== null) {
    let ok = true;
    for (let i = 0; i < 3; i++) {
      if (grid[i][i] !== dValue) {
        ok = false;
      }
    }

    if (ok) {
      return dValue === "X" ? "A" : "B";
    }
  }

  let dminValue = grid[0][2];
  if (dminValue !== null) {
    ok = true;
    for (let i = 2; i >= 0; i--) {
      if (grid[i][2 - i] !== dminValue) {
        ok = false;
      }
    }

    if (ok) {
      return dminValue === "X" ? "A" : "B";
    }
  }

  return state;
};
