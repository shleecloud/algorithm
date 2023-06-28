function binarySearch(arr, target) {
    let leftIdx = 0;
    let rightIdx = arr.length - 1;

    while (leftIdx <= rightIdx) {
        const midIdx = leftIdx + Math.floor((rightIdx - leftIdx) / 2);
        if (arr[midIdx] === target) {
            return midIdx;
        } else if (arr[midIdx] < target) {
            leftIdx = midIdx + 1;
        } else {
            rightIdx = midIdx - 1;
        }
    }

    return -1;
}

console.log(binarySearch([1, 2, 3, 4, 5, 6, 7], 6));
