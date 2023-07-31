// 이진탐색
function binarySearchTest(arr, target) {
  let leftIdx = 0;
  let rightIdx = arr.length - 1;

  while (leftIdx <= rightIdx) {
    const midIdx = leftIdx + Math.floor((rightIdx - leftIdx) / 2);

    if (arr[midIdx] === target) return midIdx;

    if (arr[midIdx] < target) {
      leftIdx = midIdx + 1;
    } else {
      rightIdx = midIdx - 1;
    }
  }

  return -1;
}

test('binarySearch', () => {
  expect(binarySearchTest([1, 2, 3, 4, 5, 6, 7], 6)).toBe(5);
});

// 재귀 이진탐색
function recursiveBinarySearch(arr, leftIdx, rightIdx, target) {
  if (leftIdx > rightIdx) {
    return -1;
  }

  const midIndex = leftIdx + Math.floor((rightIdx - leftIdx) / 2);
  if (arr[midIndex] === target) {
    return midIndex;
  } else if (target < arr[midIndex]) {
    return recursiveBinarySearch(arr, leftIdx, midIndex - 1, target);
  } else {
    return recursiveBinarySearch(arr, midIndex + 1, rightIdx, target);
  }
}

test('recursiveBinarySearch', () => {
  expect(recursiveBinarySearch([1, 2, 3, 4, 5, 6, 7], 0, targetArr.length - 1, 6)).toBe(5);
});
