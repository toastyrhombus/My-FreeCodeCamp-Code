/* 
    JavaScript Algorithms and Data Structures Projects: Palindrome CheckerPassed

    Return true if the given string is a palindrome. Otherwise, return false.

    A palindrome is a word or sentence that's spelled the same way both forward and backward, ignoring punctuation, case, and spacing.

    Note
    You'll need to remove all non-alphanumeric characters (punctuation, spaces and symbols) and turn everything into the same case (lower or upper case) in order to check for palindromes.

    We'll pass strings with varying formats, such as "racecar", "RaceCar", and "race CAR" among others.

    We'll also pass strings with special symbols, such as "2A3*3a2", "2A3 3a2", and "2_A3*3#A2".

    Code by Mathew Haynes
    toastyrhombus@outlook.com.au
    https://www.freecodecamp.org/fcc6d127099-e96b-41d1-978f-359316c20bf3
*/

function palindrome(str) {
    let re = /[a-zA-Z0-9]/gi;
    let arrTestStr = str.toLowerCase().match(re);
    while (arrTestStr.length > 1) {
        let first = arrTestStr.shift();
        let last = arrTestStr.pop();
        if (first == last) {
            continue
        }
        else {
            return false
        }
    }
    return true;
  }
  
  
  
  console.log(palindrome("eyeye"));