/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
var canFinish = function (numCourses, prerequisites) {
  let courses = {};

  for (let i = 0; i < prerequisites.length; i++) {
    if (courses[prerequisites[i][1]] === undefined) {
      courses[prerequisites[i][1]] = [prerequisites[i][0]];
    } else {
      courses[prerequisites[i][1]].push(prerequisites[i][0]);
    }
  }

  let path = [];
  for (let i = 0; i < numCourses; i++) {
    if (isCyclic(i, courses, path)) {
      return false;
    }
  }

  return true;
};

var isCyclic = function (currentCourse, courses, path) {
  if (path[currentCourse]) {
    return true;
  }

  if (!courses[currentCourse]) {
    return false;
  }

  path[currentCourse] = true;
  let ok = false;

  for (let nextCourse of courses[currentCourse]) {
    ok = isCyclic(nextCourse, courses, path);
    if (ok) {
      break;
    }
  }

  path[currentCourse] = false;
  return ok;
};
