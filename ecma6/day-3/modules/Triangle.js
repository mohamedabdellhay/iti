import Shape from "./Shape.js";

export default class Triangle extends Shape {
  #base = 0;
  #height = 0;
  constructor(_base, _height) {
    super();
    this.#base = _base;
    this.#height = _height;
  }
  calcArea() {
    return 0.5 * this.#base * this.#height;
  }
}

// console.log(new Triangle(20, 10).calcArea());
