// console.log("start");
// debugger;
// console.log( );
number1 = 3;
var number2 = 2;
var number3 = 9;

var firstName = "mohamed";
var middleName = "Elsayed";
var lastName = `Abdellaziz`;

var flag = true;

console.log("external 1", number1);
// console.log("number 2", number2);
// console.log("number 3", number3);

// console.log("first name", firstName);
// console.log("middle name", middleName);
// console.log("last name", lastName);
// console.log(flag);

// console.log("this is the external js file");

// try to change character at index 3

console.log("firstName[3]", firstName[3]); // a
firstName[3] = "w"; // nothing happens, strings are immutable
console.log("firstName", firstName); // mohamed

console.log(typeof number1); // number
console.log(typeof firstName); // string
console.log(typeof flag); // boolean

console.log(number1 + number2); // 5
console.log(flag + number2); // 3, true is converted to 1
console.log(firstName + flag); // mohamedtrue, boolean is converted to string
console.log(number1 + firstName); // 3mohamed, number is converted to string
console.log(number1 + number2 + firstName); // 5mohamed, number is converted to string
console.log(number1 + firstName + number2); // 3mohamed2, number is converted to string
console.log(number1 * flag); // 3, true is converted to 1
console.log(number1 / lastName); // NaN, string cannot be divided by number
console.log(`${firstName} ${middleName} ${lastName}`); // mohamed Elsayed Abdellaziz, all strings are concatenated
console.table({
  number1,
  number2,
  number3,
  firstName,
  middleName,
  lastName,
  flag,
}); // displays the variables in a table format

let num = prompt("Enter a number: ");
console.log("You entered:", num); // Displays the number entered by the user
const isNumber = !isNaN(num); // Checks if the input is a number
if (isNumber) {
  num = Number(num); // Converts to number
  if (num % 2 === 0) {
    console.log("The number is even.");
  } else {
    console.log("The number is odd.");
  }
} else {
  console.log("Please enter a valid number.");
}

let i;

//  print 1-10 numbers using loop
for (i = 1; i <= 10; i++) {
  console.log(Number(num));
}

console.log(i);

checkNumber(Number(num)); // Call the function to check if the number is positive, negative, or zero
printMultiplicationTable(Number(num)); // Call the function to print the multiplication table for the number
function checkNumber(num) {
  if (num > 0) {
    console.log(num + " is positive");
  } else if (num < 0) {
    console.log(num + " is negative");
  } else {
    console.log(num + " is zero");
  }
}

// print multiplication table for any number in console
function printMultiplicationTable(num) {
  console.log(`Multiplication table for ${num}:`);
  for (let i = 1; i <= 10; i++) {
    console.log(`${num} x ${i} = ${num * i}`);
  }
}

/* Write a program that takes a number from 1 to 7 and prints the
corresponding day of the week (e.g., 1 -> "Sunday", 2 ->
"Monday", etc.)
*/
let dayNumber = prompt("Enter a number from 1 to 7: ");
dayNumber = Number(dayNumber); // Convert input to number
switch (dayNumber) {
  case 1:
    console.log("Sunday");
    break;
  case 2:
    console.log("Monday");
    break;
  case 3:
    console.log("Tuesday");
    break;
  case 4:
    console.log("Wednesday");
    break;
  case 5:
    console.log("Thursday");
    break;
  case 6:
    console.log("Friday");
    break;
  case 7:
    console.log("Saturday");
    break;
  default:
    console.log("Invalid input! Please enter a number between 1 and 7.");
    break;
}
// console.log("end of external.js");

/* Write a program that takes a day number and prints whether it's a
weekend or a weekday.*/
let dayInput = prompt("Enter a day number (1-7): ");
dayInput = Number(dayInput); // Convert input to number
switch (dayInput) {
  case 1:
    console.log("It's a weekend.");
    break;
  case 7:
    console.log("It's a weekday.");
    break;
  case 2:
  case 3:
  case 4:
  case 5:
  case 6:
  default:
    console.log("Invalid input! Please enter a number between 1 and 7.");
    break;
}
