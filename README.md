# BOJ Template
* `parseBOJTestCase` 함수로 백준 예제를 테스트 케이스 자료형으로 변환한다. 
```js
// @ts-check

/** 
 * # 문제 이름
 * 문제 URL
 * * 문제 설명 1
 * * 문제 설명 2
 * * 문제 설명 3
 * 
 * ## 입력
 * * 입력 조건 1
 * * 입력 조건 2
 * 
 * ## 출력
 * * 출력 조건 1
 * * 출력 조건 2
 * 
 * @example input: [1, 2], output: '3'
 * @param {string[]} input
 * @return {number | string | string[]}
*/
function solution (input) {
    const [a, b] = (input + '').split(' ').map((s) => +s);
    return a + b;
};

// * BOJ Input
require('fs').readFile('/dev/stdin', (err, data) => {
    const inputArray = data.toString().trim().split('\n')
    const result = solution(inputArray);
    console.log(Array.isArray(result) ? result.join('\n') : result);
});

// * TestCases
const testCases = [ { input: [ '1 2' ], output: '3' } ]

testCases.forEach(({input, output}, index) => {
  test(`TestCase ${index}`, () => {
    expect(solution(input)).toEqual(output);
  });
});
```

# Jest 예시

* 파일명은 `<문제 이름>.test.js`로 한다.

## type1 단순 비교 예제
```javascript
test('단순 비교 예제', () => {
  expect(solution(`1 2`)).toEqual(3);
});
```

## type2 배열 비교 예제
```js
// 답이 배열이며 순서를 무시하는 비교
test('배열 예제', () => {
    expect(solution([1, 2, 3, 4], 3)).toEqual(
        expect.arrayContaining([ // <----- arrayContaining 사용
            [1, 2, 3],
            [1, 2, 4],
            [1, 3, 4],
            [2, 3, 4],
        ]),
    );
});

```
