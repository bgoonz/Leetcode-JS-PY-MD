/**
 * @param {number[]} bills
 * @return {boolean}
 */
const lemonadeChange = bills => {
  let fives = 0;
  let tens = 0;
  for (let i = 0; i < bills.length; i++) {
    if (bills[i] === 5) {
      fives++;
    } else if (bills[i] === 10) {
      if (!fives) {
        return false;
      } else {
        fives--;
        tens++;
      }
    } else {
      // Check this branch first because for large inputs
      // you will run out of small bills faster.
      if (fives > 0 && tens > 0) {
        fives--;
        tens--;
      } else if (fives > 2) {
        fives -= 3;
      } else {
        return false;
      }
    }
  }

  return true;
};
