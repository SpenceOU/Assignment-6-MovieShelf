// favoritesService.js - saves and loads favorite movies with localStorage
const STORAGE_KEY = 'favorites';

export const getFavorites = () => {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : [];
};

export const isFavorite = (movieId) => {
  return getFavorites().some(movie => movie.id === movieId);
};

export const addFavorite = (movie) => {
  const favorites = getFavorites();
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...favorites, movie]));
};

export const removeFavorite = (movieId) => {
  const favorites = getFavorites().filter(movie => movie.id !== movieId);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
};
