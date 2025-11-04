import React from "react";

const BlogCard = () => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-md mx-auto border border-gray-200">
      <div className="relative h-48 sm:h-56">
        <img
          src="b1.jpg"
          alt="Blog illustration"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-xl font-semibold text-white mb-2">
            Look even slightly believable.
          </h3>
          <p className="text-sm text-gray-200 leading-relaxed">
            If you are going to inject humour, or randomised words which don't
            look even slightly believable.
          </p>
        </div>
      </div>
      <div className="p-6">
        <button className="w-full bg-blue-100 hover:bg-blue-200 text-blue-800 font-semibold py-3 px-4 rounded-lg transition duration-300 text-center">
          Read more
        </button>
      </div>
    </div>
  );
};

export default BlogCard;
