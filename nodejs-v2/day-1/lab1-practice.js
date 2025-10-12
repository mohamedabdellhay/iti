const students = [
  { name: "Alice", age: 20, grade: 85, subjects: ["Math", "Physics"] },
  { name: "Bob", age: 22, grade: 92, subjects: ["Chemistry", "Biology"] },
  { name: "Charlie", age: 19, grade: 78, subjects: ["Math", "Chemistry"] },
  { name: "Diana", age: 21, grade: 95, subjects: ["Physics", "Biology"] },
  { name: "Eve", age: 20, grade: 88, subjects: ["Math", "Biology"] },
];

const studentNames = students.map((ele) => ele.name);
console.log("names", studentNames);
const nameAndStatus = students.map((ele) => {
  const pass = ele.grade > 80 ? "Pass" : "Fail";
  return {
    name: ele.name,
    pass,
  };
});

console.log("nameAndStatus", nameAndStatus);

const StudentNameAndAge = students.map(
  (ele) => `${ele.name} (${ele.age} years old)`
);

console.log("StudentNameAndAge", StudentNameAndAge);

// #### 2 ######### //
const studentGraterThanOrEqual80 = students.filter((ele) => ele.grade >= 80);
console.log("studentGraterThanOrEqual80", studentGraterThanOrEqual80);

const studentLessThanOrEqualAge20 = students.filter((ele) => ele.age <= 20);
console.log("studentLessThanOrEqualAge20", studentLessThanOrEqualAge20);

const studentStudyMath = students.filter((ele) =>
  ele.subjects.includes("Math")
);

console.log("studentStudyMath", studentStudyMath);

// ########## 3 ########## //
const averageGrade =
  students.reduce((sum, student) => sum + Number(student.grade), 0) /
  students.length;
console.log("averageGrade", averageGrade);

const studentWithHighestGrade = students.reduce((a, c) => {
  return a.grade > c.grade ? a : c;
});
console.log("studentWithHighestGrade", studentWithHighestGrade);

/// ####### 4 ########### //
const ageAbove21 = (arr) => {
  return arr.filter((ele) => ele.age <= 20);
};
console.log("ageAbove21", ageAbove21(students));
const haveGradeAbove50 = (arr) => {
  return arr.filter((ele) => ele.grade > 50);
};

console.log("test", haveGradeAbove50(ageAbove21(students)));
const studyMath = (arr) => {
  return arr.filter((ele) => ele.subjects.includes("Math"));
};

console.log("test 2", studyMath(haveGradeAbove50(ageAbove21(students))));

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// ### Part 2: Spread Operator
//1
const fruits = ["apple", "banana"];
const vegetables = ["carrot", "broccoli"];
const combinedArray = [...fruits, ...vegetables];
console.log("combinedArray", combinedArray);

const arrayWithOrangAndPotato = ["orange", ...fruits, "potato", ...vegetables];
console.log("arrayWithOrangAndPotato", arrayWithOrangAndPotato);
const copyOfFruits = [...fruits, "grape"];
console.log("fruits", fruits);
console.log("copyOfFruits", copyOfFruits);

//2
const baseUser = { name: "John", age: 25 };
const address = { city: "New York", country: "USA" };
const userWithAddress = {
  ...baseUser,
  address,
};
console.log("userWithAddress", userWithAddress);
const userWithAge20 = {
  ...userWithAddress,
  age: 20,
};

console.log("userWithAge20", userWithAge20);
const userWithActiveProperty = {
  ...userWithAge20,
  isActive: true,
};

console.log("userWithActiveProperty", userWithActiveProperty);

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@2
// ### Part 3: Rest Operator
const sum = (...numbers) => {
  return numbers.reduce((sum, ele) => sum + ele, 0);
};
console.log(sum(3, 4, 5));

const introduce = (name, age, ...hobbies) => {
  return `Hi i ${name}, ${age} years old, i like ${hobbies.join(", ")}`;
};

// "Hi, I'm [name], [age] years old, and I like [hobbies joined by ', ']"
console.log("me", introduce("abdellhay", 25, "reading", "coding"));

// 2
const colors = ["red", "green", "blue", "yellow", "purple", "orange"];
const [first, second, ...other] = colors;
console.log(first, second, other);
const [firstColor, ...otherColors] = colors;
console.log(firstColor, otherColors);

