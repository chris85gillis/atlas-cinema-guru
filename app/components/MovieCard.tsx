// app/components/MovieCard.tsx
"use client"; // Required for client-side interactivity

import React, { useState } from 'react';

interface MovieCardProps {
  title: string;
  year: number;
  description: string;
  genre: string;
  isFavorite: boolean;
  inWatchLater: boolean;
  onToggleFavorite: () => void;
  onToggleWatchLater: () => void;
  imageUrl: string;
}

const MovieCard: React.FC<MovieCardProps> = ({
  title,
  year,
  description,
  genre,
  isFavorite,
  inWatchLater,
  onToggleFavorite,
  onToggleWatchLater,
  imageUrl,
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="movie-card relative overflow-hidden rounded-lg shadow-lg transition transform hover:scale-105 h-80 w-full"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Display the image */}
      <img src={imageUrl} alt={title} className="w-full h-full object-cover" />

      {/* Overlay with movie details */}
      {hovered && (
        <div className="info-overlay absolute inset-0 bg-blue-900 bg-opacity-80 text-white p-4 flex flex-col justify-end">
          <h3 className="text-lg font-semibold">{title} ({year})</h3>
          <p className="text-sm mt-1">{description}</p>
          <span className="mt-2 text-teal-300">{genre}</span>
        </div>
      )}

      {/* Favorite and Watch Later buttons */}
      <div className="absolute top-2 right-2 flex space-x-2">
        <button onClick={onToggleFavorite} className="text-white">
          {isFavorite ? '⭐' : '☆'}
        </button>
        <button onClick={onToggleWatchLater} className="text-white">
          {inWatchLater ? '⏰' : '🕒'}
        </button>
      </div>
    </div>
  );
};

export default MovieCard;