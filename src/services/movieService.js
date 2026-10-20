// movieService.js - all requests to the TMDB API live here
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;

// Get the current list of popular movies
export const getPopularMovies = async () => {
  if (!API_KEY) {
    throw new Error('Missing API key. Check your .env file and restart the dev server.');
  }

  const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);

  if (!response.ok) {
    throw new Error(`Could not load popular movies (error ${response.status}).`);
  }

  const data = await response.json();
  return data.results; // the array of movies
};

// Search for movies by title
export const searchMovies = async (query) => {
  if (!API_KEY) {
    throw new Error('Missing API key. Check your .env file and restart the dev server.');
  }

  // encodeURIComponent makes spaces and symbols safe to put in a URL
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
  );

  if (!response.ok) {
    throw new Error(`Could not search movies (error ${response.status}).`);
  }

  const data = await response.json();
  return data.results;
};
