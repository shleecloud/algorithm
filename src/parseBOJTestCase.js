// * BOJ Input
const inputString = `예제 입력 1 
1 2
예제 출력 1 
3`;

// * Execute
const parsedExamples = parseBOJTestCase(inputString);
console.log(parsedExamples);

// * Logic
function parseBOJTestCase(inputString) {
    const examples = inputString.split(/예제 입력 \d+ \n/);
    examples.shift(); // 첫 번째 항목은 빈 문자열이므로 제거

    const result = examples.map((example, index) => {
        const inputOutput = example.split(/예제 출력 \d+ \n/);
        const inputLines = inputOutput[0].trim().split('\n');
        const outputLines = inputOutput[1].trim().split('\n');

        return {
            input: inputLines,
            // outputLines가 1개면 문자열, 2개 이상이면 배열
            output: outputLines.length === 1 ? outputLines[0] : outputLines,
        };
    });

    return result;
}
