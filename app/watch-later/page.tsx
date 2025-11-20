// app/components/WatchLaterPage.tsx
"use client";

import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import { mutate } from 'swr';

const WatchLaterPage = () => {
  const [watchLaterMovies, setWatchLaterMovies] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const getImageUrl = (movieId: string) => `/images/${movieId}.webp`;

  useEffect(() => {
    const fetchWatchLaterMovies = async () => {
      try {
        const response = await fetch(`/api/watch-later?page=${currentPage}`, {
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        setWatchLaterMovies(data.watchLater || []);
      } catch (error) {
        console.error("Failed to fetch watch later movies:", error);
      }
    };

    fetchWatchLaterMovies();
  }, [currentPage]);

  const handleToggleWatchLater = async (id: string) => {
    try {
      const response = await fetch(`/api/watch-later/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (response.ok) {
        setWatchLaterMovies((prevMovies) =>
          prevMovies.filter((movie) => movie.id !== id)
        );
        // Refresh activities feed immediately
        mutate('/api/activities?page=1');
      } else {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Failed to remove from watch later:", error);
    }
  };

  return (
    <div className="watch-later-page-container min-h-screen bg-blue-900 text-white py-8 px-4">
      {/* Header */}
      <h1 className="text-4xl font-bold text-center mb-8">Watch Later</h1>

      {/* Movie Grid */}
      <div className="movie-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {watchLaterMovies.length > 0 ? (
          watchLaterMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              title={movie.title}
              released={movie.released}
              description={movie.synopsis}
              genre={movie.genre}
              isFavorite={movie.isFavorite}
              inWatchLater={true} // Force `inWatchLater` to true
              imageUrl={getImageUrl(movie.id)}
              onToggleFavorite={() => {}} // Add if needed for favorites toggle
              onToggleWatchLater={() => handleToggleWatchLater(movie.id)}
            />
          ))
        ) : (
          <p className="text-center text-lg">No movies in Watch Later list.</p>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="pagination-controls flex justify-center mt-8 space-x-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          className="bg-teal-500 text-white py-2 px-6 rounded-full hover:bg-teal-400 transition"
        >
          Previous
        </button>
        <button
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className="bg-teal-500 text-white py-2 px-6 rounded-full hover:bg-teal-400 transition"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default WatchLaterPage;