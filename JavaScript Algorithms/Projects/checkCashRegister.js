/* 
    JavaScript Algorithms and Data Structures Projects: Cash Register
    Design a cash register drawer function checkCashRegister() that accepts purchase price as the first argument (price), payment as the second 
    argument (cash), and cash-in-drawer (cid) as the third argument.

    cid is a 2D array listing available currency.

    The checkCashRegister() function should always return an object with a status key and a change key.

    Return {status: "INSUFFICIENT_FUNDS", change: []} if cash-in-drawer is less than the change due, or if you cannot return the exact change.

    Return {status: "CLOSED", change: [...]} with cash-in-drawer as the value for the key change if it is equal to the change due.

    Otherwise, return {status: "OPEN", change: [...]}, with the change due in coins and bills, sorted in highest to lowest order, as the value of the change key.

    Currency Unit	Amount
    Penny	$0.01 (PENNY)
    Nickel	$0.05 (NICKEL)
    Dime	$0.1 (DIME)
    Quarter	$0.25 (QUARTER)
    Dollar	$1 (ONE)
    Five Dollars	$5 (FIVE)
    Ten Dollars	$10 (TEN)
    Twenty Dollars	$20 (TWENTY)
    One-hundred Dollars	$100 (ONE HUNDRED)
    See below for an example of a cash-in-drawer array:

    [
    ["PENNY", 1.01],
    ["NICKEL", 2.05],
    ["DIME", 3.1],
    ["QUARTER", 4.25],
    ["ONE", 90],
    ["FIVE", 55],
    ["TEN", 20],
    ["TWENTY", 60],
    ["ONE HUNDRED", 100]
    ]

    Code by Mathew Haynes
    toastyrhombus@outlook.com.au
    https://www.freecodecamp.org/fcc6d127099-e96b-41d1-978f-359316c20bf3


    IN PROGRESS
*/

function checkCashRegister(price, cash, cid) {
    if (typeof price != "number" || typeof cash != "number" || typeof cid != "object") {
        return undefined;
    }

    arrTempCid = Array.from(cid);

    //We define a dictionary with unit values for currency denominations
    const unitOfCurrency = {
        "PENNY": 0.01,
        "NICKEL": 0.05,
        "DIME": 0.1,
        "QUARTER": 0.25,
        "ONE": 1,
        "FIVE": 5,
        "TEN": 10,
        "TWENTY": 20,
        "ONE HUNDRED": 100
    }

    let targetChange = cash - price;
    let arrActualChange = [];
    let cidValue = 0;
    arrTempCid.reduceRight((_, elem) => {
        cidValue += elem[1]; 
        if (targetChange % unitOfCurrency[elem[0]] == 0 && targetChange > 0) {
            arrActualChange.push([elem[0], targetChange]);
            targetChange -= targetChange;
            cidValue -= targetChange;
        }
        else if (Math.floor(targetChange / unitOfCurrency[elem[0]]) > 0) {
            let quotent = Math.min(Math.floor(targetChange / unitOfCurrency[elem[0]]),Math.floor(elem[1] / unitOfCurrency[elem[0]]));
            if (quotent > 0) {
                arrActualChange.push([elem[0], quotent * unitOfCurrency[elem[0]]]);
                targetChange = Math.round((targetChange - quotent * unitOfCurrency[elem[0]])*100) / 100;
                cidValue -= quotent * unitOfCurrency[elem[0]]
            }
        } 
    }, 0);

    if (targetChange > 0) {
        return ["INSUFFICIENT_FUNDS", []];
    }
    else if (cidValue > 0) {
        return ["OPEN", arrActualChange];
    }
    else if (cidValue == 0) {
        return ["CLOSED", cid];
    }
  }
  
  console.log(checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]));
  