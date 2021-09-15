const quickSort = function (arr) {
  // TODO: 여기에 코드를 작성합니다.
  if (arr.length < 2) return arr;

  const pivot = [arr[0]];
  const left = [];
  const right = [];

  for (let el = 0; el < arr.length; el += 1) {
    if (pivot > arr[el]) left.push(arr[el]);
    else if (pivot < arr[el]) right.push(arr[el]);
    else if (pivot === arr[el]) pivot.push(arr[el]);
  }
  return [...quickSort(left), ...pivot, ...quickSort(right)];
};

arr = [5, 4, 3, 2, 1, 3, 3, 3];
const result = quickSort(arr);
// onst hashed = sha256(result);

console.log(result);
