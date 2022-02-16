/**
 * @param {string[]} emails
 * @return {number}
 */
const numUniqueEmails = emails => {
  const db = {};

  for (let i = 0; i < emails.length; i++) {
    let [user, domain] = emails[i].split("@");
    user = user.replace(/[.]/gi, "");
    let [u, _] = user.split("+");
    u += "@" + domain;

    if (!db[u]) {
      db[u] = 1;
    }
  }

  let s = 0;
  for (let v of Object.values(db)) {
    s += v;
  }

  return s;
};
