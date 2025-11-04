// ProductPage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router";

import {
  Star,
  Truck,
  Shield,
  RefreshCw,
  Heart,
  Share2,
  Minus,
  Plus,
} from "lucide-react";
import Error from "../components/Error";
import Loader from "../components/Loader";
const API = import.meta.env.VITE_API;
export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({ status: false, message: "" });
  const [quantity, setQuantity] = useState(1);

  const [isWishListed, setIsWishListed] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API}products/${id}`);
        console.log(`${API}products/${id}`);

        const data = await response.json();
        console.log("data", data);
        setProduct(data);
      } catch (error) {
        console.log(error);
        setError({ status: true, message: error.message });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <Loader />;
  if (error.status) return <Error message={error.message} />;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3 text-sm">
          <a href="/" className="text-gray-500 hover:text-indigo-600">
            Home
          </a>
          <span className="mx-2 text-gray-400">/</span>
          <Link
            to={`/category/${product.category}`}
            className="text-gray-500 hover:text-indigo-600"
          >
            {product.category}
          </Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-900">{product.title.slice(0, 30)}...</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left: Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-96 lg:h-[550px] object-contain object-center"
              />
              <button
                onClick={() => setIsWishListed(!isWishListed)}
                className="absolute top-4 right-4 p-3 bg-white/90 backdrop-blur rounded-full shadow-md hover:shadow-lg transition"
              >
                <Heart
                  size={24}
                  className={
                    isWishListed ? "fill-red-500 text-red-500" : "text-gray-600"
                  }
                />
              </button>
            </div>
          </div>

          {/* Right: Details */}
          <div className="space-y-6">
            {/* Category & Share */}
            <div className="flex items-center justify-between">
              <span className="px-4 py-1 bg-purple-100 text-purple-700 text-xs font-bold rounded-full uppercase">
                {product.category}
              </span>
              <button className="p-2 hover:bg-gray-100 rounded-full transition">
                <Share2 size={20} className="text-gray-600" />
              </button>
            </div>

            {/* Title */}
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
              {product.title}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    className={`${
                      i < Math.round(product.rating.rate)
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-gray-600">
                {product.rating.rate} ({product.rating.count} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <p className="text-4xl font-bold text-indigo-600">
                ${product.price}
              </p>
              <p className="text-lg text-gray-500 line-through">$19.99</p>
              <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-bold">
                45% OFF
              </span>
            </div>

            {/* Description */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-4">
              <span className="font-medium">Quantity:</span>
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 hover:bg-gray-100 transition"
                >
                  <Minus size={18} />
                </button>
                <span className="px-6 font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 hover:bg-gray-100 transition"
                >
                  <Plus size={18} />
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="flex gap-4">
              <button className="flex-1 bg-indigo-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 transition shadow-lg hover:shadow-xl">
                Add to Cart
              </button>
              <button className="bg-gray-900 text-white p-4 rounded-xl hover:bg-gray-800 transition">
                Buy Now
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t">
              <div className="text-center">
                <Truck className="mx-auto text-indigo-600 mb-1" size={28} />
                <p className="text-xs font-medium">Free Shipping</p>
              </div>
              <div className="text-center">
                <RefreshCw className="mx-auto text-indigo-600 mb-1" size={28} />
                <p className="text-xs font-medium">30-Day Returns</p>
              </div>
              <div className="text-center">
                <Shield className="mx-auto text-indigo-600 mb-1" size={28} />
                <p className="text-xs font-medium">Secure Payment</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
