/**
 * @param {ArrayReader} reader
 * @param {number} target
 * @return {number}
 */
const search = (reader, target) => {
  let i = 0;

  while (reader.get(i) !== 2147483647) {
    if (reader.get(i) === target) {
      return i;
    }

    i++;
  }

  return -1;
};
