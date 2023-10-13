function solution(input) {
    const [a, b] = (input + '').split(' ').map((s) => +s);
    return a + b;
}

require('fs').readFile('/dev/stdin', (err, data) => {
    const inputArray = data.toString().trim().split('\n');
    const result = solution(inputArray);
    console.log(Array.isArray(result) ? result.join('\n') : result);
});

test('Template', () => {
    const input = `1 2`;
    expect(solution(input)).toEqual(3);
});
