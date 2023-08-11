// https://www.acmicpc.net/problem/1012
const {test, expect} = require('@jest/globals');
const solution = (input) => {
    debugger;
    // * 테스트 케이스 쪼개기
    const testCases = input.slice(1).reduce((acc = [], cur, i) => {
        const curArr = cur.split(' ').map((v) => +v);
        if (curArr.length === 3) {
            acc.push([curArr]);
        } else if (curArr.length === 2) {
            acc[acc.length - 1].push(curArr);
        }
        return acc;
    }, []);

    const answer = [];

    testCases.forEach((testCase) => {
        const [width, height, cabbageCount] = testCase[0];
        const cabbages = testCase.slice(1);
        const map = Array.from(Array(height), () => Array(width).fill(0));

        cabbages.forEach(([x, y]) => {
            map[y][x] = 1;
        });

        const dfs = (x, y) => {
            if (x < 0 || y < 0 || x >= width || y >= height) {
                return false;
            }

            if (map[y][x] === 1) {
                map[y][x] = 0;
                dfs(x - 1, y);
                dfs(x + 1, y);
                dfs(x, y - 1);
                dfs(x, y + 1);
                return true;
            }

            return false;
        };

        const bfs = (x, y) => {
            const queue = [[x, y]];
            while (queue.length) {
                const [x, y] = queue.shift();
                if (x < 0 || y < 0 || x >= width || y >= height) {
                    continue;
                }
                if (map[y][x] === 1) {
                    map[y][x] = 0;
                    queue.push([x - 1, y]);
                    queue.push([x + 1, y]);
                    queue.push([x, y - 1]);
                    queue.push([x, y + 1]);
                }
            }
        };

        let count = 0;
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++)
                if (map[y][x] === 1) {
                    // dfs(x, y);
                    bfs(x, y);
                    count++;
                }
        }

        answer.push(count);
    });

    return answer;
};

// * boj
const input = [];
require('readline')
    .createInterface({input: process.stdin})
    .on('line', (line) => input.push(line))
    .on('close', (_) => {
        const result = solution(input);
        if (typeof result === 'string') {
            console.log(result);
        } else {
            result.forEach((v) => console.log(v));
        }
        process.exit(0);
    });

test('유기농 배추', () => {
    const input1 = [
        '2',
        '10 8 17',
        '0 0',
        '1 0',
        '1 1',
        '4 2',
        '4 3',
        '4 5',
        '2 4',
        '3 4',
        '7 4',
        '8 4',
        '9 4',
        '7 5',
        '8 5',
        '9 5',
        '7 6',
        '8 6',
        '9 6',
        '10 10 1',
        '5 5',
    ];
    const output1 = [5, 1];
    expect(solution(input1)).toEqual(output1);

    const input2 = ['1', '5 3 6', '0 2', '1 2', '2 2', '3 2', '4 2', '4 0'];
    const output2 = [2];
    expect(solution(input2)).toEqual(output2);
});
