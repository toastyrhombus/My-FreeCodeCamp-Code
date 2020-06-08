

function createArrLowHigh(low, high) {
    let _low = Number(low);
    let _high = Number(high);
    let resultArr = [];
    for(let i = _low; i <= _high; i++){
      resultArr.push(i);
    }
    return resultArr;
  }
  
  function primeFactors(num) {
    let _num = Number(num);
    let _map = new Map();
    let _testFactor = 2;
    while(_num > 1) {
      if(_num % _testFactor == 0) {
        if (_map.has(_testFactor))
        {
          _map.set(_testFactor, _map.get(_testFactor) + 1);
        }
        else
        {
          _map.set(_testFactor, 1);
        }
        _num = _num / _testFactor;
      }
      else
      {
        _testFactor > 2 ? _testFactor += 2 : _testFactor++
      }
    }
    return _map;
  }
  
  function MHsmallestCommons(arr) {
    if (Array.isArray(arr) == false || Array.length > 2) {
      return undefined;
    }

    let sortedArr = arr.sort((a,b) => a - b);
    let numberCollection = createArrLowHigh(sortedArr[0], sortedArr[1]);

    let resultMap = new Map();

    for (let i = 0; i < numberCollection.length; i++) {
      const element = numberCollection[i];
      const primeResult = primeFactors(element)
      for (const [key, power] of primeResult) {
          if (resultMap.has(key)) {
            if (resultMap.get(key) < power) {
              resultMap.set(key, power);
            }
          }
          else {
            resultMap.set(key, power);
          }
      }
    }
    
    let result = 1;
    for (const [num, pow] of resultMap) {
      result *= Math.pow(num, pow);
    }
    return result;
  }
  
  function mhGCD(A, B) {
    let a = Math.max(A,B);
    let b = Math.min(A, B);
    if (b == 1) {
      return 1;
    }
    let temp = 0;
    while (b != 0) {
      temp = b;
      b = a % b;
      a = temp;
    }
    return a;
  }

  function MHImprovedLCM(arr) {
    if (Array.isArray(arr) == false || Array.length > 2) {
      return undefined;
    }

    const sortedArr = arr.sort((a,b) => a - b);
    const numberCollection = createArrLowHigh(sortedArr[0], sortedArr[1]);

    lcmCollection = Array.from(numberCollection);
    let result = 0;
    for (let i = 1; i < lcmCollection.length ; i++) {
      let a = lcmCollection[i - 1];
      let b = lcmCollection[i];
      result = (a / mhGCD(a, b)) * b;
      lcmCollection[i] = result;
    }
    
    return result;
  }


  console.log(MHImprovedLCM([23,18]));



  