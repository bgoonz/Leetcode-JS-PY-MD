function countVowels(word: string): number {
  const n = word.length;
  let ans = 0;
  for (let i = 0; i < n; i++) {
    let char = word.charAt(i);
    if (["a", "e", "i", "o", "u"].includes(char)) {
      ans += (i + 1) * (n - i);
    }
  }
  return ans;
}
