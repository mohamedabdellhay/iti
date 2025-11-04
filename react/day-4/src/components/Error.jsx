import React from "react";

export default function Error({
  message = "An unexpected error occurred.",
  statusCode = "",
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        {statusCode && (
          <h1 className="text-6xl font-bold text-red-600 mb-4">{statusCode}</h1>
        )}
        <h2 className="text-3xl font-semibold text-gray-800 mb-2">Error!</h2>
        <p className="text-lg text-gray-600 mb-6">{message}</p>
        <button
          onClick={() => window.location.reload()} // Or navigate to home
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Reload Page
        </button>
      </div>
    </div>
  );
}
