/** https://www.acmicpc.net/problem/1260
DFS와 BFS
 간단한 문제인데 런타임에러가 났다.
 엣지케이스를 고려해서 정점이 하나일 경우, 간선이 하나일 경우를 조치하자 해결됐다.
 문제에서 제공하는 최소, 최대값을 테스트 케이스로 포함해야 런타임 에러를 막을 수 있다.
*/

const {test, expect} = require('@jest/globals');
function solution(input) {
    const [N, M, startApex] = input[0].split(' ');
    const apexes = {};

    if (N === 1) {
        return input[1].split(' ')[0];
    }
    input.slice(1).forEach((el) => {
        const [a, b] = el.split(' ');
        if (!apexes.hasOwnProperty(a)) {
            apexes[a] = [];
        }
        apexes[a].push(b);

        if (!apexes.hasOwnProperty(b)) {
            apexes[b] = [];
        }
        apexes[b].push(a);
    });

    Object.keys(apexes).forEach((el) => {
        apexes[el] = apexes[el].sort((a, b) => a - b);
    });

    const graphSearch = (apexes, startApex, isDfs) => {
        const dp = [];
        let stack = [startApex];

        while (stack.length > 0) {
            const target = stack.shift();
            if (dp.includes(target)) continue;
            dp.push(target);

            if (!apexes.hasOwnProperty(target)) continue;
            if (isDfs) {
                stack = [...apexes[target], ...stack];
            } else {
                stack = [...stack, ...apexes[target]];
            }
        }

        return dp.join(' ');
    };

    const dfsResult = graphSearch(apexes, startApex, true);
    const bfsResult = graphSearch(apexes, startApex, false);

    return [dfsResult, bfsResult];
}

const input = [];
require('readline')
    .createInterface({input: process.stdin})
    .on('line', (line) => input.push(line.trim()))
    .on('close', (_) => {
        const result = solution(input);
        console.log(Array.isArray(result) ? result.join('\n') : result);
        process.exit(0);
    });

test('DFS와 BFS', () => {
    expect(solution(['4 5 1', '1 2', '1 3', '1 4', '2 4', '3 4'])).toEqual(['1 2 4 3', '1 2 3 4']);
    expect(solution(['5 5 3', '5 4', '5 2', '1 2', '3 4', '3 1'])).toEqual(['3 1 2 5 4', '3 1 4 2 5']);
    expect(solution(['1000 1 1000', '999 1000'])).toEqual(['1000 999', '1000 999']);
    expect(solution(['1 1 1', '1 1'])).toEqual(['1', '1']); // edge case
    expect(solution(['3 1 1', '2 3'])).toEqual(['1', '1']); // edge case
});
