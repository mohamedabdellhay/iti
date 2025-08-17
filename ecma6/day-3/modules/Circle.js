import Shape from "./Shape.js";

export default class Circle extends Shape {
  #radius;
  constructor(_radius) {
    super();
    this.#radius = _radius;
  }
  calcArea() {
    return 3.14 * this.#radius ** 2;
  }
}

// console.log(new Circle(13).calcArea());
