// src/hooks/useMovieSearch.js - Custom hook to fetch movies from OMDB API

import { useState, useEffect } from 'react';

const API_KEY = '4b3d5611'; 

function useMovieSearch(query) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query || query.trim() === '') {
      setMovies([]);
      return;
    }

    const fetchMovies = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(
          `https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`
        );
        const data = await res.json();

        if (data.Response === 'True') {
          setMovies(data.Search);
        } else {
          setMovies([]);
          setError(data.Error);
        }
      } catch (err) {
        setError('Something went wrong. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [query]);

  return { movies, loading, error };
}

export default useMovieSearch;