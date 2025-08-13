// "use strict";
// console.log("start ecma script 6 day-1 task 1");

// let arrayOfNumbers = [1, 2, 90, 33, 4, 56, 61, 57, 8, 9];

// console.log("numbers", arrayOfNumbers);
// const sortedArrayAscending = [...arrayOfNumbers].sort((a, b) => a - b);
// console.log("sorted Array ascending", sortedArrayAscending);
// console.log("#######", arrayOfNumbers);

// const sortedArrayDescending = sortedArrayAscending.reverse();
// console.log("descending sorted array", sortedArrayAscending);

// const numbersLargerThan50 = arrayOfNumbers.filter((element) => element > 50);
// console.log("numbers larger than 50", numbersLargerThan50);

// const maxValue = Math.max(...arrayOfNumbers);
// const minValue = Math.min(...arrayOfNumbers);

// console.log("max value: ", maxValue);
// console.log("min value", minValue);

// const sum = function (operation, ...numbers) {
//   //   console.log("numbers", numbers);
//   //   const sumValues = numbers.reduce((a, b) => a + b);
//   const newArray = numbers.join(operation);
//   //   console.log("sum", sumValues);
//   eval();
//   console.log(
//     `result of ${operation} operation ${numbers.join(",")} is ${eval(newArray)}`
//   );
// };

// sum("+", 1, 2, 3, 4);
// sum("-", 1, 2, 3, 4);

// const projectId = 43646;
// const projectName = prompt("Enter Project Name: ");
// const duration = prompt("Enter Project Duration (week): ");

// const project = {
//   projectId,
//   projectName,
//   duration,

//   printData() {
//     console.log(`Project ID: ${this.projectId}`);
//     console.log(`Project Name: ${this.projectName}`);
//     console.log(`Duration: ${this.duration}`);
//   },
// };

// console.log(project);
// project.printData();

// // console.log(number); //undefined

// var number = 2;
// console.log(number); // 2

// // sayHello(); // typeError
// // var sayHello = function () {
// //   console.log("hello");
// // };
// // sayHello(); // hello

// // sayHello(); access error

// let sayHello = function () {
//   console.log("hello");
// };

// // sayHello();  hello
// sayHello = "mohamed";
// // sayHello();  is not a function
// // sayHi(); error

// const sayHi = function () {
//   console.log("hi from constant");
// };

// // sayHi();  hi from constant

// // sayHi = "mohamed";  invalid assignment to constant
var testArrow = () => {
  console.log("gfdsdfghj", this);
};
testArrow();
window.testArrow();
const testNonArrow = function () {
  console.log(this);
};

const myObj = function () {
  this.name = "test";
};
myObj.prototype.testArrow = testArrow;
myObj.prototype.testArrow1 = function (func) {
  console.log("++++++++++");
  console.log(this);
  console.log("++++++++++");
  func();
};

myObj.prototype.testNonArrow = testNonArrow;
// testArrow(); // window
const testFunction = new myObj();
// testFunction.testArrow();
console.log("_________________");

testFunction.testArrow1(testArrow);
// testFunction.testNonArrow();

const t = {
  name: "ajjkdsd",
  dd: () => {
    console.log("this from arrow", this);
  },
  test: function () {
    console.log("RRRRRRRRRRRRRRRRRRRRrr");
    console.log("this for object", this);

    this.dd();
  },
};
console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");

t.test();
