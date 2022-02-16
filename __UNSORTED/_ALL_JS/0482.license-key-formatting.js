/**
 * @param {string} S
 * @param {number} K
 * @return {string}
 */
const licenseKeyFormatting = (S, K) => {
  const out = [];

  for (let i = S.length - 1, rem = K + 1; i >= 0; i--) {
    if (S.charAt(i) === "-") continue;

    if (--rem === 0) {
      out.push("-");
      rem = K;
    }

    out.push(S.charAt(i).toUpperCase());
  }

  return out.reverse().join("");
};
