import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';

function MovieCard({ movie }) {
  const navigate = useNavigate();
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  const favorited = isFavorite(movie.imdbID);

  const handleFavorite = (e) => {
    e.stopPropagation(); // prevent navigating when clicking heart
    if (favorited) {
      removeFavorite(movie.imdbID);
    } else {
      addFavorite(movie);
    }
  };

  return (
    <div style={styles.card} onClick={() => navigate(`/movie/${movie.imdbID}`)}>
      <img
        src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/200x300?text=No+Image'}
        alt={movie.Title}
        style={styles.poster}
      />
      <div style={styles.info}>
        <h3 style={styles.title}>{movie.Title}</h3>
        <p style={styles.year}>{movie.Year}</p>
        <button onClick={handleFavorite} style={styles.heartBtn}>
          {favorited ? '❤️ Saved' : '🤍 Save'}
        </button>
      </div>
    </div>
  );
}

const styles = {
  card: {
    backgroundColor: '#16213e',
    borderRadius: '10px',
    overflow: 'hidden',
    cursor: 'pointer',
    transition: 'transform 0.2s',
    color: 'white',
  },
  poster: {
    width: '100%',
    height: '280px',
    objectFit: 'cover',
  },
  info: {
    padding: '12px',
  },
  title: {
    fontSize: '15px',
    margin: '0 0 6px 0',
  },
  year: {
    fontSize: '13px',
    color: '#aaa',
    margin: '0 0 10px 0',
  },
  heartBtn: {
    backgroundColor: 'transparent',
    border: '1px solid #aaa',
    color: 'white',
    padding: '6px 12px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '13px',
  },
};

export default MovieCard;