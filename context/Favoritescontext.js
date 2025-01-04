import React, { createContext, useContext, useState } from 'react';

// Create a context for favorites
const FavoritesContext = createContext();

// Provider component to wrap around the app
export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  // Function to add a repository to favorites
  const addFavorite = (repo) => {
    setFavorites((prevFavorites) => {
      // Prevent adding duplicates
      if (!prevFavorites.some((item) => item.id === repo.id)) {
        return [...prevFavorites, repo];
      }
      return prevFavorites;
    });
  };

  // Function to remove a repository from favorites
  const removeFavorite = (repoId) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((item) => item.id !== repoId)
    );
  };

  // Check if a repository is already in favorites
  const isFavorite = (repoId) => {
    return favorites.some((item) => item.id === repoId);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

// Custom hook to use the FavoritesContext
export const useFavorites = () => useContext(FavoritesContext);
