function addTogether(...args) {
    if (args.length >= 2) {
        return process(...args);
    } else {
        if (args.every((elem) => Number.isInteger(elem))) {
            return function pass(...args2) {
                return addTogether.apply(this, args.concat(args2));    
            } 
        } else {
            return undefined;
        }
        
            
            
        }
    }
    
    
    function process(...args) {
        if (args.every((elem) => Number.isInteger(elem))) {
          let result = 0;
          for (let i = 0; i < args.length; i++) {
              result += args[i];
          }
          return result;
        }
        else
        {
          return undefined;
        }
        
    }

console.log(addTogether("http://bit.ly/IqT6zt"));
