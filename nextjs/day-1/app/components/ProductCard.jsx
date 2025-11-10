import React from "react";
import Link from "next/link";

export default function ProductCard({ title, image, category, price, id }) {
  return (
    <Link href={`/products/${id}`} className="block">
      <section className="border rounded-lg p-4 shadow-sm hover:shadow-md transition">
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-contain mb-3"
        />
        <h2 className="text-lg font-semibold mb-1">{title}</h2>
        <p className="text-gray-500 mb-2">{category}</p>
        <p className="text-blue-600 font-bold">${price}</p>
      </section>
    </Link>
  );
}
