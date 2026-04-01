// src/pages/Home.js - Main page with search bar and movie results grid

import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import MovieCard from '../components/MovieCard';
import Loader from '../components/Loader';
import useMovieSearch from '../hooks/useMovieSearch';

function Home() {
  const [query, setQuery] = useState('');
  const { movies, loading, error } = useMovieSearch(query);

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Find Your Movie 🎬</h1>
      <SearchBar query={query} setQuery={setQuery} />

      {loading && <Loader />}

      {error && <p style={styles.error}>{error}</p>}

      {!loading && !error && movies.length === 0 && query && (
        <p style={styles.noResults}>No movies found for "{query}"</p>
      )}

      {!loading && !error && movies.length === 0 && !query && (
        <p style={styles.hint}>Start typing to search for movies...</p>
      )}

      <div style={styles.grid}>
        {movies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#0f3460',
    padding: '20px',
  },
  heading: {
    textAlign: 'center',
    color: 'white',
    fontSize: '28px',
    marginBottom: '0px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
    gap: '20px',
    marginTop: '24px',
  },
  error: {
    textAlign: 'center',
    color: '#e94560',
    fontSize: '16px',
  },
  noResults: {
    textAlign: 'center',
    color: '#aaa',
    fontSize: '16px',
  },
  hint: {
    textAlign: 'center',
    color: '#aaa',
    fontSize: '16px',
    marginTop: '40px',
  },
};

export default Home;