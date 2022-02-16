/**
 * @param {string} S
 * @return {string}
 */
const maskPII = S => {
  if (S.indexOf("@") !== -1) return maskEmail(S);

  return maskPhone(S);
};

var maskEmail = S => {
  let emailParts = S.split("@");
  let names = [emailParts[0], ...emailParts[1].split(".")];

  names[0] =
    names[0].charAt(0).toLowerCase() +
    "*****" +
    names[0].charAt(names[0].length - 1).toLowerCase();

  return names[0] + "@" + names[1].toLowerCase() + "." + names[2].toLowerCase();
};

var maskPhone = S => {
  let s = S.trim();

  let sign;
  const chars = [];
  s = s.replace(/[() +-]/gi, "");

  if (s.length > 10) {
    sign = ["-", "+"].includes(S.charAt(0)) ? S.charAt(0) : "+";
  }

  let i = 0;
  let ccCodeLength = 0;
  if (sign) {
    chars.push(sign);

    ccCodeLength = s.length - 10;
    while (i < ccCodeLength) {
      chars.push("*");
      i++;
    }

    chars.push("-");
  }

  while (i < s.length) {
    if (i === ccCodeLength + 3 || i === ccCodeLength + 6) {
      chars.push("-");
    }

    if (i > ccCodeLength + 5) {
      chars.push(s.charAt(i));
    } else {
      chars.push("*");
    }

    i++;
  }

  return chars.join("");
};
