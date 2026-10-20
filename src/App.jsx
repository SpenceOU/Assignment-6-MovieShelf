import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import './App.css';

function App() {
  // Search results live here so both Header and Home can use them.
  // null means "not searching" so Home shows popular movies instead.
  const [searchResults, setSearchResults] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Router>
      <div className="app">
        <Header setSearchResults={setSearchResults} setSearchQuery={setSearchQuery} />
        <Routes>
          <Route
            path="/"
            element={<Home searchResults={searchResults} searchQuery={searchQuery} />}
          />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
