/**
 * @param {string} ransomNote
 * @param {string} magazine
 * @return {boolean}
 */
var canConstruct = function (ransomNote, magazine) {
  const letterRegistry = {};

  for (let i = 0; i < magazine.length; i++) {
    const letter = magazine.charAt(i);

    if (letterRegistry[letter] !== undefined) {
      letterRegistry[letter]++;
    } else {
      letterRegistry[letter] = 1;
    }
  }

  for (let i = 0; i < ransomNote.length; i++) {
    const letter = ransomNote.charAt(i);

    if (!letterRegistry[letter]) {
      return false;
    }

    letterRegistry[letter]--;
  }

  return true;
};
