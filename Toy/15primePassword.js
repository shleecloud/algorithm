const primePassword = (curPwd, newPwd) => {
  // TODO: 여기에 코드를 작성합니다.
  // * 소수인지 확인
  function isPrimeNumber(n) {
    // 배열이라면 숫자로 전환
    let num = Number(n.join(''));
    if (num < 2) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) return false;
    }
    return true;
  }
  function numberToArr(a) {
    let curArr = String(a).split('');
    return curArr.map(el => Number(el));
  }

  let visited = new Array(10000).fill(false);
  let queue = [[numberToArr(curPwd), 0]];

  while (queue.length !== 0) {
    let a = queue.pop();
    let numArr = a[0];

    // TODO newPwd와 동일한 경우 count를 반환
    if (Number(numArr.join('')) === newPwd) return a[1];
    for (let i = 0; i < 4; i += 1) {
      for (let j = 0; j < 10; j += 1) {
        let count = a[1];
        // TODO 새로운 숫자가 원본과 동일한지 확인
        if (numArr[i] === j) continue;
        let copyArr = numArr.slice();
        // TODO 숫자 하나만 바꾸고 소수인지 확인
        // TODO 소수 맞으면 Queue 추가
        copyArr[i] = j;
        if (copyArr[0] === 0 || visited[Number(copyArr.join(''))] === true) continue;
        visited[Number(copyArr.join(''))] = true;
        if (!isPrimeNumber(copyArr)) continue;
        queue.unshift([copyArr, (count += 1)]);
      }
    }
  }
  return -1;
};

output = primePassword(1009, 1171);
console.log(output);
