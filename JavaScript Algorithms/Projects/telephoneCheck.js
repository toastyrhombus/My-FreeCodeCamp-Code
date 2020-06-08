/* 
    JavaScript Algorithms and Data Structures Projects: Telephone Number Validator
    Return true if the passed string looks like a valid US phone number.

    The user may fill out the form field any way they choose as long as it has the format of a valid US number. The following are examples of valid formats for US numbers (refer to 
        the tests below for other variants):

    555-555-5555
    (555)555-5555
    (555) 555-5555
    555 555 5555
    5555555555
    1 555 555 5555
    For this challenge you will be presented with a string such as 800-692-7753 or 8oo-six427676;laskdjf. Your job is to validate or reject the US phone number based on any combination 
    of the formats provided above. The area code is required. If the country code is provided, you must confirm that the country code is 1. Return true if the string is a valid US phone
    number; otherwise return false.


    Code by Mathew Haynes
    toastyrhombus@outlook.com.au
    https://www.freecodecamp.org/fcc6d127099-e96b-41d1-978f-359316c20bf3
*/

function telephoneCheck(str) {
  if (typeof str != "string") {
      return undefined;
  }
  //We copy the value of str to a working variable to avoid side-effects
  let strWorking = String(str);
  //This looks like a complicated regex but it really isn't. We have 3 sets here, one matches
  // a full string from start to finish with a set like 000-000-0000, the other matches a full
  // set of 10 digits with no whitespace between them ex 0000000000, the next checks for a 1 digit
  // at the start of the string and then looks for the same pattern as our first set following that one.
  // I'm sure this is not the most efficient regex string
  let re = /^(?:(?:\(\d{3}\))|(?:\d{3}(?!.*\))))[\W_]?\d{3}[\W_]?\d{4}$|^1[\W_]?(?:(?:\(\d{3}\))|(?:\d{3}(?!.*\))))[\W_]?\d{3}[\W_]?\d{4}$/
  return re.test(strWorking);
}

console.log(telephoneCheck("5555555"));