import Circle from "./modules/Circle.js";
import Rectangle from "./modules/Rectangle.js";
import Triangle from "./modules/Triangle.js";
// console.log('');
console.log("start");

const arrayOfShapes = [
  new Circle(15),
  new Rectangle(30, 13),
  new Triangle(16, 14),
];
console.log("shapes", arrayOfShapes);

arrayOfShapes.forEach((shape) => console.log(shape.calcArea()));
