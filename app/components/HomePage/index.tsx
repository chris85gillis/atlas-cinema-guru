// app/components/HomePage/index.tsx
"use client";

import React, { useState, useEffect } from 'react';
import Filters from '../Filters';
import MovieCard from '../MovieCard';
import PaginationControls from '../PaginationControls';


const HomePage: React.FC = () => {
  const [movies, setMovies] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [minYear, setMinYear] = useState('');
  const [maxYear, setMaxYear] = useState('');
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  const fetchMovies = async () => {
    try {
      const queryParams = new URLSearchParams();
      if (searchTerm) queryParams.append('query', searchTerm);
      if (minYear) queryParams.append('minYear', minYear);
      if (maxYear) queryParams.append('maxYear', maxYear);
      if (selectedGenres.length > 0) queryParams.append('genres', selectedGenres.join(','));
      queryParams.append('page', currentPage.toString());

      const response = await fetch(`/api/titles?${queryParams.toString()}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Ensures cookies (for authentication) are sent with the request
      });

      if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);

      const data = await response.json();
      setMovies(data.title || []);
    } catch (error) {
      console.error("Failed to fetch movies:", error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [currentPage, searchTerm, minYear, maxYear, selectedGenres]);

  return (
    <div className="home-container flex flex-col min-h-screen bg-blue-900 text-white p-4 gap-4">
      {/* Filters and Movie Grid */}
      <Filters
        onSearch={setSearchTerm}
        onFilterByYear={(min, max) => {
          setMinYear(min);
          setMaxYear(max);
        }}
        onFilterByGenres={setSelectedGenres}
      />

      {/* Movie Grid */}
      <section className="movie-grid grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            title={movie.title}
            year={movie.year}
            description={movie.description}
            genre={movie.genre}
            isFavorite={movie.isFavorite}
            inWatchLater={movie.inWatchLater}
            imageUrl={movie.imageUrl}
          />
        ))}
      </section>

      {/* Pagination Controls */}
      <PaginationControls
        currentPage={currentPage}
        totalPages={10} // Adjust total pages based on the API response if needed
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default HomePage;