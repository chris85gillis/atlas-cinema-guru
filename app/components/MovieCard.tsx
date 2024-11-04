// app/components/MovieCard.tsx
"use client";

import React, { useState } from 'react';

interface MovieCardProps {
  id: string;
  title: string;
  released: number;
  description: string;
  genre: string;
  isFavorite: boolean;
  inWatchLater: boolean;
  onToggleFavorite: (id: string, isFavorite: boolean) => void;
  onToggleWatchLater: () => void;
  imageUrl: string;
}

const MovieCard: React.FC<MovieCardProps> = ({
  id,
  title,
  released,
  description,
  genre,
  isFavorite,
  inWatchLater,
  onToggleFavorite,
  onToggleWatchLater,
  imageUrl,
}) => {
  const [hovered, setHovered] = useState(false);

  // Fallback in case the image fails to load
  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    event.currentTarget.src = '/assets/fallback-image.jpg';
  };

  return (
    <div
      className="movie-card relative overflow-hidden rounded-lg shadow-lg transition transform hover:scale-105 h-80 w-full border-2 border-teal-300 p-1"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-full object-cover rounded-md"
        onError={handleImageError}
      />

      {hovered && (
        <div className="info-overlay absolute inset-0 bg-blue-900 bg-opacity-80 text-white p-4 flex flex-col justify-end">
          <h3 className="text-lg font-semibold">{title} ({released})</h3>
          <p className="text-sm mt-1 line-clamp-2">{description}</p>
          <span className="mt-2 text-teal-300">{genre}</span>
        </div>
      )}

      <div className="absolute top-2 right-2 flex space-x-2">
        <button
          onClick={() => onToggleFavorite(id, isFavorite)}
          className="text-white"
        >
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