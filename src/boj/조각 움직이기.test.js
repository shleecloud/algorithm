/**
 * # 조각 움직이기
 * https://www.acmicpc.net/problem/1035 </br>
 * - 최대 5개의 조각이 있는 5×5 크기의 보드가 있다. 김지민은 조각을 적절히 움직여서 모든 조각이 연결 요소를 이루게 하려고 한다.
 * - 즉 상하좌우로 인접한 조각을 모두 연결했을 때, 모든 쌍의 조각이 적어도 하나의 경로로 연결되어 있어야 한다.
 * - 한 번의 이동으로 하나의 조각을 상하좌우로 인접한 칸으로 옮길 수 있다.
 * - 보드의 상태가 주어질 때, 최소 몇 번 이동해야 모든 조각이 연결 요소를 이루게 되는지 구하는 프로그램을 작성하시오.
 *
 * ## 입력
 * - 첫째 줄부터 다섯째 줄까지 보드의 상태가 주어진다. 빈 곳은 '.'이고, 조각은 '*'이다. 조각은 1개 이상 5개 이하이다.
 *
 * *...*
 * .....
 * .....
 * .....
 * *...*
 *
 * ## 출력
 * - 첫째 줄에 문제의 정답을 출력한다.
 *
 * @param {string[]} input
 * @returns number
 */

function solution(input) {
    let result = Infinity;

    const stars = scanStars(input);
    // * visited 객체는 방문한 좌표에 도달하기 위한 최소 이동 횟수를 저장한다.
    const visited = {};
    const queue = [{stars, count: 0}];

    while (queue.length > 0) {
        const target = queue.shift();
        bfs(target);
    }

    return result;

    // * 유틸리티 함수
    function bfs({stars, count}) {
        if (result <= count) return;
        if (checkConnected(stars)) {
            result = Math.min(result, count);
            return;
        }

        const dy = [-1, 1, 0, 0];
        const dx = [0, 0, -1, 1];
        for (let index = 0; index < stars.length; index += 1) {
            for (let j = 0; j < dx.length; j += 1) {
                const nextY = stars[index][0] + dy[j];
                const nextX = stars[index][1] + dx[j];

                const newStars = copyNested(stars);
                newStars[index] = [nextY, nextX];
                if (!checkValid(newStars, index)) continue;
                if (checkVisited(newStars, visited, count)) continue;

                // 이동할 수 있는 경우 이동한다.
                setVisited(newStars, visited, count);
                queue.push({stars: newStars, count: count + 1});
            }
        }
    }

    function checkValid(stars, index) {
        const [y, x] = stars[index];
        if (y < 0 || y >= 5 || x < 0 || x >= 5) return false;

        const restStars = [...stars.slice(0, index), ...stars.slice(index + 1)];
        const isDuplicated = restStars.reduce((acc, star) => {
            if (acc) return true;
            return star[0] === y && star[1] === x;
        }, false);

        return !isDuplicated;
    }

    function setVisited(stars, visited, count) {
        const key = JSON.stringify(stars);
        visited[key] = count;
    }

    function checkVisited(stars, visited, count) {
        const key = JSON.stringify(stars);
        return visited.hasOwnProperty(key) && visited[key] <= count;
    }

    function scanStars(input) {
        const stars = [];

        for (let y = 0; y < 5; y += 1) {
            for (let x = 0; x < 5; x += 1) {
                if (input[y][x] === '*') {
                    stars.push([y, x]);
                }
            }
        }

        return stars;
    }
    function checkConnected(stars) {
        const connectedStarsIndex = [0];
        let isChanged = true;

        while (isChanged) {
            if (connectedStarsIndex.length === stars.length) break;

            isChanged = false;
            for (let i = 1; i < stars.length; i += 1) {
                if (connectedStarsIndex.includes(i)) continue;
                const star = stars[i];
                connectedStarsIndex.forEach((connectedStarIndex) => {
                    const targetStar = stars[connectedStarIndex];

                    if (Math.abs(star[0] - targetStar[0]) + Math.abs(star[1] - targetStar[1]) === 1) {
                        connectedStarsIndex.push(i);
                        isChanged = true;
                    }
                });
            }
        }

        return connectedStarsIndex.length === stars.length;
    }
    function copyNested(arr) {
        return JSON.parse(JSON.stringify(arr));
    }
}

require('fs').readFile('/dev/stdin', (err, data) => {
    const inputArray = data.toString().trim().split('\n');
    const result = solution(inputArray);
    console.log(Array.isArray(result) ? result.join('\n') : result);
});

test('조각 움직이기', () => {
    expect(solution(['*...*', '.....', '.....', '.....', '*...*'])).toEqual(12);
    expect(solution(['.....', '..**.', '.....', '...*.', '.....'])).toEqual(1);
    expect(solution(['.....', '.....', '.**..', '.*...', '**...'])).toEqual(0);

    expect(solution(['*....', '.....', '.....', '.....', '.....'])).toEqual(0);
    expect(solution(['.....', '.....', '.**..', '.....', '**...'])).toEqual(2);
    expect(solution(['..*..', '.....', '*...*', '.....', '..*..'])).toEqual(5);
    expect(solution(['*..**', '.....', '*.*..', '.....', '.....'])).toEqual(5);
});
