import React, { createContext, useContext, useState, useEffect } from 'react';

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (movie) => {
    setFavorites(prev => [...prev, movie]);
  };

  const removeFavorite = (id) => {
    setFavorites(prev => prev.filter(movie => movie.imdbID !== id));
  };

  const isFavorite = (id) => {
    return favorites.some(movie => movie.imdbID === id);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoritesContext);
}
//What this does:

//Stores favorites in localStorage so they persist on page refresh
//addFavorite — saves a movie
//removeFavorite — removes by imdbID
//isFavorite — checks if a movie is already saved
//useFavorites — custom hook so any component can access this easily
