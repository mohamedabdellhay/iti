import React, { useEffect, useState } from "react";
import MediaCard from "./MediaCard";

export default function MediaList() {
  const [mediaList, setMediaList] = useState([
    {
      id: 1,
      title: "Inception",
      type: "movie",
      year: 2010,
      genre: "Sci-Fi",
      rating: 8.8,
    },
    {
      id: 2,
      title: "The Dark Knight",
      type: "movie",
      year: 2008,
      genre: "Action",
      rating: 9.0,
    },
    {
      id: 3,
      title: "Interstellar",
      type: "movie",
      year: 2014,
      genre: "Adventure",
      rating: 8.6,
    },
    {
      id: 4,
      title: "The Matrix",
      type: "movie",
      year: 1999,
      genre: "Sci-Fi",
      rating: 8.7,
    },
    {
      id: 5,
      title: "Fight Club",
      type: "movie",
      year: 1999,
      genre: "Drama",
      rating: 8.8,
    },
    {
      id: 6,
      title: "Pulp Fiction",
      type: "movie",
      year: 1994,
      genre: "Crime",
      rating: 8.9,
    },
    {
      id: 7,
      title: "The Shawshank Redemption",
      type: "movie",
      year: 1994,
      genre: "Drama",
      rating: 9.3,
    },
    {
      id: 8,
      title: "Forrest Gump",
      type: "movie",
      year: 1994,
      genre: "Drama",
      rating: 8.8,
    },
    {
      id: 9,
      title: "Gladiator",
      type: "movie",
      year: 2000,
      genre: "Action",
      rating: 8.5,
    },
    {
      id: 10,
      title: "The Lord of the Rings: The Return of the King",
      type: "movie",
      year: 2003,
      genre: "Fantasy",
      rating: 9.0,
    },

    {
      id: 11,
      title: "Breaking Bad",
      type: "tvshow",
      year: 2008,
      genre: "Crime",
      rating: 9.5,
    },
    {
      id: 12,
      title: "Game of Thrones",
      type: "tvshow",
      year: 2011,
      genre: "Fantasy",
      rating: 9.2,
    },
    {
      id: 13,
      title: "Stranger Things",
      type: "tvshow",
      year: 2016,
      genre: "Sci-Fi",
      rating: 8.7,
    },
    {
      id: 14,
      title: "The Office",
      type: "tvshow",
      year: 2005,
      genre: "Comedy",
      rating: 8.9,
    },
    {
      id: 15,
      title: "Friends",
      type: "tvshow",
      year: 1994,
      genre: "Comedy",
      rating: 8.9,
    },
    {
      id: 16,
      title: "The Mandalorian",
      type: "tvshow",
      year: 2019,
      genre: "Action",
      rating: 8.7,
    },
    {
      id: 17,
      title: "The Witcher",
      type: "tvshow",
      year: 2019,
      genre: "Fantasy",
      rating: 8.2,
    },
    {
      id: 18,
      title: "Better Call Saul",
      type: "tvshow",
      year: 2015,
      genre: "Crime",
      rating: 8.9,
    },
    {
      id: 19,
      title: "The Boys",
      type: "tvshow",
      year: 2019,
      genre: "Action",
      rating: 8.8,
    },
    {
      id: 20,
      title: "House of the Dragon",
      type: "tvshow",
      year: 2022,
      genre: "Fantasy",
      rating: 8.6,
    },
  ]);

  const [filtered, setFiltered] = useState([]);

  // Filter states
  const [filterType, setFilterType] = useState("all");
  const [filterGenre, setFilterGenre] = useState("all");
  const [filterYear, setFilterYear] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const genres = [...new Set(mediaList.map((media) => media.genre))];
  const years = [...new Set(mediaList.map((media) => media.year))];

  useEffect(() => {
    let results = mediaList;

    // Filter by type
    if (filterType !== "all") {
      results = results.filter((media) => media.type === filterType);
    }

    // Filter by genre
    if (filterGenre !== "all") {
      results = results.filter((media) => media.genre === filterGenre);
    }
    if (filterYear) {
      console.log("filter year");
      console.log(filterYear);

      results = results.filter((media) => media.year == Number(filterYear));
    }
    // Filter by search term
    if (searchTerm) {
      results = results.filter(
        (media) =>
          media.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          media.genre.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFiltered(results);
  }, [mediaList, filterType, filterGenre, filterYear, searchTerm]);

  const handleFilterType = (type) => {
    setFilterType(type);
  };

  const handleFilterGenre = (genre) => {
    setFilterGenre(genre);
  };
  const handleFilterYear = (year) => {
    setFilterYear(year);
  };

  const clearFilters = () => {
    setFilterType("all");
    setFilterGenre("all");
    setSearchTerm("");
  };

  return (
    <>
      <div className="container m-auto">
        {/* <Header /> */}

        <div className="mb-6 mt-3 flex flex-col sm:flex-row gap-4 items-center justify-between bg-white dark:bg-gray-800 p-4  shadow-md">
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search by title or genre..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 min-w-0 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            <select
              value={filterType}
              onChange={(e) => handleFilterType(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="all">All Types</option>
              <option value="movie">Movies</option>
              <option value="tvshow">TV Shows</option>
            </select>
            <select
              value={filterGenre}
              onChange={(e) => handleFilterGenre(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="all">All Genres</option>
              {genres.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>

            <select
              value={filterYear}
              onChange={(e) => handleFilterYear(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="all">All Years</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={clearFilters}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 dark:bg-gray-600 dark:hover:bg-gray-700"
          >
            Clear Filters
          </button>
        </div>

        <div className="mb-4 text-sm text-gray-500 dark:text-gray-400">
          Showing {filtered.length} of {mediaList.length} results
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.length > 0 ? (
            filtered.map((media) => <MediaCard key={media.id} {...media} />)
          ) : (
            <div className="col-span-full flex items-center justify-center h-48 text-gray-500 dark:text-gray-400">
              No results found. Try adjusting your filters.
            </div>
          )}
        </div>
      </div>
    </>
  );
}
