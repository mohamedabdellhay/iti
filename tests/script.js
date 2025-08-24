class Person {
  #name;
  #age;
  #email;

  constructor(_name, _age, _email) {
    if (new.target === Person) throw new Error("Person is Abstract Class");
    this.#name = _name;
    this.#age = _age;
    this.#email = _email;
  }

  set Name(name) {
    this.#name = name;
  }
  get Name() {
    return this.#name;
  }
  set Age(age) {
    this.#age = age;
  }
  get Age() {
    return this.#age;
  }
  set Email(email) {
    this.#email = email;
  }
  get Email() {
    return this.#email;
  }
  displayUserData() {
    return `userName: ${this.Name} | userAge: ${this.Age} | userEmail: ${this.Email}`;
  }
}

class Student extends Person {
  #class;
  #track;
  constructor(_name, _age, _email, _class, _track) {
    super(_name, _age, _email);
    this.#class = _class;
    this.#track = _track;
  }
  displayUserData() {
    return `${super.displayUserData()} | class: ${this.#class} | Track: ${
      this.#track
    }`;
  }
}

const stdOne = new Student(
  "abdellhay",
  25,
  "mohamedabdellhay1@gmil.com",
  "math",
  "mern"
);

console.log(stdOne);
// const pOne = new Person("any", 11, "test@mail.com"); Error

console.log(stdOne.displayUserData());
console.dir([1] + [1]);
// Object.prototype.toString = function () {
//   return Object.keys(this)
//     .map((key) => `${key}: '${this[key]}'`)
//     .join(", ");
// };

// Array.prototype.toString = function () {
//   throw new Error("toString is not a function");
// };

console.log(Document.prototype);
Document.prototype.logMe = (eleSelector) => {
  const ele = document.querySelector(eleSelector);
  if (!ele) throw new Error(`${eleSelector} is not found`);
  console.log(ele);
};

document.logMe("#root");
document.logMe("#rouuuot");
document.getElementById("root").innerText = [1, 2, 3];
document.getElementById("test").innerText = {
  name: "test",
  age: 1,
  email: "abdellhay@test.test",
};
