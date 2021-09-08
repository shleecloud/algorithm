const powerSet = function (str) {
  // TODO: 여기에 코드를 작성합니다.
  function getSortedArr (arr) {
    let newArr = [...new Set(arr)];
    newArr = newArr.sort();
    return newArr;
  }
  let strArr = getSortedArr(str.split(''))
  let resultArr = []
  for (let i=0; i < strArr.length; i+= 1) {
    resultArr.push([])
  }
  console.log(resultArr)s
  return strArr
};

powerSet('cba')

