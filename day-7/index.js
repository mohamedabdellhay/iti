const jsTips = [
  "1. Use `===` instead of `==` to avoid type coercion issues.",
  "2. Always declare variables with `let` or `const` to avoid polluting the global scope.",
  "3. Use arrow functions for concise syntax and to retain `this` from the parent scope.",
  "4. Use `Array.map()` and `Array.filter()` for clean and readable array transformations.",
  "5. Use `async/await` for better readability when working with asynchronous code.",
  "6. Destructure objects and arrays to write cleaner and more concise code.",
  "7. Use template literals (`` `Hello ${name}` ``) instead of string concatenation.",
  "8. Debounce or throttle events like scroll or resize for better performance.",
  "9. Use `try...catch` to handle errors gracefully in asynchronous code.",
  "10. Learn and use modern ES6+ features like spread/rest operators, default parameters, and optional chaining.",
];

// js random tip
const randomNumber = Math.ceil(Math.random() * 10 - 1);
console.log(jsTips[randomNumber]);

//  get user email
// const userEmail = prompt("Plz Enter Your Email: ");
const userEmail = "abdellhay@ddd"; // for testing
console.log(userEmail);
const checkUserEmail = (email) => {
  const firstChar = email[0];
  const lastChar = email.at(-1);
  console.log(firstChar, lastChar);
  if (email.includes("@") && firstChar !== "@" && lastChar !== "@") {
    return true;
  } else {
    return false;
  }
};

const isValidEmailMessage = checkUserEmail(userEmail)
  ? "your Email is Valid"
  : "Email is Not valid";

console.log(isValidEmailMessage);

// task number 3

const studentGrads = [60, 100, 10, 15, 85];
studentGrads.sort((a, b) => b - a);
console.log(studentGrads);

const highestDegree = studentGrads.find((ele) => ele <= 100);

console.log("highest degree", highestDegree ?? "Not Found");

console.log("print grads less than 60");
studentGrads.forEach((element) => {
  element < 60 ? console.log(element) : "";
});

//
const students = [
  { name: "mohamed", degree: 60 },
  { name: "ahmed", degree: 10 },
  { name: "ali", degree: 100 },
  { name: "sameh", degree: 15 },
  { name: "sayed", degree: 85 },
];

console.log(students);
const StudentBetween100_95 = students.find((ele) => ele.degree >= 90);
console.log(StudentBetween100_95.name);

// student degrees less than 60
students
  .filter((ele) => ele.degree < 60)
  .forEach((ele) => {
    console.log(ele.name);
  });

//   add element ot array
students.push({ name: "abdellhay", degree: 99 });
const printArray = (array) => {
  array.forEach((ele) => {
    console.log(`student name : ${ele.name} | student Degree: ${ele.degree}`);
    console.log("----------------------------------------------------");
  });
};
printArray(students);
// remove last element

students.pop();
// console.log(students);
printArray(students);

students.sort((a, b) => a.name.localeCompare(b.name));
console.log(students);

//  add two new students

const newStudents = [
  { name: "name 1", degree: 92 },
  { name: "name 2", degree: 93 },
];

students.splice(2, 0, ...newStudents);

console.log(students);

// remove one student at index 4
students.splice(4, 1);
console.log(students);

// task number 5

// let birthday = prompt("Please Enter Your Birthday (DD-MM-YYYY): ");
let birthday = "20-04-2000";

const printUserAge = (birthDate) => {
  const validDate = /^\d{2}-\d{2}-\d{4}$/.test(birthDate);

  if (!validDate) {
    alert("Invalid date format. Please use DD-MM-YYYY.");
    return;
  }
  const [day, month, year] = birthDate.split("-").map(Number);
  const birth = new Date(year, month - 1, day);
  alert(`Your birthday is: ${birth.toDateString()}`);
};

printUserAge(birthday);

//////////// Bonus assignments ///////////////

function getDate(dateString) {
  console.log(dateString);
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const date = new Date(dateString);
  return days[date.getDay()];
}

const dateInput = prompt("plz Enter Date in YYYY-MM-DD Formate: ");
console.log(getDate(dateInput));

// 2-
const phoneNumber = prompt(
  "Enter Egyptian Phone Number in international formate: "
);
const validatePhoneNumber = function (phone) {
  const phonePattern = /^00201[0125]\d{8}$/;
  console.log(phonePattern.test(phone));
};

validatePhoneNumber(phoneNumber);

// 3-
function calcUserAge(birth) {
  const today = new Date();
  const birthDate = new Date(birth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  console.log(today.getDate(), birthDate.getDate());
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  return age;
}

console.log(`Your age is: ${calcUserAge("2000-04-20")}`);
