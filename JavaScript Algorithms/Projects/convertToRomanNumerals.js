/* 
    Convert the given number into a roman numeral.

    All roman numerals answers should be provided in upper-case.

    
    Code by Mathew Haynes
    toastyrhombus@outlook.com.au
    https://www.freecodecamp.org/fcc6d127099-e96b-41d1-978f-359316c20bf3
*/

function convertToRoman(num) {
    tempNum = Number.parseInt(num);
    let dictRoman = {1: 'I', 5: 'V', 10: 'X', 50: 'L', 100: 'C', 500: 'D', 1000: 'M'};
    let strBuild = '';
    let index = 6;
    while (tempNum > 0) {
        let key = Object.keys(dictRoman)[index];
        let count = Math.floor(tempNum / key);
        tempNum -= count * key;
        if (key == "1000") {
            strBuild += dictRoman[key].repeat(count);    
        }
        else if (count > 8) {
            strBuild += dictRoman[key] + dictRoman[key * 10];
        }
        else if (count > 5) {
            strBuild += dictRoman[key * 5] + dictRoman[key].repeat(count - 5);
        }
        else if (count == 5) {
            strBuild += dictRoman[key * 5];
        }
        else if (count > 3) {
            strBuild += dictRoman[key] + dictRoman[key * 5];
        }
        else {
            strBuild += dictRoman[key].repeat(count);  
        }
        index -= 2;
    }
    return strBuild;
   }
   
console.log(convertToRoman(100));
   