import React from "react";

import ProductCard from "../components/ProductCard";

export default async function ProductsList() {
  const res = await fetch("https://fakestoreapi.com/products");
  const products = await res.json();
  console.log(products);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
}
