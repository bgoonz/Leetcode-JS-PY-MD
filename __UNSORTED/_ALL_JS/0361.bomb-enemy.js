/**
 * @param {character[][]} grid
 * @return {number}
 */
const maxKilledEnemies = grid => {
  let max = 0;

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] !== "0") continue;
      let kills = 0;

      for (let k = i; k >= 0; k--) {
        if (grid[k][j] === "W") break;

        if (grid[k][j] === "E") kills++;
      }

      for (let k = i + 1; k < grid.length; k++) {
        if (grid[k][j] === "W") break;

        if (grid[k][j] === "E") kills++;
      }

      for (let k = j; k >= 0; k--) {
        if (grid[i][k] === "W") break;

        if (grid[i][k] === "E") kills++;
      }

      for (let k = j + 1; k < grid[i].length; k++) {
        if (grid[i][k] === "W") break;

        if (grid[i][k] === "E") kills++;
      }

      if (kills > max) {
        max = kills;
      }
    }
  }

  return max;
};
