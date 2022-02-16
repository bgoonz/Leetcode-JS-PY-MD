/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function (board, word) {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (backtrack(board, board.length, board[i].length, i, j, word, 0)) {
        return true;
      }
    }
  }

  return false;
};

var backtrack = function (board, rows, cols, row, col, word, index) {
  if (index >= word.length) {
    return true;
  }

  if (
    row < 0 ||
    row === rows ||
    col < 0 ||
    col === cols ||
    board[row][col] !== word.charAt(index)
  ) {
    return false;
  }

  let ret = false;
  board[row][col] = "*";

  let rowOffsets = [0, 1, 0, -1];
  let colOffsets = [1, 0, -1, 0];

  for (let i = 0; i < 4; i++) {
    ret = backtrack(
      board,
      rows,
      cols,
      row + rowOffsets[i],
      col + colOffsets[i],
      word,
      index + 1
    );

    if (ret) {
      break;
    }
  }

  board[row][col] = word.charAt(index);
  return ret;
};
