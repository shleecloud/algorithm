const inequalityNumber = function (signs) {
  // TODO: 여기에 코드를 작성합니다.
  let maximum = new Array(signs.length + 1).fill(null);
  let minimum = new Array(signs.length + 1).fill(null);
  let maxNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  let minNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  // 좌측이 클 때 처리
  for (let i = 0; i < signs.length; i += 1) {
    if (signs[i] === '>') maximum[i] = maxNumbers.pop();
    if (signs[i] === '<') minimum[i] = minNumbers.shift();
  }
  for (let i = 0; i < signs.length; i += 1) {
    //if (signs[i] === '>') minimum[i] = minNumbers.shift()
  }

  for (let i = 0; i < signs.length + 1; i += 1) {
    if (maximum[i] === null) maximum[i] = maxNumbers.pop();
    //if (minimum[i] === null) minimum[i] = minNumbers.shift()
  }

  //return [Number(maximum.join('')), Number(minimum.join(''))]
  return [maximum, minimum];
};

let output = inequalityNumber('><>');
//let output = inequalityNumber('<>');
console.log(output); // --> 88 (89 - 01)
