import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div className=" rounded-sm shadow-md overflow-hidden max-w-sm mx-auto border border-gray-200">
      <div className="relative">
        <img
          src={product.image}
          alt="Brown Chair Design"
          className="w-[300px] h-64 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {product.title}
        </h3>
        <div className="flex justify-between">
          <p className="text-1xl font-bold text-gray-800 mb-4">
            {product.price}
          </p>
          <button className=" text-[#2ec1e6] font-semibold">BUY NOW</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
