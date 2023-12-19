// @ts-check
/**
 * # 평범한 배낭
 * https://www.acmicpc.net/problem/12865
 * * 준서가 여행에 필요하다고 생각하는 N개의 물건이 있다.
 * * 각 물건은 무게 W와 가치 V를 가지는데, 해당 물건을 배낭에 넣어서 가면 준서가 V만큼 즐길 수 있다.
 * * 아직 행군을 해본 적이 없는 준서는 최대 K만큼의 무게만을 넣을 수 있는 배낭만 들고 다닐 수 있다.
 * * 준서가 최대한 즐거운 여행을 하기 위해 배낭에 넣을 수 있는 물건들의 가치의 최댓값을 알려주자.
 *
 * ## 입력
 * * 첫 줄에 물품의 수 N(1 ≤ N ≤ 100)과 준서가 버틸 수 있는 무게 K(1 ≤ K ≤ 100,000)가 주어진다.
 * * 두 번째 줄부터 N개의 줄에 거쳐 각 물건의 무게 W(1 ≤ W ≤ 100,000)와 해당 물건의 가치 V(0 ≤ V ≤ 1,000)가 주어진다.
 *
 * ## 출력
 * * 한 줄에 배낭에 넣을 수 있는 물건들의 가치합의 최댓값을 출력한다.
 *
 * @example input: ['4 7', '6 13', '4 8', '3 6', '5 12'], output: 14
 * @param {string[]} input
 * @return {number}
 */
function solution(input) {
  const [stuffsNumber, maxWeight] = input[0].split(' ').map(Number);
  const stuffs = input.slice(1).map((str) => str.split(' ').map(Number));

  const isOneDimension = true;
  if (isOneDimension) {
    // * 1차원 배열 풀이
    const dp = Array(maxWeight + 1).fill(0);
    for (let i = 0; i < stuffsNumber; i++) {
      const [weight, value] = stuffs[i];
      // * 무게가 큰 것부터 넣어야 중복을 피할 수 있다.
      // 앞에서 부터 계산하면 방금 변경된 값이 다음 계산에 영향을 미친다.
      for (let j = maxWeight; j >= weight; j--) {
        dp[j] = Math.max(dp[j], dp[j - weight] + value);
      }
    }

    return dp[maxWeight];
  } else {
    // * 2차원 배열 풀이
    const dp = Array.from({length: stuffsNumber + 1}, () => Array(maxWeight + 1).fill(0));
    for (let i = 1; i <= stuffsNumber; i++) {
      const [weight, value] = stuffs[i - 1];
      for (let j = 1; j <= maxWeight; j++) {
        if (j < weight) {
          dp[i][j] = dp[i - 1][j];
        } else {
          dp[i][j] = Math.max(dp[i - 1][j], dp[i - 1][j - weight] + value);
        }
      }
    }
    return dp[stuffsNumber][maxWeight];
  }
}

// * BOJ Input
require('fs').readFile('/dev/stdin', (err, data) => {
  const inputArray = data.toString().trim().split('\n');
  const result = solution(inputArray);
  console.log(Array.isArray(result) ? result.join('\n') : result);
});

// * TestCases
const testCases = [{input: ['4 7', '6 13', '4 8', '3 6', '5 12'], output: 14}];
testCases.forEach(({input, output}, index) => {
  test(`TestCase ${index}`, () => {
    expect(solution(input)).toEqual(output);
  });
});
