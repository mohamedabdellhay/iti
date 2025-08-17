import Shape from "./Shape.js";

export default class Rectangle extends Shape {
  #width = 0;
  #height = 0;
  constructor(_width, _height) {
    super();
    this.#width = _width;
    this.#height = _height;
  }

  calcArea() {
    return this.#width * this.#height;
  }
}

// console.log(new Rectangle(20, 12).calcArea());
