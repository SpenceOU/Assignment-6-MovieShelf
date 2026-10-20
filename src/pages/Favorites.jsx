import { useState, useEffect } from 'react';
import MovieGrid from '../components/MovieGrid';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { getFavorites } from '../services/favoritesService';

function Favorites() {
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load saved movies from localStorage
  const loadFavorites = () => {
    try {
      setFavoriteMovies(getFavorites());
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Could not load your saved movies.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  return (
    <main className="main-content">
      <div className="content-header">
        <h2>My Favorites</h2>
        <p>Your saved movies collection</p>
      </div>
      {loading ? (
        <LoadingSpinner message="Loading favorites..." />
      ) : error ? (
        <ErrorMessage message={error} onRetry={loadFavorites} />
      ) : favoriteMovies.length > 0 ? (
        // onFavoriteChange reloads the list when a movie is removed
        <MovieGrid movies={favoriteMovies} onFavoriteChange={loadFavorites} />
      ) : (
        <div className="empty-state">
          <p>No favorite movies yet. Start adding some from the home page!</p>
        </div>
      )}
    </main>
  );
};

export default Favorites;
