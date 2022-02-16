/**
 * @param {number[]} height
 * @return {number}
 */
const maxArea = height => {
  let i = 0;
  let j = height.length - 1;
  let maxVol = -1;

  while (i < j) {
    if (height[i] < height[j]) {
      let vol = (j - i) * height[i];
      maxVol = Math.max(maxVol, vol);
      i++;
    } else {
      let vol = (j - i) * height[j];
      maxVol = Math.max(maxVol, vol);
      j--;
    }
  }

  return maxVol;
};
