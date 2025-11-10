import { fetchProduct } from "@/app/api";
import Link from "next/link";
import Image from "next/image";

export default async function ProductDetails({ params }) {
  const { id } = await params;
  console.log("id:", id);

  const product = await fetchProduct(id);
  console.log(product);
  if (product.status != 200) return <p>loading..........</p>;
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3 text-sm">
          <Link href="/" className="text-gray-500 hover:text-indigo-600">
            Home
          </Link>
          <span className="mx-2 text-gray-400">/</span>
          <a
            href={`/category/${product.category}`}
            className="text-gray-500 hover:text-indigo-600"
          >
            {product.category}
          </a>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-900">{product.title}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg">
            <Image
              src={product.image}
              alt={product.title}
              className="w-full h-96 lg:h-[550px] object-contain object-center"
            />
            {/* <button
              onClick={() => setIsWishListed(!isWishListed)}
              className="absolute top-4 right-4 p-3 bg-white/90 backdrop-blur rounded-full shadow-md hover:shadow-lg transition"
            >
              {isWishListed ? "💖" : "🤍"}
            </button> */}
          </div>

          <div className="space-y-6">
            <span className="px-4 py-1 bg-purple-100 text-purple-700 text-xs font-bold rounded-full uppercase">
              {product.category}
            </span>

            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
              {product.title}
            </h1>

            <div className="flex items-center gap-3 text-gray-600">
              {product.rating?.rate} ({product.rating?.count} reviews)
            </div>

            <div className="flex items-baseline gap-3">
              <p className="text-4xl font-bold text-indigo-600">
                ${product.price}
              </p>
              <p className="text-lg text-gray-500 line-through">$19.99</p>
              <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-bold">
                45% OFF
              </span>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <span className="font-medium">Quantity:</span>
              {/* <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 hover:bg-gray-100 transition"
                >
                  -
                </button>
                <span className="px-6 font-semibold">{quantity || ""}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 hover:bg-gray-100 transition"
                >
                  +
                </button>
              </div> */}
            </div>

            <div className="flex gap-4">
              <button className="flex-1 bg-indigo-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 transition shadow-lg hover:shadow-xl">
                Add to Cart
              </button>
              <button className="bg-gray-900 text-white p-4 rounded-xl hover:bg-gray-800 transition">
                Buy Now
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-6 border-t text-center text-xs font-medium">
              <div>Free Shipping</div>
              <div>30-Day Returns</div>
              <div>Secure Payment</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
