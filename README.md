# Template
```js
function solution (input) {
    const [a, b] = (input + '').split(' ').map((s) => +s);
    return a + b;
};

require('fs').readFile('/dev/stdin', (err, data) => {
    const inputArray = data.toString().trim().split('\n')
    const result = solution(inputArray);
    console.log(Array.isArray(result) ? result.join('\n') : result);
});

test('Template', () => {
    const input = `1 2`;
    expect(solution(input)).toEqual(3);
});
```

# 백준 인풋 예시
## type1 fs.readFile
여러 줄을 한 번에 읽어서 성능 우위가 있음

```js
function solution (input) {
    const [a, b] = (input + '').split(' ').map((s) => +s);
    return a + b;
};

require('fs').readFile('/dev/stdin', (err, data) => {
    const inputArray = data.toString().trim().split('\n')
    const result = solution(inputArray);
    console.log(Array.isArray(result) ? result.join('\n') : result);
});
```

## type2 readline.createInterface
한 줄씩 읽어서 인풋 값이 많을 경우 통과되지 않는 문제도 있음

```javascript
function solution (input) {
    const [a, b] = (input + '').split(' ').map((s) => +s);
    return a + b;
};

const inputArray = [];
require('readline')
    .createInterface({input: process.stdin})
    .on('line', (line) => input.push(line.trim()))
    .on('close', (_) => {
        const result = solution(inputArray);
        console.log(Array.isArray(result) ? result.join('\n') : result);
        process.exit(0);
    });
```

# Jest 예시

파일명은 `solution.test.js`로 한다.

## type1 단순 비교 예제
```javascript
test('단순 비교 예제', () => {
  const input = `1 2`;
  expect(solution(input)).toEqual(3);
});
```

## type2 배열 비교 예제
```js
// 답이 배열일 경우 순서를 무시하는 비교
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
