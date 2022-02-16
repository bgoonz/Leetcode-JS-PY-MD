/**
 * Encodes a list of strings to a single string.
 *
 * @param {string[]} strs
 * @return {string}
 */
const encode = strs => {
  if (strs.length === 0) {
    return "\u1F602";
  }

  return strs.join("\u1F601");
};

/**
 * Decodes a single string to a list of strings.
 *
 * @param {string} s
 * @return {string[]}
 */
const decode = s => {
  if (s === "\u1F602") {
    return [];
  }

  return s.split("\u1F601");
};

/**
 * Your functions will be called as such:
 * decode(encode(strs));
 */
