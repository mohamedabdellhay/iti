import React from "react";
import ProductCard from "./ProductCard";

const products = [
  {
    title: "Brown Chair Design",
    price: "€100.09",
    image: "b1.jpg",
  },
  {
    title: "Modern Wooden Table",
    price: "€250.50",
    image: "b2.jpg",
  },
  {
    title: "Cozy Leather Sofa",
    price: "€450.75",
    image: "b3.jpg",
  },
  {
    title: "Elegant Bookshelf",
    price: "€180.25",
    image: "f1.png",
  },
  {
    title: "White Dining Set",
    price: "€320.00",
    image: "f2.png",
  },
  {
    title: "Minimalist Lamp",
    price: "€45.99",
    image: "f3.png",
  },
  {
    title: "Velvet Armchair",
    price: "€220.30",
    image: "f4.png",
  },
  {
    title: "Glass Coffee Table",
    price: "€150.80",
    image: "f5.png",
  },
  {
    title: "Rustic Bed Frame",
    price: "€380.45",
    image: "f6.png",
  },
];

export default function Products() {
  return (
    <div className="grid grid-cols-3 gap-3">
      {products.map((ele) => (
        <ProductCard product={ele} />
      ))}
    </div>
  );
}
