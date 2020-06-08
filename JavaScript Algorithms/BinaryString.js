function binaryAgent(str) {
    if (typeof str != "string") {
        return undefined;
    }
    const arrStr = str.split(/\b\s/);
    let strResult = '';

    for (let index = 0; index < arrStr.length; index++) {
        const element = arrStr[index];
        strResult += String.fromCharCode(Number.parseInt(element, 2));
    }
    return strResult;
  }
  
  console.log(binaryAgent("01000001 01110010 01100101 01101110 00100111 01110100 00100000 01100010 01101111 01101110 01100110 01101001 01110010 01100101 01110011 00100000 01100110 01110101 01101110 00100001 00111111"));