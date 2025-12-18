export const getInsertionSortAnimations = (array) =>{
    const animations = [];
    let arr = [...array];
    const n = array.length;

    for(let i=1; i<n; i++) {
        let key = arr[i];
        let j = i-1;

        animations.push({type:"compare",indices:[i,j]});
        while(j >=0 && arr[j] > key) {
            animations.push({type:"compare",indices:[j,j+1]});

            arr[j+1] = arr[j];
            animations.push({type:"swap",indices:[j+1,j],values:[arr[j+1],arr[j]]});

            animations.push({type:"uncompare",indices:[j,j+1]});
            j -= 1;
        }

        arr[j+1] = key;
        animations.push({type:"swap",indices:[j+1,j+1],values:[arr[j+1],arr[j+1]]});
    }

    return animations;
}