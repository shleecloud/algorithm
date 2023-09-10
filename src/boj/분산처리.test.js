const {expect, test} = require('@jest/globals');
// https://www.acmicpc.net/problem/1009
// 일반적인 방식으론 Infinity 나와서 실패하며 1의자리만 구해서 곱해야함.
// 1000만번 연산은 계산가능하다.
const solution = (input) => {
    const result = [];

    for (let i = 1; i < input.length; i++) {
        const [a, b] = input[i].split(' ');

        let pow = 1;
        for (let j = 0; j < b; j++) {
            pow = (pow * a) % 10;
        }
        // 10의자리 컴퓨터일 경우 10으로 예외처리
        pow = pow === 0 ? 10 : pow;
        result.push(pow);
    }

    return result;
};

const input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');
const result = solution(input);
if (Array.isArray(result)) {
    console.log(result.join('\n'));
} else {
    console.log(result);
}

test('분산처리', () => {
    expect(solution(['5', '1 6', '3 7', '6 2', '7 100', '9 635', '10 1'])).toEqual(['1', '7', '6', '1', '9', '10']);
});
