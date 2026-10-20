import { useState } from 'react';
import { isFavorite, addFavorite, removeFavorite } from '../services/favoritesService';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
const PLACEHOLDER = 'https://placehold.co/300x450/667eea/ffffff?text=No+Poster';

function MovieCard({ movie, onFavoriteChange }) {
  // Check localStorage once so the button shows the right state on load
  const [favorited, setFavorited] = useState(() => isFavorite(movie.id));

  const handleFavoriteClick = () => {
    if (favorited) {
      removeFavorite(movie.id);
    } else {
      addFavorite(movie);
    }
    setFavorited(!favorited);

    // Lets the Favorites page refresh its list when a movie is removed
    if (onFavoriteChange) {
      onFavoriteChange();
    }
  };

  // Some movies have no poster or release date, so fall back safely
  const posterUrl = movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : PLACEHOLDER;
  const year = movie.release_date ? movie.release_date.substring(0, 4) : 'N/A';
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A';

  return (
    <div className="movie-card">
      <div className="movie-poster">
        <img src={posterUrl} alt={movie.title} />
      </div>
      <div className="movie-info">
        <h3 className="movie-title">{movie.title}</h3>
        <div className="movie-details">
          <span className="movie-rating">⭐ {rating}</span>
          <span className="movie-year">{year}</span>
        </div>
        <button
          className={`favorite-button ${favorited ? 'favorited' : ''}`}
          onClick={handleFavoriteClick}
        >
          {favorited ? '♥ Remove from Favorites' : '♡ Add to Favorites'}
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
