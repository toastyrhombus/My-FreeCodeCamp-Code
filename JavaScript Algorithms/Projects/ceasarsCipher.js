/* 
    JavaScript Algorithms and Data Structures Projects: Caesars Cipher
    One of the simplest and most widely known ciphers is a Caesar cipher, also known as a shift cipher. In a shift cipher the meanings of the letters are shifted by some set amount.

    A common modern use is the ROT13 cipher, where the values of the letters are shifted by 13 places. Thus 'A' ↔ 'N', 'B' ↔ 'O' and so on.

    Write a function which takes a ROT13 encoded string as input and returns a decoded string.

    All letters will be uppercase. Do not transform any non-alphabetic character (i.e. spaces, punctuation), but do pass them on.

    Code by Mathew Haynes
    toastyrhombus@outlook.com.au
    https://www.freecodecamp.org/fcc6d127099-e96b-41d1-978f-359316c20bf3
*/

function rot13(str) {
    if (typeof str != "string") {
        return undefined;
    }
    let strWorking = String(str).toUpperCase();
    // We define the ASCII decimal value to reduce the letter we are evaluating to an index out of 26
    const idxASCII_A = 65;
    let strBuilder = '';
    for (let letter of strWorking) {
        //We subtract the ASCII A decimal value from the char code point so we can easily do
        // arithmetic on the letter to shift it
        let charInt = letter.charCodeAt(0) - idxASCII_A;
        // We check to see if the decimal value of our letter is in the alphabet range 0-26 - if not, let it pass right through
        if (charInt >= 0 && charInt <= 26) {
            //We shift it by negative 13, add and then modulus 26 to determine when we have overflowed
            // our number range and compensate for that
            charInt = ((charInt - 13) + 26) % 26;
            //We then rebuild the letter and add it to our builder variable by adding ASCII_A back to the letter
            strBuilder += String.fromCharCode(charInt + idxASCII_A);
        }
        else {
            strBuilder += letter;
        }
    }
    return strBuilder;
  }
  
  console.log(rot13("SERR PBQR PNZC"));