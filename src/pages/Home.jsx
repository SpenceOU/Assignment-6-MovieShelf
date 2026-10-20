import { useState, useEffect, useCallback } from 'react';
import MovieGrid from '../components/MovieGrid';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { getPopularMovies } from '../services/movieService';

function Home({ searchResults, searchQuery }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch popular movies from TMDB
  const loadPopularMovies = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const results = await getPopularMovies();
      setMovies(results);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Run once when the page first loads
  useEffect(() => {
    loadPopularMovies();
  }, [loadPopularMovies]);

  // If there are search results, show those instead of popular movies
  if (searchResults !== null) {
    return (
      <main className="main-content">
        <div className="content-header">
          <h2>Results for "{searchQuery}"</h2>
          <p>{searchResults.length} movies found</p>
        </div>
        {searchResults.length > 0 ? (
          <MovieGrid movies={searchResults} />
        ) : (
          <div className="empty-state">
            <p>No movies found. Try a different search.</p>
          </div>
        )}
      </main>
    );
  }

  return (
    <main className="main-content">
      <div className="content-header">
        <h2>Popular Movies</h2>
        <p>Discover and save your favorite films</p>
      </div>
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <ErrorMessage message={error} onRetry={loadPopularMovies} />
      ) : (
        <MovieGrid movies={movies} />
      )}
    </main>
  );
};

export default Home;