//3
const person = {
  name: "Sarah",
  age: 28,
  city: "Boston",
  job: "Developer",
  hobby: "Reading",
};

const { name, age, ...otherProperties } = person;
console.log(name, age, otherProperties);
const { name: userName, ...details } = person;
console.log(name, details);

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// ### Part 4: Function Types and Differences
function calculateAreaFunctionDeclaration(length, width) {
  return length * width;
}

const calculateAreaFunctionExpression = function (length, width) {
  return length * width;
};

const calculateAreaArrowFunction = (length, width) => length * width;

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// **Exercise 11: `this` Context Difference**

const calculator = {
  value: 10,
  // Add three methods here that multiply 'value' by a given number:

  // 1. regularMethod: function(num) { ... }
  regularMethod: function (num) {
    return this.value * num;
  },

  // 2. arrowMethod: (num) => { ... }
  arrowMethod: (num) => num * this.value,

  // 3. shorthandMethod(num) { ... }
  shorthandMethod(num) {
    return this.value * num;
  },
};

console.log(calculator.regularMethod(2));
console.log(calculator.arrowMethod(2));
console.log(calculator.shorthandMethod(2));

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// ### Part 5: Higher-Order Functions
const processNumbers = (numbers, operation) => {
  return operation(numbers);
};

const doubleOperation = processNumbers([1, 2, 3], (num) => {
  return num.map((ele) => ele * 2);
});
console.log(doubleOperation);
const squareOperation = processNumbers([1, 2, 3], (num) => {
  return num.map((ele) => ele * ele);
});

console.log("squareOperation", squareOperation);

const isEvenNumber = processNumbers([1, 2, 3, 4, 5], (num) =>
  num.map((ele) => ele % 2 === 0)
);

console.log("isEvenNumber", isEvenNumber);

// @@@@@@@@@@@@@@@@@@@@@@@@@
// **Exercise 13: Function Returning Function**
const createValidator = (minLength) => {
  return (data) => data.length >= minLength;
};
const validatePassword = createValidator(8);
const validateUsername = createValidator(3);
console.log(validatePassword("hello")); // false
console.log(validatePassword("hello123")); // true

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@2
// ### Part 6: Shallow vs Deep Copy

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

const shallowCopy = { ...originalData };
shallowCopy.name = "abdellhay";
shallowCopy.employees[0].department = "test dept";
shallowCopy.location.city = "zagazig";
console.log("shallowCopy", shallowCopy);

const deepCopy1 = JSON.parse(JSON.stringify(originalData));
deepCopy1.location.city = "cairo";
console.log("deepCopy1", deepCopy1);

// function deepCopy(obj) {
//   if (hash.has(obj)) return hash.get(obj);
//   const copy = {};
//
//   for (const key in obj) {
//     if (obj.hasOwnProperty(key)) {
//       copy[key] = deepCopy(obj[key]);
//     }
//   }

//   return copy;
// }

// const copyUsingFunction = deepCopy(originalData);

// using ai
function deepCopy(obj) {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  if (obj instanceof Date) {
    return new Date(obj);
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => deepCopy(item));
  }

  const copy = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      copy[key] = deepCopy(obj[key]);
    }
  }

  return copy;
}

const copy1 = deepCopy(originalData);

console.log("deepCopy", copy1);

function lodashCloneDeep(obj, hash = new WeakMap()) {
  if (obj === null || typeof obj !== "object") return obj;

  if (hash.has(obj)) return hash.get(obj);

  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj);
  if (obj instanceof Set) {
    const newSet = new Set();
    hash.set(obj, newSet);
    obj.forEach((val) => newSet.add(lodashCloneDeep(val, hash)));
    return newSet;
  }
  if (obj instanceof Map) {
    const newMap = new Map();
    hash.set(obj, newMap);
    obj.forEach((val, key) =>
      newMap.set(lodashCloneDeep(key, hash), lodashCloneDeep(val, hash))
    );
    return newMap;
  }

  const copy = Array.isArray(obj) ? [] : {};
  hash.set(obj, copy);

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      copy[key] = lodashCloneDeep(obj[key], hash);
    }
  }

  return copy;
}

const copy2 = lodashCloneDeep(originalData);
console.log("lodashCloneDeep", copy2);
