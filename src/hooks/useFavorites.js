import { useState, useEffect } from 'react';

const STORAGE_KEY = 'vvs-favorites';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState([]);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setFavorites(parsed.unitIds || []);
      } catch (error) {
        console.error('Error loading favorites:', error);
        setFavorites([]);
      }
    }
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ unitIds: favorites }));
  }, [favorites]);

  const toggleFavorite = (unitId) => {
    setFavorites(prev => {
      if (prev.includes(unitId)) {
        return prev.filter(id => id !== unitId);
      } else {
        return [...prev, unitId];
      }
    });
  };

  const isFavorite = (unitId) => {
    return favorites.includes(unitId);
  };

  const addFavorite = (unitId) => {
    if (!favorites.includes(unitId)) {
      setFavorites(prev => [...prev, unitId]);
    }
  };

  const removeFavorite = (unitId) => {
    setFavorites(prev => prev.filter(id => id !== unitId));
  };

  return {
    favorites,
    toggleFavorite,
    isFavorite,
    addFavorite,
    removeFavorite
  };
};
