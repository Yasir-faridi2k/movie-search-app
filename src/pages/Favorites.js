import React from 'react';
import { useFavorites } from '../context/FavoritesContext';
import MovieCard from '../components/MovieCard';

function Favorites() {
  const { favorites } = useFavorites();

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Your Favorites ❤️</h1>

      {favorites.length === 0 ? (
        <p style={styles.empty}>No favorites yet. Go search for some movies!</p>
      ) : (
        <div style={styles.grid}>
          {favorites.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#0f3460',
    padding: '24px',
  },
  heading: {
    textAlign: 'center',
    color: 'white',
    fontSize: '28px',
    marginBottom: '24px',
  },
  empty: {
    textAlign: 'center',
    color: '#aaa',
    fontSize: '16px',
    marginTop: '60px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
    gap: '20px',
  },
};

export default Favorites;
