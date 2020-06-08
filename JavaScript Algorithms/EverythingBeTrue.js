function truthCheck(collection, pre) {
    if (Array.isArray(collection) == false) {
        return undefined;
    }
    let boolResult = collection.every((elem) => {
        let result = false;
        if (elem.hasOwnProperty(pre)) {
            Boolean(elem[pre]) == true ? result = true: result = false;
        }
        return result;
    })

    return boolResult;
  }
  
  console.log(truthCheck([{"user": "Tinky-Winky", "sex": "male"}, {"user": "Dipsy"}, {"user": "Laa-Laa", "sex": "female"}, {"user": "Po", "sex": "female"}], "sex"));
  