import { useState, useEffect } from 'react';
import { X, Search, ChevronDown, ChevronUp } from 'lucide-react';
import { useSearch } from '../hooks/useSearch';
import { mockUnits } from '../data/mockUnits';
import UnitCard from './UnitCard';
import FilterSection from './FilterSection';
import UnitDetailsModal from './UnitDetailsModal';

const SearchModal = ({
  isOpen,
  onClose,
  onAddUnit,
  favorites,
  toggleFavorite,
  isFavorite,
  addFavorite,
  recentUnits
}) => {
  const {
    searchQuery,
    setSearchQuery,
    filters,
    toggleFilterValue,
    clearFilters,
    clearSearch,
    searchResults,
    sortBy,
    setSortBy,
    hasActiveFilters,
    resultCount
  } = useSearch();

  const [isFilterExpanded, setIsFilterExpanded] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  // Get favorite units
  const favoriteUnits = mockUnits.filter(unit => favorites.includes(unit.id));

  // Get recently used units
  const recentlyUsedUnits = recentUnits
    .map(unitId => mockUnits.find(u => u.id === unitId))
    .filter(Boolean)
    .slice(0, 6);

  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        if (isDetailsModalOpen) {
          setIsDetailsModalOpen(false);
          setSelectedUnit(null);
        } else {
          onClose();
        }
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, isDetailsModalOpen, onClose]);

  const handleUnitClick = (unit) => {
    setSelectedUnit(unit);
    setIsDetailsModalOpen(true);
  };

  const handleAddFromDetails = (unit) => {
    onAddUnit(unit);
    setIsDetailsModalOpen(false);
    setSelectedUnit(null);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Modal Overlay */}
      <div className="modal-overlay" onClick={onClose} />

      {/* Modal Content */}
      <div className="modal-content animate-slide-in-right flex flex-col">
        {/* Fixed Header */}
        <div className="flex-shrink-0 bg-white z-10 border-b border-gray-200 p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-2">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Search Units & Components</h2>
              <p className="text-sm text-gray-600">Find and add VVS units to your estimate</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Close"
            >
              <X className="w-6 h-6 text-gray-500" />
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative mt-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for units (e.g., 'komplet toilet')"
              className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-lg"
              autoFocus
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Filters Toggle */}
          <button
            onClick={() => setIsFilterExpanded(!isFilterExpanded)}
            className="flex items-center justify-between w-full mt-4 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-700">Filters</span>
              {hasActiveFilters && (
                <span className="bg-primary text-white text-xs px-2 py-1 rounded-full">
                  Active
                </span>
              )}
            </div>
            {isFilterExpanded ? (
              <ChevronUp className="w-5 h-5 text-gray-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-400" />
            )}
          </button>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto">
          {/* Filters Section - Scrollable */}
          {isFilterExpanded && (
            <div className="px-6 pt-4 pb-4 bg-gray-50 border-b border-gray-200">
              <FilterSection
                filters={filters}
                toggleFilterValue={toggleFilterValue}
                clearFilters={clearFilters}
                hasActiveFilters={hasActiveFilters}
              />
            </div>
          )}

          {/* Main Content */}
          <div className="p-6 space-y-8">
          {/* Search Results - Show FIRST when user is searching */}
          {(searchQuery || hasActiveFilters) && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">
                  Search Results {resultCount > 0 && `(${resultCount})`}
                </h3>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="relevance">Relevance</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="name">Name (A-Z)</option>
                  <option value="most-used">Most Used</option>
                </select>
              </div>

              {searchResults.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {searchResults.map(unit => (
                    <UnitCard
                      key={unit.id}
                      unit={unit}
                      onClick={() => handleUnitClick(unit)}
                      isFavorite={isFavorite(unit.id)}
                      onToggleFavorite={toggleFavorite}
                      showUsageStats={true}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <div className="text-5xl mb-3">🔍</div>
                  <h3 className="font-semibold text-gray-700 mb-1">No results found</h3>
                  <p className="text-sm text-gray-500 mb-4">
                    Try adjusting your search or filters
                  </p>
                  {hasActiveFilters && (
                    <button
                      onClick={clearFilters}
                      className="btn-secondary"
                    >
                      Clear Filters
                    </button>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Favorites - Show when NOT searching */}
          {!searchQuery && !hasActiveFilters && favoriteUnits.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">⭐ Favorites</h3>
                <span className="text-sm text-gray-500">{favoriteUnits.length} unit(s)</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {favoriteUnits.map(unit => (
                  <UnitCard
                    key={unit.id}
                    unit={unit}
                    onClick={() => handleUnitClick(unit)}
                    isFavorite={true}
                    onToggleFavorite={toggleFavorite}
                    showUsageStats={true}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Recently Used - Show when NOT searching */}
          {!searchQuery && !hasActiveFilters && recentlyUsedUnits.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">🕐 Recently Used</h3>
                <span className="text-sm text-gray-500">Last {recentlyUsedUnits.length} unit(s)</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {recentlyUsedUnits.map(unit => (
                  <UnitCard
                    key={unit.id}
                    unit={unit}
                    onClick={() => handleUnitClick(unit)}
                    isFavorite={isFavorite(unit.id)}
                    onToggleFavorite={toggleFavorite}
                    showUsageStats={true}
                  />
                ))}
              </div>
            </div>
          )}

          {/* AI Suggestions - Show when NOT searching */}
          {!searchQuery && !hasActiveFilters && (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6">
              <div className="flex items-start gap-4">
                <div className="text-4xl">💡</div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">AI Suggestions</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Based on your bathroom project, we recommend:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-white border border-blue-200 text-blue-700 px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-blue-50">
                      → Standard Toilet Units
                    </span>
                    <span className="bg-white border border-blue-200 text-blue-700 px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-blue-50">
                      → Bathroom Sink Packages
                    </span>
                    <span className="bg-white border border-blue-200 text-blue-700 px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-blue-50">
                      → Shower Installations
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Empty State - Show only when no favorites, no recently used, and NOT searching */}
          {!searchQuery && !hasActiveFilters && favoriteUnits.length === 0 && recentlyUsedUnits.length === 0 && (
            <div className="text-center py-16 bg-gray-50 rounded-lg">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="font-semibold text-gray-900 mb-2 text-lg">Start Searching for Units</h3>
              <p className="text-sm text-gray-500 mb-4 max-w-md mx-auto">
                Use the search bar above to find VVS units and components.<br />
                Star your favorites for quick access later.
              </p>
            </div>
          )}
          </div>
        </div>
      </div>

      {/* Unit Details Modal */}
      {isDetailsModalOpen && selectedUnit && (
        <UnitDetailsModal
          unit={selectedUnit}
          isOpen={isDetailsModalOpen}
          onClose={() => {
            setIsDetailsModalOpen(false);
            setSelectedUnit(null);
          }}
          onAddToEstimate={handleAddFromDetails}
          isFavorite={isFavorite(selectedUnit.id)}
          toggleFavorite={toggleFavorite}
          addFavorite={addFavorite}
        />
      )}

      {/* Animation Styles */}
      <style>{`
        @keyframes slide-in-right {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }

        .animate-slide-in-right {
          animation: slide-in-right 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default SearchModal;
