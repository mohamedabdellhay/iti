import React from "react";

const MediaCard = ({ id, title, type, year, genre, rating }) => {
  return (
    <div className="max-w-sm bg-white rounded-lg shadow-md overflow-hidden">
      {/* Placeholder image; replace with actual poster URL */}
      <div className="h-64 bg-gray-200 flex items-center justify-center">
        <span className="text-gray-500 text-sm">Movie Poster</span>
      </div>

      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-2">{title}</h2>
        <p className="text-sm text-gray-600 mb-1">
          <span className="font-medium">Type:</span> {type}
        </p>
        <p className="text-sm text-gray-600 mb-1">
          <span className="font-medium">Year:</span> {year}
        </p>
        <p className="text-sm text-gray-600 mb-3">
          <span className="font-medium">Genre:</span> {genre}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-900">
            Rating: {rating}
          </span>
          <div className="flex space-x-1">
            {/* Simple star icons; you can use Heroicons or similar */}
            <svg
              className="w-4 h-4 text-yellow-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <svg
              className="w-4 h-4 text-yellow-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            {/* Add more stars as needed based on rating */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaCard;

// Usage example:
// <MovieCard id={1} title="Inception" type="movie" year={2010} genre="Sci-Fi" rating={8.8} />
