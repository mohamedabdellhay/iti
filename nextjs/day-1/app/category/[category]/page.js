"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ProductCard from "@/app/components/ProductCard";

export default function Category() {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`https://fakestoreapi.com/products`, {
          cache: "no-store",
        });
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        console.log(data);

        setProducts(data.filter((ele) => ele.category === category));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        Loading products...
      </div>
    );

  if (error)
    return <div className="text-red-500 text-center mt-4">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 capitalize">{category}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard {...product} key={product.id} />
        ))}
      </div>
    </div>
  );
}
