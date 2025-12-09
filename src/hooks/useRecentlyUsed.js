import { useState, useEffect } from 'react';

const STORAGE_KEY = 'vvs-recently-used';
const MAX_ITEMS = 10;
const MAX_AGE_DAYS = 30;

export const useRecentlyUsed = () => {
  const [recentlyUsed, setRecentlyUsed] = useState([]);

  // Load recently used from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        // Filter out old entries (> 30 days)
        const now = new Date();
        const filtered = (parsed.items || []).filter(item => {
          const itemDate = new Date(item.timestamp);
          const diffDays = (now - itemDate) / (1000 * 60 * 60 * 24);
          return diffDays <= MAX_AGE_DAYS;
        });
        setRecentlyUsed(filtered);
      } catch (error) {
        console.error('Error loading recently used:', error);
        setRecentlyUsed([]);
      }
    }
  }, []);

  // Save recently used to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ items: recentlyUsed }));
  }, [recentlyUsed]);

  const addRecentlyUsed = (unitId, action = 'added_to_estimate') => {
    setRecentlyUsed(prev => {
      // Remove existing entry if present
      const filtered = prev.filter(item => item.unitId !== unitId);

      // Add new entry at the beginning
      const newEntry = {
        unitId,
        timestamp: new Date().toISOString(),
        action
      };

      // Keep only MAX_ITEMS
      const updated = [newEntry, ...filtered].slice(0, MAX_ITEMS);

      return updated;
    });
  };

  const getRecentUnits = () => {
    // Return just the unit IDs in chronological order (newest first)
    return recentlyUsed.map(item => item.unitId);
  };

  const clearRecentlyUsed = () => {
    setRecentlyUsed([]);
  };

  return {
    recentlyUsed,
    addRecentlyUsed,
    getRecentUnits,
    clearRecentlyUsed
  };
};
