function dropElements(arr, func) {
    let tempArr = Array.from(arr);
    while(func(tempArr[0]) == false && tempArr.length > 0) {
        tempArr.shift();
    }
    return tempArr;
  }
  
  console.log(dropElements([1, 2, 3, 4], function(n) {return n >= 3; }));
  //dropElements([1, 2, 3, 4], function(n) {return n >= 3;}) should return [3, 4]