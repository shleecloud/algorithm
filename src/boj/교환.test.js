/** https://www.acmicpc.net/problem/1039
 * BFS, 또는 DFS 사용해야 함
 * 첫 시도에선 변환한 시점에서 최적의 숫자로 이동을 했는데 이럴 경우 중간 값에 의하여 최고 효율이 나올 수 없음
 * ex) 6399 일 경우를 해결 할 수 없다 */
const failedSolution = (input) => {
    debugger;
    let [numList, count] = input.split(' ');

    // ? 인덱스 조합을 구한다
    const combinations = [];
    for (let i = 0; i < numList.length; i++) {
        for (let j = i + 1; j < numList.length; j++) {
            combinations.push(`${i} ${j}`);
        }
    }

    let largestNum = numList;
    // ? 지정한 횟수만큼 값을 바꿔가면서 비교한다.
    for (let i = 0; i < count; i++) {
        let candidates = [];

        combinations.forEach((el) => {
            const [a, b] = el.split(' ');
            const numArr = largestNum.split('');

            [numArr[a], numArr[b]] = [numArr[b], numArr[a]];

            if (numArr[0] !== '0') {
                candidates.push(numArr.join(''));
            }
        });

        if (candidates.length < 2) {
            return '-1';
        }
        largestNum = Math.max(...candidates).toString();
    }

    return largestNum;
};

const solution = (input) => {
    const inputArr = input[0].split(' ');
    const numArr = inputArr[0].split('');
    const maxCount = +inputArr[1];

    let max = -1;
    const dp = new Array(maxCount + 1) //
        .fill(null)
        .map((_) => new Array(1000001).fill(false));

    const swap = (i, j) => {
        [numArr[i], numArr[j]] = [numArr[j], numArr[i]];
    };

    const dfs = (count = 0) => {
        const sum = Number(numArr.join(''));
        if (dp[count][sum] === true) return;
        if (count === maxCount) {
            if (sum > max) {
                max = sum;
            }
            return;
        }

        for (let i = 0; i < numArr.length; i++) {
            for (let j = i + 1; j < numArr.length; j++) {
                swap(i, j);
                if (numArr[0] !== '0') {
                    dfs(count + 1);
                }
                swap(i, j);
            }
        }
        dp[count][sum] = true;
    };

    dfs();
    return String(max);
};

const input = [];
require('readline')
    .createInterface({input: process.stdin})
    .on('line', (line) => input.push(line.trim()))
    .on('close', (_) => {
        const result = solution(input);
        console.log(Array.isArray(result) ? result.join('\n') : result);
        process.exit(0);
    });

test('교환', () => {
    expect(solution('16375 1')).toEqual('76315');
    expect(solution('132 3')).toEqual('312');
    expect(solution('432 1')).toEqual('423');
    expect(solution('90 4')).toEqual('-1');
    expect(solution('50 2')).toEqual('-1');
    expect(solution('436659 2')).toEqual('966354');
    expect(solution('6399 2')).toEqual('9963');
    expect(solution('9 1')).toEqual('-1');
});
