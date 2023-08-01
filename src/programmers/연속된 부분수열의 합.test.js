// https://school.programmers.co.kr/learn/courses/30/lessons/178870
function solution(sequence, k) {
    const results = [];
    let fromIdx = 0;
    let sum = 0;

    // 합이 일치하는 목록 만들기
    for (let toIdx = 0; toIdx < sequence.length; toIdx++) {
        sum += sequence[toIdx];

        while (k < sum) {
            sum -= sequence[fromIdx++];
        }

        if (sum === k) {
            results.push([fromIdx, toIdx]);
        }
    }

    // 길이가 짧은 수열 찾기
    return results.reduce((acc = [], cur) => {
        if (acc.length === 0) return [cur];

        if (acc[0][1] - acc[0][0] > cur[1] - cur[0]) {
            return [cur];
        } else {
            acc.push(cur);
            return acc;
        }
    }, [])[0];
}

test('연속된 부분수열의 합', () => {
    expect(solution([1, 2, 3, 4, 5], 7)).toEqual([2, 3]);
    expect(solution([1, 1, 1, 2, 3, 4, 5], 5)).toEqual([6, 6]);
    expect(solution([2, 2, 2, 2, 2], 6)).toEqual([0, 2]);
});
