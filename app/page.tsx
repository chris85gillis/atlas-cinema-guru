// app/components/HomePage/index.tsx
"use client";

import React, { useState, useEffect } from 'react';
import Filters from './components/Filters';
import MovieCard from './components/MovieCard';
import PaginationControls from './components/PaginationControls';

const HomePage: React.FC = () => {
  const [movies, setMovies] = useState<any[]>([]);
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]); // Store favorite IDs here
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [minYear, setMinYear] = useState('');
  const [maxYear, setMaxYear] = useState('');
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  // Fetch favorite IDs when the component mounts
  const fetchFavoriteIds = async () => {
    try {
      const response = await fetch('/api/favorites', {
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });
      if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);
      const data = await response.json();
      setFavoriteIds(data.favorites.map((fav: any) => fav.id)); // Extract favorite IDs
    } catch (error) {
      console.error('Failed to fetch favorite IDs:', error);
    }
  };

  const fetchMovies = async () => {
    try {
      const queryParams = new URLSearchParams();
      if (searchTerm) queryParams.append('query', searchTerm);
      if (minYear) queryParams.append('minYear', minYear);
      if (maxYear) queryParams.append('maxYear', maxYear);
      if (selectedGenres.length > 0) queryParams.append('genres', selectedGenres.join(','));
      queryParams.append('page', currentPage.toString());

      const response = await fetch(`/api/titles?${queryParams.toString()}`, {
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });

      if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);

      const data = await response.json();

      // Mark movies as favorite if their ID exists in favoriteIds
      const moviesWithFavorites = data.title.map((movie: any) => ({
        ...movie,
        isFavorite: favoriteIds.includes(movie.id),
      }));

      setMovies(moviesWithFavorites);
    } catch (error) {
      console.error("Failed to fetch movies:", error);
    }
  };

  useEffect(() => {
    fetchFavoriteIds(); // Fetch favorite IDs when component mounts
  }, []);

  useEffect(() => {
    fetchMovies(); // Fetch movies when filters or pagination change
  }, [currentPage, searchTerm, minYear, maxYear, selectedGenres, favoriteIds]);

  const handleToggleFavorite = async (id: string, isCurrentlyFavorite: boolean) => {
    try {
      const method = isCurrentlyFavorite ? 'DELETE' : 'POST';
      const response = await fetch(`/api/favorites/${id}`, {
        method,
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });

      if (response.ok) {
        // Update local favoriteIds state
        setFavoriteIds((prevIds) =>
          isCurrentlyFavorite ? prevIds.filter((favId) => favId !== id) : [...prevIds, id]
        );
      } else {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Failed to update favorite:", error);
    }
  };

  return (
    <div className="home-container flex flex-col min-h-screen bg-blue-900 text-white p-4 gap-8">
      <Filters
        onSearch={setSearchTerm}
        onFilterByYear={(min, max) => {
          setMinYear(min);
          setMaxYear(max);
        }}
        onFilterByGenres={setSelectedGenres}
      />

      <section className="movie-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {movies.map((movie) => {
          const imageUrl = `/images/${movie.id}.webp`;
          return (
            <MovieCard
              key={movie.id}
              id={movie.id}
              title={movie.title}
              released={movie.released}
              description={movie.synopsis}
              genre={movie.genre}
              isFavorite={movie.isFavorite}
              inWatchLater={movie.inWatchLater}
              imageUrl={imageUrl}
              onToggleFavorite={handleToggleFavorite}
            />
          );
        })}
      </section>

      <PaginationControls
        currentPage={currentPage}
        totalPages={10}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default HomePage;