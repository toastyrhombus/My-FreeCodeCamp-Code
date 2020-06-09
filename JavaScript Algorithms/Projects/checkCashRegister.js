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
    if (
        typeof price != "number" ||
        typeof cash != "number" ||
        typeof cid != "object"
    ) {
        return undefined;
    }

    let arrTempCid = Array.from(cid);

    //We define a dictionary with unit values for currency denominations
    const unitOfCurrency = {
        PENNY: 0.01,
        NICKEL: 0.05,
        DIME: 0.1,
        QUARTER: 0.25,
        ONE: 1,
        FIVE: 5,
        TEN: 10,
        TWENTY: 20,
        "ONE HUNDRED": 100,
    };

    let targetChange = cash - price;
    let arrActualChange = [];
    let cidValue = 0;
    //We operate on the passed array from right to left as we are ASSUMING it will be passed with the largest denominations last
    arrTempCid.reduceRight((_, elem) => {
        //We check that change is still owed, if not expedite out of loop
        if (targetChange > 0) {
            let strDenomination = elem[0];
            let numAmountAvailable = elem[1];

            //We accumulate the value of each currency passed to determine the status to be returned
            cidValue += numAmountAvailable;

            //We check for perfect change
            let boolDivisibleByDenomination = false;
            let boolPerfectChange = false;
            targetChange % unitOfCurrency[strDenomination] == 0
                ? (boolDivisibleByDenomination = true)
                : (boolDivisibleByDenomination = false);
            targetChange <= numAmountAvailable
                ? (boolPerfectChange = true)
                : (boolPerfectChange = false);

            if (boolDivisibleByDenomination && boolPerfectChange) {
                arrActualChange.push([strDenomination, targetChange]);
                targetChange -= targetChange;
                //We subtract the change we gave from the cidValue variable to track if we have enough change
                cidValue -= targetChange;
            //We then check if it is at all divisible by our unitofcurrency
            } else if (Math.floor(targetChange / unitOfCurrency[strDenomination]) > 0) {
                //We need to use min to ensure we actually have some relevant currency units to use
                // and if we do, put it in the array
                let quotent = Math.min(
                    Math.floor(targetChange / unitOfCurrency[strDenomination]),
                    Math.floor(numAmountAvailable / unitOfCurrency[strDenomination])
                );
                if (quotent > 0) {
                    arrActualChange.push([
                        strDenomination,
                        quotent * unitOfCurrency[strDenomination],
                    ]);
                    //We need to subtract the amount we use for change from our existing change varaible
                    targetChange =
                        Math.round(
                            (targetChange - quotent * unitOfCurrency[strDenomination]) *
                                100
                        ) / 100;
                    //We also need to subtract the amount we use for change from the CID value variable
                    cidValue -= quotent * unitOfCurrency[strDenomination];
                }
            }
        }
    }, 0);

    //We need to check the targetChange, Cidvalue to determine the status. If we have anything left in targetChange
    // then that means we failed to find enough change. If we have money left in the drawer, we are still open and 
    // fulfilled the change request. If we have nothing left in the drawer, then we are now closed.
    if (targetChange > 0) {
        return { status: "INSUFFICIENT_FUNDS", change: [] };
    } else if (cidValue > 0) {
        return { status: "OPEN", change: arrActualChange };
    } else if (cidValue == 0) {
        return { status: "CLOSED", change: cid };
    }
}

console.log(
    checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]])
);
