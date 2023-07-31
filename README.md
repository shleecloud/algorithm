# 테스트 예시

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
```javascript
// 한 줄
process.stdin.on('data', (input) => console.log(solution(input)));

// 여러줄
const input = [];
require('readline')
        .createInterface({ input: process.stdin })
        .on('line', (line) => input.push(line))
        .on('close', (_) => {
          console.log(solution(input));
          process.exit(0);
        });
```