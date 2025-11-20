// app/components/FavoritesPage.tsx
"use client";

import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import { mutate } from 'swr';

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const getImageUrl = (movieId: string) => `/images/${movieId}.webp`;

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await fetch(`/api/favorites?page=${currentPage}`, {
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        setFavorites(data.favorites || []);
      } catch (error) {
        console.error("Failed to fetch favorites:", error);
      }
    };

    fetchFavorites();
  }, [currentPage]);

  const handleToggleFavorite = async (id: string) => {
    try {
      const response = await fetch(`/api/favorites/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (response.ok) {
        setFavorites((prevFavorites) =>
          prevFavorites.filter((movie) => movie.id !== id)
        );
        // Refresh activities feed immediately
        mutate('/api/activities?page=1');
      } else {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Failed to remove favorite:", error);
    }
  };

  return (
    <div className="favorites-page-container min-h-screen bg-blue-900 text-white py-8 px-4">
      {/* Header */}
      <h1 className="text-4xl font-bold text-center mb-8">Favorites</h1>

      {/* Movie Grid */}
      <div className="movie-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {favorites.length > 0 ? (
          favorites.map((favorite) => (
            <MovieCard
              key={favorite.id}
              id={favorite.id}
              title={favorite.title}
              released={favorite.released}
              description={favorite.synopsis}
              genre={favorite.genre}
              isFavorite={true} // Force `isFavorite` to true
              inWatchLater={favorite.inWatchLater}
              imageUrl={getImageUrl(favorite.id)}
              onToggleFavorite={() => handleToggleFavorite(favorite.id)}
              onToggleWatchLater={() => {}} // Add if needed
            />
          ))
        ) : (
          <p className="text-center text-lg">No favorites found.</p>
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

export default FavoritesPage;