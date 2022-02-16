/**
 * @param {string[]} list1
 * @param {string[]} list2
 * @return {string[]}
 */
var findRestaurant = function (list1, list2) {
  const common = {};
  for (let i = 0; i < list1.length; i++) {
    const j = list2.indexOf(list1[i]);
    if (j !== -1) {
      common[list1[i]] = i + j;
    }
  }

  const output = [];
  const min = Math.min(...Object.keys(common).map((k) => common[k]));

  Object.keys(common).map((k) => {
    if (common[k] === min) {
      output.push(k);
    }
  });

  return output;
};
