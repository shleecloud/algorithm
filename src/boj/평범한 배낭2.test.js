// @ts-check
/**
 * # 평범한 배낭
 * https://www.acmicpc.net/problem/12920
 * * 이 문제는 아주 평범한 배낭에 관한 두 번째 문제이다.
 * * 민호는 BOJ 캠프에 가기 위해 가방을 싸려고 한다. 가방에 어떠한 물건들을 넣냐에 따라 민호의 만족도가 달라진다.
 * * 집에 있는 모든 물건들을 넣으면 민호가 느낄 수 있는 만족도는 최대가 될 것이다.
 * * 하지만 민호가 들 수 있는 가방의 무게는 정해져 있어 이를 초과해 물건을 넣을수가 없다.
 * * 민호가 만족도를 최대로 느낄 수 있는 경우를 찾아보자.
 * * 단, 집에 동일한 물건들이 여러개가 있을 수 있기 때문에 **한 물건을 두개 이상 챙기는 것**도 가능하다.
 *
 * ## 입력
 * * 첫 번째 줄에 N, M (1 ≤ N ≤ 100, 1 ≤ M ≤ 10,000) 이 빈칸을 구분으로 주어진다.
 * * N은 민호의 집에 있는 물건의 종류의 수이고 M은 민호가 들 수 있는 가방의 최대 무게다.
 * * 두 번째 줄부터 N개의 줄에 걸쳐 민호의 집에 있는 물건의 정보가 주어진다.
 * * 각각의 줄은 V, C, K (1 ≤ V ≤ M, 1 ≤ C, K ≤ 10,000, 1 ≤ V * K ≤ 10,000) 으로 이루어져 있다.
 * * V는 물건의 무게, C는 물건을 가방에 넣었을 때 올라가는 민호의 만족도, K는 물건의 개수이다.
 *
 * ## 출력
 * * 최대 무게를 넘기지 않게 물건을 담았을 때 민호가 느낄 수 있는 최대 만족도를 출력한다.
 *
 * @example input: ['4 7', '6 13', '4 8', '3 6', '5 12'], output: 14
 * @param {string[]} input
 * @return {number}
 */
function solution(input) {
  const [stuffsNumber, maxWeight] = input[0].split(' ').map(Number);
  const stuffs = input
    .slice(1)
    .map((line) => line.split(' ').map(Number))
    .map(([weight, value, count]) => {
      return {
        weight,
        value,
        count,
      };
    });

  const dp = Array.from({length: maxWeight + 1}, () => 0);
  for (let i = 0; i < stuffsNumber; i++) {
    const {weight, value, count} = stuffs[i];
    for (let j = maxWeight; j >= weight; j--) {
      for (let k = 1; k <= count; k++) {
        if (j < weight * k) break;
        dp[j] = Math.max(dp[j], dp[j - weight * k] + value * k);
      }
    }
  }

  return dp[maxWeight];
}

// * BOJ Input
require('fs').readFile('/dev/stdin', (err, data) => {
  if (!data) return;
  const inputArray = data.toString().trim().split('\n');
  const result = solution(inputArray);
  console.log(Array.isArray(result) ? result.join('\n') : result);
});

// * TestCases
const testCases = [
  {input: ['2 3', '2 7 1', '1 9 3'], output: 27},
  {input: ['3 9', '8 5 1', '1 2 2', '9 4 1'], output: 7},
];
testCases.forEach(({input, output}, index) => {
  test(`TestCase ${index}`, () => {
    expect(solution(input)).toEqual(output);
  });
});
