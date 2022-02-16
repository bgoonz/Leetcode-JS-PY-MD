/**
 * @param {string[]} cpdomains
 * @return {string[]}
 */
const subdomainVisits = cpdomains => {
  const domainVisits = {};

  for (const cpdomain of Object.values(cpdomains)) {
    let [hits, domain] = cpdomain.split(" ");
    const subdomains = domain.split(".");

    let d = "";
    for (let i = subdomains.length - 1; i >= 0; --i) {
      d = subdomains[i] + (i < subdomains.length - 1 ? "." : "") + d;

      if (domainVisits[d] === undefined) {
        domainVisits[d] = Number.parseInt(hits);
      } else {
        domainVisits[d] += Number.parseInt(hits);
      }
    }
  }

  return Object.keys(domainVisits).map((d) => `${domainVisits[d]} ${d}`);
};
