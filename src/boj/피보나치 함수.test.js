// @ts-check
/**
 * # 피보나치 함수
 * https://www.acmicpc.net/problem/1003
 * * fibonacci(N)을 호출했을 때, 0과 1이 각각 몇 번 출력되는지 구하는 프로그램을 작성하시오.
 *
 * ## 입력
 * * 첫째 줄에 테스트 케이스의 개수 T가 주어진다.
 * * 각 테스트 케이스는 한 줄로 이루어져 있고, N이 주어진다. N은 40보다 작거나 같은 자연수 또는 0이다.
 *
 * ## 출력
 * * 각 테스트 케이스마다 0이 출력되는 횟수와 1이 출력되는 횟수를 공백으로 구분해서 출력한다.
 *
 * ## 풀이
 * 순서대로 케이스를 나열하면 규칙성을 발견할 수 있다.
 *
 * @example input: [1, 2], output: '3'
 * @param {string[]} input
 * @return {string[]}
 */
function solution(input) {
  const testCases = input.slice(1).map(Number);
  const result = [];

  const getFibonacciZeroOneCount = (n) => {
    if (n === 0) return [1, 0];

    let zeroCount = 0;
    let oneCount = 1;

    for (let i = 1; i < n; i++) {
      [zeroCount, oneCount] = [oneCount, zeroCount + oneCount];
    }

    return [zeroCount, oneCount];
  };

  testCases.forEach((testCase) => {
    const [zeroCount, oneCount] = getFibonacciZeroOneCount(testCase);
    result.push(`${zeroCount} ${oneCount}`);
  });

  return result;
}

// * BOJ Input
require('fs').readFile('/dev/stdin', (err, data) => {
  const inputArray = data.toString().trim().split('\n');
  const result = solution(inputArray);
  console.log(Array.isArray(result) ? result.join('\n') : result);
});

// * TestCases
const testCases = [
  {input: ['3', '0', '1', '3'], output: ['1 0', '0 1', '1 2']},
  {input: ['2', '6', '22'], output: ['5 8', '10946 17711']},
];

testCases.forEach(({input, output}, index) => {
  test(`TestCase ${index}`, () => {
    expect(solution(input)).toEqual(output);
  });
});
