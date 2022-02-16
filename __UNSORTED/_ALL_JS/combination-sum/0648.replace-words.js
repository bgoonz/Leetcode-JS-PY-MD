/**
 * @param {string[]} dict
 * @param {string} sentence
 * @return {string}
 */
var replaceWords = function (dict, sentence) {
  const rootset = new Set(dict);

  let result = "";
  const words = sentence.split(" ");
  for (w of words) {
    let prefix = "";
    for (let i = 0; i < w.length; i++) {
      prefix = w.slice(0, i + 1);
      if (rootset.has(prefix)) {
        break;
      }
    }

    if (result.length > 0) {
      result += " ";
    }
    result += prefix;
  }

  return result;
};
