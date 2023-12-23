// @ts-check
/**
 * # 피보나치 수
 * https://www.acmicpc.net/problem/2747
 * https://www.acmicpc.net/problem/2748
 *
 * ## 문제
 * 피보나치 수는 0과 1로 시작한다. 0번째 피보나치 수는 0이고, 1번째 피보나치 수는 1이다. 그 다음 2번째 부터는 바로 앞 두 피보나치 수의 합이 된다.
 * 이를 식으로 써보면 Fn = Fn-1 + Fn-2 (n ≥ 2)가 된다.
 * n=17일때 까지 피보나치 수를 써보면 다음과 같다.
 * 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597
 * n이 주어졌을 때, n번째 피보나치 수를 구하는 프로그램을 작성하시오.
 *
 * ## 입력
 * 첫째 줄에 n이 주어진다. n은 45보다 작거나 같은 자연수이다.
 *
 * ## 출력
 * 첫째 줄에 n번째 피보나치 수를 출력한다.
 *
 * @example input: [1, 2], output: '3'
 * @param {string[]} input
 * @return {number | string | string[]}
 */
function solution(input) {
  const n = Number(input[0]);

  const dp = [BigInt(0), BigInt(1)];
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }

  return String(dp[n]);
}

// * BOJ Input
require('fs').readFile('/dev/stdin', (err, data) => {
  const inputArray = data.toString().trim().split('\n');
  const result = solution(inputArray);
  console.log(Array.isArray(result) ? result.join('\n') : result);
});

// * TestCases
const testCases = [
  {input: ['10'], output: '55'},
  {input: ['90'], output: '2880067194370816120'},
];

testCases.forEach(({input, output}, index) => {
  test(`TestCase ${index}`, () => {
    expect(solution(input)).toEqual(output);
  });
});
