const solution = (input) => {
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

// const input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');
// const result = solution(input);
// if (Array.isArray(result)) {
//     console.log(result.join('\n'));
// } else {
//     console.log(result);
// }

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
