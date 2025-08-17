export default class Shape {
  constructor() {
    if (new.target === Shape) {
      throw new Error("Cannot instantiate Abstract Class directly");
    }
  }
  calcArea() {
    throw new Error("method must be implemented by derived class");
  }
}

// console.log(new Shape()); Uncaught Error: Cannot instantiate Abstract Class directly
