export const getMergeSortAnimations = (array) => {
  const animations = [];
  if (array.length <= 1) return array;
  const auxiliaryArray = [...array];
  mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
  return animations;
};

function mergeSortHelper(mainArray, st, end, auxiliaryArray, animations) {
  if (st === end) return;
  const mid = Math.floor((st + end) / 2);
  
  mergeSortHelper(auxiliaryArray, st, mid, mainArray, animations);
  mergeSortHelper(auxiliaryArray, mid + 1, end, mainArray, animations);
  
  doMerge(mainArray, st, mid, end, auxiliaryArray, animations);
}

function doMerge(mainArray, st, mid, end, auxiliaryArray, animations) {
  let k = st;
  let i = st;
  let j = mid + 1;

  while (i <= mid && j <= end) {
    animations.push({ type: 'compare', indices: [i, j] });
    
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      animations.push({ type: 'swap', indices: [k, k], values: [auxiliaryArray[i], auxiliaryArray[i]] });
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      animations.push({ type: 'swap', indices: [k, k], values: [auxiliaryArray[j], auxiliaryArray[j]] });
      mainArray[k++] = auxiliaryArray[j++];
    }
    animations.push({ type: 'uncompare', indices: [i-1, j-1] });
  }

  while (i <= mid) {
    animations.push({ type: 'compare', indices: [i, i] });
    animations.push({ type: 'swap', indices: [k, k], values: [auxiliaryArray[i], auxiliaryArray[i]] });
    animations.push({ type: 'uncompare', indices: [i, i] });
    mainArray[k++] = auxiliaryArray[i++];
  }
  while (j <= end) {
    animations.push({ type: 'compare', indices: [j, j] });
    animations.push({ type: 'swap', indices: [k, k], values: [auxiliaryArray[j], auxiliaryArray[j]] });
    animations.push({ type: 'uncompare', indices: [j, j] });
    mainArray[k++] = auxiliaryArray[j++];
  }
}