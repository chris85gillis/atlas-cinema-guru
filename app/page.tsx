// app/components/HomePage/index.tsx
"use client";

import React, { useState, useEffect } from 'react';
import Filters from './components/Filters';
import MovieCard from './components/MovieCard';
import PaginationControls from './components/PaginationControls';

const HomePage: React.FC = () => {
  const [movies, setMovies] = useState<any[]>([]);
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [watchLaterIds, setWatchLaterIds] = useState<string[]>([]); // New state for Watch Later IDs
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [minYear, setMinYear] = useState('');
  const [maxYear, setMaxYear] = useState('');
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  const fetchFavoriteIds = async () => {
    try {
      const response = await fetch('/api/favorites', {
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });

      const data = await response.json();
      setFavoriteIds(data.favorites.map((fav: any) => fav.id));
    } catch (error) {
      console.error('Failed to fetch favorite IDs:', error);
    }
  };

  const fetchWatchLaterIds = async () => {
    try {
      const response = await fetch('/api/watch-later', {
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });
      if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);
      const data = await response.json();
      setWatchLaterIds(data.watchLater.map((movie: any) => movie.id));
    } catch (error) {
      console.error('Failed to fetch watch later IDs:', error);
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
      const moviesWithState = data.title.map((movie: any) => ({
        ...movie,
        isFavorite: favoriteIds.includes(movie.id),
        inWatchLater: watchLaterIds.includes(movie.id),
      }));

      setMovies(moviesWithState);
    } catch (error) {
      console.error("Failed to fetch movies:", error);
    }
  };

  useEffect(() => {
    fetchFavoriteIds();
    fetchWatchLaterIds();
  }, []);

  useEffect(() => {
    fetchMovies();
  }, [currentPage, searchTerm, minYear, maxYear, selectedGenres, favoriteIds, watchLaterIds]);

  const handleToggleFavorite = async (id: string, isCurrentlyFavorite: boolean) => {
    try {
      const method = isCurrentlyFavorite ? 'DELETE' : 'POST';
      const response = await fetch(`/api/favorites/${id}`, {
        method,
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });

      if (response.ok) {
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

  const handleToggleWatchLater = async (id: string) => {
    const isCurrentlyInWatchLater = watchLaterIds.includes(id);
    try {
      const method = isCurrentlyInWatchLater ? 'DELETE' : 'POST';
      const response = await fetch(`/api/watch-later/${id}`, {
        method,
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });

      if (response.ok) {
        setWatchLaterIds((prevIds) =>
          isCurrentlyInWatchLater ? prevIds.filter((watchId) => watchId !== id) : [...prevIds, id]
        );
      } else {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Failed to update watch later:", error);
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
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            released={movie.released}
            description={movie.synopsis}
            genre={movie.genre}
            isFavorite={movie.isFavorite}
            inWatchLater={movie.inWatchLater}
            imageUrl={`/images/${movie.id}.webp`}
            onToggleFavorite={() => handleToggleFavorite(movie.id, movie.isFavorite)}
            onToggleWatchLater={() => handleToggleWatchLater(movie.id)}
          />
        ))}
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