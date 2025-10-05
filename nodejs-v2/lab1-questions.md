# Lab 1: JavaScript Fundamentals - Array Methods & Modern Features

## Overview

Master essential JavaScript concepts: array methods, spread/rest operators, function types, higher-order functions, and shallow vs deep copying.

**Prerequisites**: Basic JavaScript knowledge, VS Code, Node.js installed

## Learning Objectives

- Master array methods (map, filter, reduce)
- Understand spread and rest operators
- Differentiate function declaration types
- Work with higher-order functions
- Understand shallow vs deep copying techniques

---

## Lab Tasks

Create a file named `lab1-practice.js` and complete the following exercises:

### Part 1: Array Methods

Use this data for all array method exercises:

```javascript
const students = [
  { name: "Alice", age: 20, grade: 85, subjects: ["Math", "Physics"] },
  { name: "Bob", age: 22, grade: 92, subjects: ["Chemistry", "Biology"] },
  { name: "Charlie", age: 19, grade: 78, subjects: ["Math", "Chemistry"] },
  { name: "Diana", age: 21, grade: 95, subjects: ["Physics", "Biology"] },
  { name: "Eve", age: 20, grade: 88, subjects: ["Math", "Biology"] },
];
```

**Exercise 1: Using `map()`**

1. Create an array of student names only
2. Create an array of objects with `name` and `status` where status is "Pass" if grade >= 80, otherwise "Fail"
3. Create an array of strings: "StudentName (Age years old)"

**Exercise 2: Using `filter()`**

1. Filter students who passed (grade >= 80)
2. Filter students who are 20 years old or younger
3. Filter students who study "Math"

**Exercise 3: Using `reduce()`**

1. Calculate the average grade of all students
2. Count how many students study each subject (return an object with subject counts)
3. Find the student with the highest grade

**Exercise 4: Chaining Array Methods**

Combine multiple methods to find the names of students who:

- Are 21 or younger
- Have a grade above 85
- Study "Math"

---

### Part 2: Spread Operator

**Exercise 5: Array Spread**

```javascript
const fruits = ["apple", "banana"];
const vegetables = ["carrot", "broccoli"];
```

1. Combine both arrays into one using spread operator
2. Create a new array with "orange" at the beginning, then fruits, then "potato", then vegetables
3. Create a copy of the fruits array and add "grape" to the copy (original should remain unchanged)

**Exercise 6: Object Spread**

```javascript
const baseUser = { name: "John", age: 25 };
const address = { city: "New York", country: "USA" };
```

1. Create a new object combining baseUser and address
2. Create a new user object with all baseUser properties but change the age to 26
3. Create a user profile with baseUser, address, and additional property `isActive: true`

---

### Part 3: Rest Operator

**Exercise 7: Function Parameters**

1. Create a function `sum(...numbers)` that accepts any number of arguments and returns their sum
2. Create a function `introduce(name, age, ...hobbies)` that returns: "Hi, I'm [name], [age] years old, and I like [hobbies joined by ', ']"

**Exercise 8: Array Destructuring with Rest**

```javascript
const colors = ["red", "green", "blue", "yellow", "purple", "orange"];
```

1. Destructure to get first color, second color, and all remaining colors in a separate array
2. Destructure to get first color and all others in a rest array

**Exercise 9: Object Destructuring with Rest**

```javascript
const person = {
  name: "Sarah",
  age: 28,
  city: "Boston",
  job: "Developer",
  hobby: "Reading",
};
```

1. Destructure to get `name` and `age`, with all other properties in a rest object
2. Destructure to get `name`, and group the rest as `details`

---

### Part 4: Function Types and Differences

**Exercise 10: Three Function Types**

Create the same function `calculateArea(length, width)` using all three methods:

1. **Function Declaration**
2. **Function Expression**
3. **Arrow Function**

Then answer these questions in comments:

- Which ones are hoisted?
- Which one doesn't have its own `this` context?
- Which one is most concise?

**Hint**: Test hoisting by trying to call the function before its declaration.

**Exercise 11: `this` Context Difference**

```javascript
const calculator = {
  value: 10,
  // Add three methods here that multiply 'value' by a given number:
  // 1. regularMethod: function(num) { ... }
  // 2. arrowMethod: (num) => { ... }
  // 3. shorthandMethod(num) { ... }
};
```

Test all three methods and explain in comments why the arrow function behaves differently.

---

### Part 5: Higher-Order Functions

**Exercise 12: Function as Parameter**

1. Create a function `processNumbers(numbers, operation)` that takes an array and a callback function
2. Test it with different operations:
   - Double each number
   - Square each number
   - Check if each number is even (return true/false)

**Exercise 13: Function Returning Function**

Create a function `createValidator(minLength)` that returns a validation function. The returned function should:

- Take a string as input
- Return `true` if string length >= minLength
- Return `false` otherwise

Example usage:

```javascript
const validatePassword = createValidator(8);
const validateUsername = createValidator(3);
console.log(validatePassword("hello")); // false
console.log(validatePassword("hello123")); // true
```

---

### Part 6: Shallow vs Deep Copy

**Exercise 14: Understanding the Problem**

```javascript
const originalData = {
  name: "Company ABC",
  employees: [
    { name: "John", department: "IT" },
    { name: "Jane", department: "HR" },
  ],
  location: {
    city: "New York",
    address: "123 Main St",
  },
};
```

1. Create a shallow copy using spread operator and modify:

   - The `name` property
   - An employee's department
   - The city in location

   What happens to the original object? Explain in comments.

**Exercise 15: Deep Copy Methods**

Using the same `originalData` from Exercise 14, implement deep copying using **THREE different methods**:

1. **Method 1: JSON.parse(JSON.stringify())**

   - When does this method fail? (Hint: functions, dates, undefined)

2. **Method 2: Recursive function**

   ```javascript
   function deepCopy(obj) {
     // Your implementation here
     // Hint: Check if obj is object, handle arrays, recursively copy properties
   }
   ```

3. **Method 3: Using a library (simulate with manual implementation)**
   Create a function `lodashCloneDeep(obj)` that handles:
   - Objects and arrays
   - Nested structures
   - Different data types

**Hints for Deep Copy Implementation**:

- Check if the value is an object: `typeof obj === 'object' && obj !== null`
- Handle arrays: `Array.isArray(obj)`
- Handle dates: `obj instanceof Date`
- Use recursion for nested objects

Test each method by modifying nested properties and verifying the original remains unchanged.

---

## Testing Your Code

Run your code using:

```bash
node lab1-practice.js
```

Use `console.log()` to display and verify your results for each exercise.

## Submission Guidelines

- Complete all exercises in `lab1-practice.js`
- Add clear comments explaining your observations
- Test all your functions with the provided data
- For deep copy methods, demonstrate that they work by modifying copies without affecting originals

Good luck! 🚀
