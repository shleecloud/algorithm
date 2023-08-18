const {test, expect} = require('@jest/globals');

const solution = (input) => {
    // debugger;
    const apexCount = input.shift();
    const expectSequence = input.pop().split(' ');
    const edgeList = input.reduce((acc = {}, cur) => {
        cur.split(' ').map((el, idx, origin) => {
            const from = el;
            const to = idx !== 0 ? origin[0] : origin[1];
            if (!acc[from]) {
                acc[from] = [to];
            } else {
                acc[from].push(to);
            }
        });

        return acc;
    }, {});

    let idx = 0;
    let queue = [expectSequence[idx]];
    const dp = Array(apexCount).fill(false);
    dp[idx] = true;
    const record = [[expectSequence[idx]]];

    while (queue.length) {
        const apex = queue.shift();
        const edge = edgeList[apex];

        dp[apex] = true;
        idx += 1;
        record[idx] = [];

        edge.forEach((el) => {
            if (!dp[el]) {
                queue.push(el);
                record[idx].push(el);
            }
        });
    }

    // const lastIdx =
    //     record.findIndex((el) => el.length === 0) !== -1 ? record.findIndex((el) => el.length === 0) : record.length;
    const sortedRecord = record.map((el) => {
        if (el.length > 0) {
            return el.sort((a, b) => a - b);
        }
    });

    for (let i = 0; i < sortedRecord.length; i++) {
        if (!sortedRecord[i]) return '1';
        const recordList = sortedRecord[i].slice().join('');
        let expectList = expectSequence.splice(0, recordList.length);
        expectList = expectList.sort((a, b) => a - b).join('');
        if (expectList !== recordList) return '0';
    }

    return 1;
};

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
    // expect(solution(['4', '1 2', '1 3', '2 4', '1 2 3 4'])).toEqual(1);
    // expect(solution(['4', '1 2', '1 3', '2 4', '1 2 4 3'])).toEqual(0);
    expect(solution(['7', '1 2', '1 3', '2 4', '2 5', '3 6', '3 7', '1 2 3 6 7 4 5'])).toEqual('0');
});
