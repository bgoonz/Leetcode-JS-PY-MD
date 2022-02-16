/**
 * Definition for Employee.
 * function Employee(id, importance, subordinates) {
 *     this.id = id;
 *     this.importance = importance;
 *     this.subordinates = subordinates;
 * }
 */

/**
 * @param {Employee[]} employees
 * @param {number} id
 * @return {number}
 */
const GetImportance = (employees, id) => {
  const map = {};

  for (let e of employees) {
    map[e.id] = e;
  }

  return helper(map[id], map);
};

var helper = (e, map) => {
  if (!e.subordinates.length) {
    return e.importance;
  }

  let s = e.importance;
  for (let id of e.subordinates) {
    s += helper(map[id], map);
  }

  return s;
};
