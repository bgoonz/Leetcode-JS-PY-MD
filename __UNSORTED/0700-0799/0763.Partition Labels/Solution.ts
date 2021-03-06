function partitionLabels(s: string): number[] {
  const n = s.length;
  let last = new Array(128);
  for (let i = 0; i < n; i++) {
    last[s.charCodeAt(i)] = i;
  }
  let ans = [];
  let left = 0,
    right = 0;
  for (let i = 0; i < n; i++) {
    right = Math.max(right, last[s.charCodeAt(i)]);
    if (i == right) {
      ans.push(right - left + 1);
      left = right + 1;
    }
  }
  return ans;
}
