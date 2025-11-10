import React from "react";
import Image from "next/image";

export default function ProductCard({ product }) {
  return (
    <div>
      <div key={product.id} className="group relative">
        {product.imageSrc && (
          <Image
            width={200}
            height={350}
            alt={product.imageAlt}
            src={product.imageSrc}
            className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
          />
        )}
        <div className="mt-4 flex justify-between">
          <div>
            <h3 className="text-sm text-gray-700">
              <a href={product.href}>
                <span aria-hidden="true" className="absolute inset-0" />
                {product.name}
              </a>
            </h3>
            <p className="mt-1 text-sm text-gray-500">{product.color}</p>
          </div>
          <p className="text-sm font-medium text-gray-900">{product.price}</p>
        </div>
      </div>
    </div>
  );
}
