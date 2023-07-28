const getCombinations = function (arr, selectNumber) {
  const results = [];
  const stack = [];

  arr.forEach((value, index) => {
    stack.push({index, data: [value]});
  });

  while (stack.length) {
    const {index, data} = stack.pop();

    if (data.length === selectNumber) {
      results.push(data);
    } else {
      for (let i = index + 1; i < arr.length; i++) {
        stack.push({index: i, data: [...data, arr[i]]});
      }
    }
  }

  return results;
};

const example1 = [1, 2, 3, 4];
const result1 = getCombinations(example1, 3);
console.log('-> result1', result1);
// => [ [ 1, 2, 3 ], [ 1, 2, 4 ], [ 1, 3, 4 ], [ 2, 3, 4 ] ]

const getCombinationsRecursive = function (arr, selectNumber) {
  const results = [];
  if (selectNumber === 1) return arr.map((value) => [value]); // 1개씩 택할 때, 바로 모든 배열의 원소 return

  arr.forEach((fixed, index, origin) => {
    // const rest = origin.slice(index + 1); // 해당하는 fixed를 제외한 나머지 뒤
    const rest = [...origin.slice(index + 1)]; // 해당하는 fixed를 제외한 나머지 배열
    const combinations = getCombinations(rest, selectNumber - 1); // 나머지에 대해서 조합을 구한다.
    const attached = combinations.map((el) => [fixed, ...el]); //  돌아온 조합에 떼 놓은(fixed) 값 붙이기
    results.push(...attached); // 배열 spread syntax 로 모두다 push
  });

  return results; // 결과 담긴 results return
};

const example = [1, 2, 3, 4];
const result = getCombinationsRecursive(example, 3);
console.log('-> result', result);
// => [ [ 1, 2, 3 ], [ 1, 2, 4 ], [ 1, 3, 4 ], [ 2, 3, 4 ] ]
