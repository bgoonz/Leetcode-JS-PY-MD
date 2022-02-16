/**
 * @param {number} N
 * @param {number[][]} trust
 * @return {number}
 */
const findJudge = (N, trust) => {
  const votes = new Array(N);
  for (let i = 0; i < votes.length; i++) {
    votes[i] = 0;
  }

  for (let i = 0; i < trust.length; i++) {
    votes[trust[i][1] - 1]++;
  }

  for (let i = 0; i < votes.length; i++) {
    if (votes[i] === N - 1) {
      let trustsNobody = true;
      for (let j = 0; j < trust.length; j++) {
        if (trust[j][0] === i + 1) {
          trustsNobody = false;
          break;
        }
      }

      if (trustsNobody) {
        return i + 1;
      }
    }
  }

  return -1;
};
