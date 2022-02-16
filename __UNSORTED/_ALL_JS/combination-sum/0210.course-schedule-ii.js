const WHITE = 0;
const GREY = 1;
const BLACK = 2;

/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {number[]}
 */
var findOrder = function (numCourses, prerequisites) {
  const result = [];
  const visited = [];

  for (let i = 0; i < numCourses; i++) {
    visited[i] = WHITE;
  }

  const adj = {};

  for (let p of prerequisites) {
    if (adj[p[1]] === undefined) {
      adj[p[1]] = [p[0]];
    } else {
      adj[p[1]].push(p[0]);
    }
  }

  var isPossible = true;
  var helper = function (node) {
    if (!isPossible) {
      return;
    }

    visited[node] = GREY;

    if (adj[node] !== undefined) {
      for (let next of adj[node]) {
        if (visited[next] === WHITE) {
          helper(next, adj, visited, result);
        } else if (visited[next] === GREY) {
          isPossible = false;
        }
      }
    }

    result.push(node);
    visited[node] = BLACK;
  };

  for (let v = 0; v < numCourses; v++) {
    if (visited[v] === WHITE) {
      helper(v, adj, visited, result);
    }
  }

  return isPossible ? result.reverse() : [];
};
