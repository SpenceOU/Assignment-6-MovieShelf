import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { searchMovies } from '../services/movieService';

function Header({ setSearchResults, setSearchQuery }) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const runSearch = async (text) => {
    const trimmed = text.trim();

    // Empty search box = go back to showing popular movies
    if (!trimmed) {
      setSearchResults(null);
      setSearchQuery('');
      return;
    }

    setSearchQuery(trimmed);
    try {
      const results = await searchMovies(trimmed);
      setSearchResults(results);
    } catch (err) {
      console.error(err);
      setSearchResults([]);
    }
    navigate('/'); // show results on the Home page
  };

  // Search as the user types, waiting 500ms after they stop typing
  useEffect(() => {
    const timer = setTimeout(() => runSearch(query), 500);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  // Search right away when they press Enter or click Search
  const handleSubmit = (e) => {
    e.preventDefault();
    runSearch(query);
  };

  const clearSearch = () => {
    setQuery('');
    setSearchResults(null);
    setSearchQuery('');
  };

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="app-title" onClick={clearSearch}>MovieShelf</Link>
        <nav className="nav-links">
          <Link to="/" className="nav-link" onClick={clearSearch}>Home</Link>
          <Link to="/favorites" className="nav-link">Favorites</Link>
        </nav>
        <form className="search-container" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search movies..."
            className="search-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" className="search-button">Search</button>
        </form>
      </div>
    </header>
  );
};

export default Header;
