/**
 * @param {string} s
 * @return {string[]}
 */
const findRepeatedDnaSequences = s => {
  const frequency = {};
  for (let i = 0; i < s.length; i++) {
    const sequence = s.slice(i, i + 10);
    if (frequency[sequence] === undefined) {
      frequency[sequence] = 1;
    } else {
      frequency[sequence]++;
    }
  }

  return Object.keys(frequency).filter((sequence) => frequency[sequence] > 1);
};
