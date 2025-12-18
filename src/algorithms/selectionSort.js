export const getSelectionSortAnimations = (array) => {
  const animations = [];
  const arr = [...array];
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      animations.push({ type: 'compare', indices: [minIdx, j] });
      
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
      animations.push({ type: 'uncompare', indices: [minIdx, j] });
    }
    
    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
      animations.push({ 
        type: 'swap', 
        indices: [i, minIdx], 
        values: [arr[i], arr[minIdx]] 
      });
    }
  }
  return animations;
};