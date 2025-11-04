import React from "react";
import { Star, ShoppingCart } from "lucide-react";
import { Link } from "react-router";
export default function ProductCard({ product }) {
  const {
    id,
    title,
    price,
    category,
    image,
    rating: { rate, count } = {},
  } = product;

  return (
    <Link to={`/product/${id}`}>
      <div className="group relative bg-white rounded-xl shadow-sm transition-all duration-300 overflow-hidden border border-gray-100">
        {/* Wishlist Heart (Top Right) */}
        <button className="absolute top-3 right-3 z-10 p-2 bg-white/80  rounded-full opacity-0 transition-opacity">
          <svg
            className="w-5 h-5 text-gray-600 hover:text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>

        {/* Product Image */}
        <div className="aspect-w-1 aspect-h-1 bg-gray-50 p-6">
          <img
            src={image}
            alt={title}
            className="w-full h-64 object-contain object-center group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Category Tag */}
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-semibold rounded-full capitalize">
            {category
              ?.replace("men's clothing", "Men")
              .replace("women's clothing", "Women")}
          </span>
        </div>

        {/* Card Content */}
        <div className="p-4 space-y-3">
          {/* Title */}
          <h3 className="font-semibold text-gray-900 line-clamp-2 text-lg leading-tight">
            {title}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={`${
                    i < Math.floor(rate)
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">
              {rate} <span className="text-gray-400">({count} reviews)</span>
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">${price}</p>
              {price > 50 && (
                <p className="text-xs text-gray-500 line-through">$59.99</p>
              )}
            </div>

            {/* Add to Cart Button */}
            <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2.5 rounded-lg hover:bg-indigo-700 transition-colors font-medium text-sm">
              <ShoppingCart size={18} />
              <span>Add</span>
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
