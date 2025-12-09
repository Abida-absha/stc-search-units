import { useState, useMemo, useCallback } from 'react';
import { mockUnits } from '../data/mockUnits';

// Simple Levenshtein distance for fuzzy matching
const levenshteinDistance = (str1, str2) => {
  const matrix = [];

  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }

  return matrix[str2.length][str1.length];
};

export const useSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    tiers: [],
    categories: [],
    suppliers: [],
    priceRange: [0, 50000],
    freshness: []
  });
  const [sortBy, setSortBy] = useState('relevance');

  // Search and filter logic
  const searchResults = useMemo(() => {
    let results = [...mockUnits];

    // Apply search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      const tokens = query.split(' ');

      results = results.map(unit => {
        let score = 0;
        const name = unit.name.toLowerCase();
        const description = unit.description.toLowerCase();
        const tags = unit.tags.map(t => t.toLowerCase());
        const materials = unit.materials.map(m => m.name.toLowerCase());

        // Exact match in name
        if (name === query) score += 10;

        // Partial match in name
        if (name.includes(query)) score += 5;

        // Check each token
        tokens.forEach(token => {
          // Match in name
          if (name.includes(token)) score += 3;

          // Match in description
          if (description.includes(token)) score += 2;

          // Match in tags
          if (tags.some(tag => tag.includes(token))) score += 4;

          // Match in materials
          if (materials.some(mat => mat.includes(token))) score += 2;

          // Fuzzy matching (allow 1-2 character difference)
          const nameParts = name.split(' ');
          nameParts.forEach(part => {
            if (part.length > 3 && token.length > 3) {
              const distance = levenshteinDistance(part, token);
              if (distance <= 2) score += 2;
            }
          });
        });

        return { ...unit, searchScore: score };
      }).filter(unit => unit.searchScore > 0);
    }

    // Apply tier filter
    if (filters.tiers.length > 0) {
      results = results.filter(unit => filters.tiers.includes(unit.tier));
    }

    // Apply category filter
    if (filters.categories.length > 0) {
      results = results.filter(unit => filters.categories.includes(unit.category));
    }

    // Apply supplier filter
    if (filters.suppliers.length > 0) {
      results = results.filter(unit => {
        const unitSuppliers = unit.materials.map(m => m.supplier.name);
        return filters.suppliers.some(supplier => unitSuppliers.includes(supplier));
      });
    }

    // Apply price range filter
    const [minPrice, maxPrice] = filters.priceRange;
    results = results.filter(unit => {
      return unit.pricing.totalCost >= minPrice && unit.pricing.totalCost <= maxPrice;
    });

    // Apply freshness filter
    if (filters.freshness.length > 0) {
      results = results.filter(unit => filters.freshness.includes(unit.freshness));
    }

    // Sort results
    switch (sortBy) {
      case 'relevance':
        if (searchQuery.trim()) {
          results.sort((a, b) => (b.searchScore || 0) - (a.searchScore || 0));
        } else {
          // Default sort by usage when no search query
          results.sort((a, b) => b.usageStats.timesUsed - a.usageStats.timesUsed);
        }
        break;
      case 'price-asc':
        results.sort((a, b) => a.pricing.totalCost - b.pricing.totalCost);
        break;
      case 'price-desc':
        results.sort((a, b) => b.pricing.totalCost - a.pricing.totalCost);
        break;
      case 'name':
        results.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'most-used':
        results.sort((a, b) => b.usageStats.timesUsed - a.usageStats.timesUsed);
        break;
      default:
        break;
    }

    return results;
  }, [searchQuery, filters, sortBy]);

  const updateFilter = useCallback((filterKey, value) => {
    setFilters(prev => ({
      ...prev,
      [filterKey]: value
    }));
  }, []);

  const toggleFilterValue = useCallback((filterKey, value) => {
    setFilters(prev => {
      const currentValues = prev[filterKey];
      if (currentValues.includes(value)) {
        return {
          ...prev,
          [filterKey]: currentValues.filter(v => v !== value)
        };
      } else {
        return {
          ...prev,
          [filterKey]: [...currentValues, value]
        };
      }
    });
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({
      tiers: [],
      categories: [],
      suppliers: [],
      priceRange: [0, 50000],
      freshness: []
    });
  }, []);

  const clearSearch = useCallback(() => {
    setSearchQuery('');
  }, []);

  const hasActiveFilters = useMemo(() => {
    return (
      filters.tiers.length > 0 ||
      filters.categories.length > 0 ||
      filters.suppliers.length > 0 ||
      filters.priceRange[0] !== 0 ||
      filters.priceRange[1] !== 50000 ||
      filters.freshness.length > 0
    );
  }, [filters]);

  return {
    searchQuery,
    setSearchQuery,
    filters,
    updateFilter,
    toggleFilterValue,
    clearFilters,
    clearSearch,
    searchResults,
    sortBy,
    setSortBy,
    hasActiveFilters,
    resultCount: searchResults.length
  };
};
