console.log("starting advanced javascript prototype");

// console.log(Object.prototype.__proto__);

function User() {
  if (!new.target) throw new Error("you must use new keyword");
}
const a = User();
const b = new User();
// console.log(a);
// console.log(b);
