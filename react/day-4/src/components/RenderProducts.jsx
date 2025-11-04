import React from "react";
import ProductCard from "./ProductCard";

export default function RenderProducts({ products }) {
  return (
    <>
      {" "}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}
