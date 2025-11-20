// app/components/Filters.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { useDebouncedValue } from './useDebouncedValue';

interface FiltersProps {
  onSearch: (searchTerm: string) => void;
  onFilterByYear: (minYear: string, maxYear: string) => void;
  onFilterByGenres: (genres: string[]) => void;
}

const Filters: React.FC<FiltersProps> = ({ onSearch, onFilterByYear, onFilterByGenres }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [minYear, setMinYear] = useState('');
  const [maxYear, setMaxYear] = useState('');
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [genres, setGenres] = useState<string[]>([]);

  // Debounce the search term
  const debouncedSearchTerm = useDebouncedValue(searchTerm, 300);

  useEffect(() => {
    // Fetch genres from the API
    const fetchGenres = async () => {
      try {
        const response = await fetch('/api/genres');
        if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);
        const data = await response.json();
        setGenres(data.genres || []);
      } catch (error) {
        console.error("Failed to fetch genres:", error);
      }
    };
    
    fetchGenres();
  }, []);

  useEffect(() => {
    const value = debouncedSearchTerm.trim();
    onSearch(value);
  }, [debouncedSearchTerm, onSearch]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleMinYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinYear(e.target.value);
    onFilterByYear(e.target.value, maxYear);
  };

  const handleMaxYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxYear(e.target.value);
    onFilterByYear(minYear, e.target.value);
  };

  const toggleGenre = (genre: string) => {
    const updatedGenres = selectedGenres.includes(genre)
      ? selectedGenres.filter(g => g !== genre)
      : [...selectedGenres, genre];
    setSelectedGenres(updatedGenres);
    onFilterByGenres(updatedGenres);
  };

  return (
    <div className="filters p-4 flex flex-col lg:flex-row justify-between items-start bg-blue-800 rounded-lg text-white">
      {/* Left Section: Search and Year Filters */}
      <div className="flex flex-col space-y-4 w-full lg:w-1/3 lg:mr-64">
        <label className="text-lg font-semibold mb-2">Search</label>
        <input
          type="text"
          placeholder="Search Movies..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="border border-transparent rounded-full p-3 w-full text-sm bg-blue-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400"
        />
        
        <div className="flex space-x-4 mt-4">
          <div className="flex flex-col w-1/2">
            <label className="text-sm mb-1">Min Year</label>
            <input
              type="number"
              placeholder="1990"
              value={minYear}
              onChange={handleMinYearChange}
              className="border border-transparent rounded-full p-3 text-sm bg-blue-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          </div>
          <div className="flex flex-col w-1/2">
            <label className="text-sm mb-1">Max Year</label>
            <input
              type="number"
              placeholder="2024"
              value={maxYear}
              onChange={handleMaxYearChange}
              className="border border-transparent rounded-full p-3 text-sm bg-blue-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          </div>
        </div>
      </div>

      {/* Right Section: Genre Filters */}
      <div className="flex flex-col w-full lg:w-2/3 lg:pl-64 mt-6 lg:mt-0">
        <label className="text-lg font-semibold mb-2">Genres</label>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 mt-2">
          {genres.map((genre) => (
            <button
              key={genre}
              onClick={() => toggleGenre(genre)}
              className={`px-3 py-1 rounded-full text-sm border ${
                selectedGenres.includes(genre) ? 'bg-teal-400 text-white' : 'text-teal-400 border-teal-400'
              } focus:outline-none focus:ring-2 focus:ring-teal-400`}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filters;