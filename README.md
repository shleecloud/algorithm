# Jest 예시

파일명은 `solution.test.js`로 한다.

```javascript
test('단순 비교 예제', () => {
  const input = `1 2`;
  expect(solution(input)).toEqual(3);
});

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

# 백준 인풋 예시
## type1 fs.readFileSync
```javascript
const solution = (input) => {
    const [a, b] = (input + '').split(' ').map((s) => +s);
    return a + b;
};

const input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');
const result = solution(input);
console.log(Array.isArray(result) ? result.join('\n') : result);
```

## type2 readline.createInterface
```javascript
const solution = (input) => {
    const [a, b] = (input + '').split(' ').map((s) => +s);
    return a + b;
};

const input = [];
require('readline')
    .createInterface({input: process.stdin})
    .on('line', (line) => input.push(line.trim()))
    .on('close', (_) => {
        const result = solution(input);
        console.log(Array.isArray(result) ? result.join('\n') : result);
        process.exit(0);
    });
```


