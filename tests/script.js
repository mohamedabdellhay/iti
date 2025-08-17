class User {
  constructor(name, age, email) {
    this.name = name;
    this.age = age;
    this.email = email;
  }

  getUserName() {
    return this.name;
  }
}

User.prototype.getEmail = () => {
  return this.email;
};

// console.dir(User); // user Class
// console.dir(User.prototype); // object{}

// const mohamed = new User("mohamed", 25, "mohamedabdellhay@mail.com");
// console.log(mohamed);
// console.log(mohamed.__proto__.constructor);

console.log(typeof undefined);
console.log(typeof null);
console.log(typeof (() => {}));
