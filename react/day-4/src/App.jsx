// src/pages/Home.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadCartFromStorage } from "./features/cartSlice.js";
import {
  ShoppingBag,
  Truck,
  Shield,
  RefreshCw,
  ChevronRight,
  Star,
} from "lucide-react";
import ProductCard from "./components/ProductCard"; // Your card from before

export default function App() {
  const dispatch = useDispatch();
  const { isLoaded } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(loadCartFromStorage());
  }, [dispatch]);

  if (!isLoaded) {
    return <p>Loading...</p>;
  }
  const featured = [
    {
      id: 1,
      title: "Summer Tee",
      price: 19.99,
      image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
      rating: { rate: 4.5, count: 89 },
    },
    {
      id: 2,
      title: "Rose Gold Earrings",
      price: 10.99,
      image:
        "https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_t.png",
      rating: { rate: 4.1, count: 100 },
    },
    {
      id: 3,
      title: "Casual Jacket",
      price: 49.99,
      image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
      rating: { rate: 4.7, count: 320 },
    },
    {
      id: 4,
      title: "Wireless Earbuds",
      price: 39.99,
      image: "https://fakestoreapi.com/img/61mtL65D4cL._AC_SX679_.jpg",
      rating: { rate: 4.3, count: 150 },
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="bg-linear-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16 lg:py-24 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold mb-4">
            Summer Sale is LIVE!
          </h1>
          <p className="text-xl lg:text-2xl mb-8 opacity-90">
            Up to 50% OFF on everything
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/shop"
              className="bg-white text-indigo-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition flex items-center justify-center gap-2"
            >
              Shop Now <ChevronRight />
            </a>
            <a
              href="/deals"
              className="border-2 border-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition"
            >
              View Deals
            </a>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center">
              <Truck className="text-indigo-600 mb-2" size={32} />
              <p className="font-semibold">Free Shipping</p>
              <p className="text-sm text-gray-600">Orders over $50</p>
            </div>
            <div className="flex flex-col items-center">
              <RefreshCw className="text-indigo-600 mb-2" size={32} />
              <p className="font-semibold">Easy Returns</p>
              <p className="text-sm text-gray-600">30-day policy</p>
            </div>
            <div className="flex flex-col items-center">
              <Shield className="text-indigo-600 mb-2" size={32} />
              <p className="font-semibold">Secure Pay</p>
              <p className="text-sm text-gray-600">SSL encrypted</p>
            </div>
            <div className="flex flex-col items-center">
              <ShoppingBag className="text-indigo-600 mb-2" size={32} />
              <p className="font-semibold">24/7 Support</p>
              <p className="text-sm text-gray-600">We got you</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 lg:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Featured Products
            </h2>
            <p className="text-gray-600 mt-2">Hand-picked just for you</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-10">
            <a
              href="/shop"
              className="inline-flex items-center text-indigo-600 font-bold hover:text-indigo-700"
            >
              View All Products <ChevronRight className="ml-1" />
            </a>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-12 text-center">
          <h2 className="text-3xl font-bold mb-4">New Here?</h2>
          <p className="text-xl mb-6">Get 15% OFF your first order!</p>
          <a
            href="/signup"
            className="bg-white text-indigo-600 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition"
          >
            Sign Up Now
          </a>
        </div>
      </section>
    </>
  );
}
