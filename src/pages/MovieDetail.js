import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import Loader from '../components/Loader';

const API_KEY = '4b3d5611'; 

function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const favorited = movie ? isFavorite(movie.imdbID) : false;

  useEffect(() => {
    const fetchMovie = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://www.omdbapi.com/?i=${id}&plot=full&apikey=${API_KEY}`
        );
        const data = await res.json();
        if (data.Response === 'True') {
          setMovie(data);
        } else {
          setError(data.Error);
        }
      } catch (err) {
        setError('Something went wrong.');
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  const handleFavorite = () => {
    if (favorited) {
      removeFavorite(movie.imdbID);
    } else {
      addFavorite(movie);
    }
  };

  if (loading) return <Loader />;
  if (error) return <p style={styles.error}>{error}</p>;

  return (
    <div style={styles.container}>
      <button onClick={() => navigate(-1)} style={styles.backBtn}>← Back</button>

      <div style={styles.content}>
        <img
          src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Image'}
          alt={movie.Title}
          style={styles.poster}
        />

        <div style={styles.details}>
          <h1 style={styles.title}>{movie.Title}</h1>
          <p style={styles.meta}>{movie.Year} • {movie.Rated} • {movie.Runtime}</p>
          <p style={styles.genre}>{movie.Genre}</p>
          <p style={styles.plot}>{movie.Plot}</p>

          <div style={styles.infoRow}>
            <span style={styles.label}>Director:</span>
            <span style={styles.value}>{movie.Director}</span>
          </div>
          <div style={styles.infoRow}>
            <span style={styles.label}>Cast:</span>
            <span style={styles.value}>{movie.Actors}</span>
          </div>
          <div style={styles.infoRow}>
            <span style={styles.label}>IMDB Rating:</span>
            <span style={styles.value}>⭐ {movie.imdbRating}</span>
          </div>

          <button onClick={handleFavorite} style={styles.favBtn}>
            {favorited ? '❤️ Remove from Favorites' : '🤍 Add to Favorites'}
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#0f3460',
    padding: '24px',
    color: 'white',
  },
  backBtn: {
    backgroundColor: 'transparent',
    border: '1px solid #aaa',
    color: 'white',
    padding: '8px 16px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    marginBottom: '24px',
  },
  content: {
    display: 'flex',
    gap: '32px',
    flexWrap: 'wrap',
  },
  poster: {
    width: '260px',
    borderRadius: '10px',
    objectFit: 'cover',
  },
  details: {
    flex: 1,
    minWidth: '260px',
  },
  title: {
    fontSize: '28px',
    margin: '0 0 8px 0',
  },
  meta: {
    color: '#aaa',
    fontSize: '14px',
    margin: '0 0 8px 0',
  },
  genre: {
    color: '#e94560',
    fontSize: '14px',
    margin: '0 0 16px 0',
  },
  plot: {
    fontSize: '15px',
    lineHeight: '1.6',
    marginBottom: '20px',
    color: '#ddd',
  },
  infoRow: {
    marginBottom: '10px',
  },
  label: {
    color: '#aaa',
    marginRight: '8px',
    fontSize: '14px',
  },
  value: {
    color: 'white',
    fontSize: '14px',
  },
  favBtn: {
    marginTop: '20px',
    padding: '10px 20px',
    backgroundColor: '#e94560',
    border: 'none',
    borderRadius: '8px',
    color: 'white',
    fontSize: '15px',
    cursor: 'pointer',
  },
  error: {
    textAlign: 'center',
    color: '#e94560',
    marginTop: '40px',
  },
};

export default MovieDetail;
