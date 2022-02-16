/**
 * @param {number} x
 * @param {number} y
 * @param {number} bound
 * @return {number[]}
 */
const powerfulIntegers = (x, y, bound) => {
  const out = new Set();

  for (let i = 0; i < 20 && x ** i <= bound; i++) {
    for (let j = 0; j < 20 && x ** i + y ** j <= bound; j++) {
      out.add(x ** i + y ** j);
    }
  }

  return Array.from(out.values());
};
