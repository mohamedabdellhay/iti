// Loader.jsx
import React from "react";

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
    </div>
  );
};

export default Loader;
