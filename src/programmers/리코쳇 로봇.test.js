// https://school.programmers.co.kr/learn/courses/30/lessons/169199
function solution(board) {
    // 유효성 검사
    const checkValid = (x, y, arr) =>
        0 <= x && //
        x < arr[0].length &&
        0 <= y &&
        y < arr.length &&
        arr[y][x] !== 'D';
    const boardList = board.map((row) => row.split(''));

    // 시작 좌표 찾기
    const startIndex = boardList.slice().reduce((acc, cur, yIdx, org) => {
        const xIdx = cur.findIndex((el) => el === 'R');
        if (xIdx !== -1) {
            org.splice(0);
            return [xIdx, yIdx, 0];
        }
        return acc;
    }, []);

    // 방문했던 곳인지 확인할 배열
    const dp = [...new Array(boardList.length)] //
        .map(() => new Array(boardList[0].length).fill(false));

    // bfs
    const queue = [startIndex];
    while (queue.length) {
        const [x, y, cnt] = queue.shift();

        // 상하좌우 이동 딱 한 번의 경우를 계산
        for (let i = 0; i < 4; i++) {
            let nx = x;
            let ny = y;

            while (checkValid(nx, ny, boardList)) {
                const dx = [1, 0, -1, 0];
                const dy = [0, 1, 0, -1];

                const tmpX = nx + dx[i];
                const tmpY = ny + dy[i];
                if (checkValid(tmpX, tmpY, boardList)) [nx, ny] = [tmpX, tmpY];
                else break;
            }

            if (checkValid(nx, ny, boardList)) {
                if (boardList[ny][nx] === 'G') return cnt + 1;
                if (!dp[ny][nx]) {
                    dp[ny][nx] = true;
                    queue.push([nx, ny, cnt + 1]);
                }
            }
        }
    }

    return -1;
}

test('리코쳇 로봇', () => {
    expect(
        solution([
            '...D..R', //
            '.D.G...',
            '....D.D',
            'D....D.',
            '..D....',
        ]),
    ).toBe(7);
});
// function solution(board) {
//     // dfs로 풀면 어떨까?
//     // 결과 목록을 배열로 저장
//     // 현재 좌표를 기준으로 상하좌우 이동 여부 판단
//     // 좌표를 기준으로 중복 방문 여부 판단
//
//     const results = [];
//     const queue = [];
//     const visitedIndices = [];
//
//     // 첫 시작 좌표 찾기
//     const startIndex = board //
//         .slice()
//         .reduce((acc, cur, y, origin) => {
//             const index = cur.indexOf('R');
//             if (index !== -1) {
//                 origin.splice(0);
//                 return {x: index, y};
//             }
//             return acc;
//         }, {});
//
//     const getNextIndices = (x, y) => {
//         debugger;
//         const nextIndices = [];
//         // 스캐닝
//         const xScan = board[y];
//         const yScan = board.map((row) => row[x]).join('');
//
//         // 상하좌우
//         const getClosestDIndex = (pinIdx, scan) => {
//             let idx = 1;
//             const result = {up: scan.length - 1, down: 0};
//             // 끝까지 스캔하는 로직을 개선해야 한다
//             while (
//                 idx < scan.length && //
//                 (result.up === scan.length - 1 || result.down === 0)
//             ) {
//                 if (
//                     result.up === scan.length - 1 && //
//                     pinIdx + idx < scan.length &&
//                     scan[pinIdx + idx] === 'D'
//                 ) {
//                     result.up = pinIdx + idx;
//                 }
//                 if (
//                     result.down === 0 && //
//                     pinIdx - idx >= 0 &&
//                     scan[pinIdx - idx] === 'D'
//                 ) {
//                     result.down = pinIdx - idx;
//                 }
//                 idx++;
//             }
//             return result;
//         };
//
//         const xClosestDIndex = getClosestDIndex(x, xScan);
//         nextIndices.push({y, x: xClosestDIndex.up});
//         nextIndices.push({y, x: xClosestDIndex.down});
//
//         const yClosestDIndex = getClosestDIndex(y, yScan);
//         nextIndices.push({y: yClosestDIndex.up, x});
//         nextIndices.push({y: yClosestDIndex.down, x});
//         return nextIndices;
//     };
//     return getNextIndices(startIndex.x, startIndex.y);
// }
//
// solution(['...D..R', '.D.G...', '....D.D', 'D....D.', '..D....']);
