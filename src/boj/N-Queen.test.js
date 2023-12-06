// @ts-check
/**
 * # N-Queen
 * https://www.acmicpc.net/problem/9663
 * * N-Queen 문제는 크기가 N × N인 체스판 위에 퀸 N개를 서로 공격할 수 없게 놓는 문제이다.
 * * N이 주어졌을 때, 퀸을 놓는 방법의 수를 구하는 프로그램을 작성하시오.
 *
 * ## 입력
 * * 첫째 줄에 N이 주어진다. (1 ≤ N < 15)
 *
 * ## 출력
 * * 첫째 줄에 퀸 N개를 서로 공격할 수 없게 놓는 경우의 수를 출력한다.
 *
 * @example input: 8, output: 92
 * @param {string[]} input
 * @return {number}
 */
function solution(input) {
    let result = 0;
    const maxColumn = Number(input[0]);

    const queensStack = [];
    const dfs = (row) => {
        if (row === maxColumn) {
            result++;
            return;
        }

        // * 현재 row에서 column을 하나씩 증가시키면서 가능한지 확인
        for (let column = 0; column < maxColumn; column++) {
            const isAvailable = queensStack.every(
                ([rowIndex, columnIndex]) =>
                    columnIndex !== column && // 세로 조건
                    Math.abs(rowIndex - row) !== Math.abs(columnIndex - column), // 대각선 조건
            );

            if (isAvailable) {
                queensStack.push([row, column]);
                dfs(row + 1);
                queensStack.pop();
            }
        }
    };

    dfs(0);

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
    {input: ['8'], output: 92},
    {input: ['4'], output: 2},
];

testCases.forEach(({input, output}, index) => {
    test(`TestCase ${index}`, () => {
        expect(solution(input)).toEqual(output);
    });
});
