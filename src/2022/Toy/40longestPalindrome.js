let longestPalindrome = function (str) {
    // 여기에 코드를 작성합니다.
    const getPalindrome = function (str) {
        return str === str.split('').reverse().join('');
    };
    let result = 0;
    // 모든 문자열 검색
    for (let i = 0; i < str.length; i++) {
        for (let j = i + result; j < str.length; j++) {
            const part = str.slice(i, j + 1);
            if (getPalindrome(part)) {
                result = result < part.length ? part.length : result;
            }
        }
    }
    return result;
};

console.log(longestPalindrome('ababa'));
