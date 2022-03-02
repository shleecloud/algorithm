function solution(numbers) {
  var answer = '';

  a = [1, 5, 2, 4];

  a.sort((a, b) => {
    console.log(Number('' + a + b) < Number('' + b + a));
    return Number('' + a + b) < Number('' + b + a);
  });
  return answer;
}
