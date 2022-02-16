/**
 * @param {number} num
 * @return {string}
 */
var intToRoman = function (input) {
  if (input >= 1000) {
    return (
      thousandsToRoman(Math.floor(input / 1000)) +
      hundredsToRoman(Number.parseInt(String(input).charAt(1), 10)) +
      digitsToRoman(input % 100)
    );
  } else if (input >= 100 && input <= 999) {
    return (
      hundredsToRoman(Math.floor(input / 100)) + digitsToRoman(input % 100)
    );
  }

  return digitsToRoman(input);
};

var digitsToRoman = function (input) {
  if (input <= 3) {
    return rangeToRoman(input % 4, "I");
  } else if (input === 4) {
    return "IV";
  } else if (input <= 8) {
    return "V" + rangeToRoman(input - 5, "I");
  } else if (input === 9) {
    return "IX";
  } else if (input === 10) {
    return "X";
  } else if (input <= 39) {
    return (
      rangeToRoman(Math.floor(input / 10), "X") + digitsToRoman(input % 10)
    );
  } else if (input === 40) {
    return "XL";
  } else if (input <= 49) {
    return "XL" + digitsToRoman(input % 10);
  } else if (input === 50) {
    return "L";
  } else if (input <= 89) {
    return "L" + digitsToRoman(input - 50);
  } else if (input === 90) {
    return "XC";
  }

  return "XC" + digitsToRoman(input % 10);
};

var hundredsToRoman = function (input) {
  if (input <= 3) {
    // 100 - 300
    return rangeToRoman(input % 4, "C");
  } else if (input === 4) {
    // 400
    return "CD";
  } else if (input <= 8) {
    // 500 - 800
    return "D" + hundredsToRoman(input - 5, "C");
  }

  // 900
  return "CM";
};

var thousandsToRoman = function (input) {
  // 1000 - 3000
  return rangeToRoman(input % 4, "M");
};

var range = function (top) {
  return Array.from({ length: top });
};

var rangeToRoman = function (input, char) {
  return range(input)
    .map((_) => char)
    .join("");
};
