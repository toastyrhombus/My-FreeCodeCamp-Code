function steamrollArray(arr) {
    let resultArr = [];

    let tempArr = Array.from(arr);

    function recursion (recurseArray) {
        recurseArray.forEach((elem) => {
            if (Array.isArray(elem)) {
                recursion(elem);
            }
            else {
                resultArr.push(elem);
            }
        })
    }
    recursion(tempArr);
    
    return resultArr;
  }
  
  console.log(steamrollArray([1, [], [3, [[4]]]]));