import { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import EstimateList from './components/EstimateList';
import SearchModal from './components/SearchModal';
import { useFavorites } from './hooks/useFavorites';
import { useRecentlyUsed } from './hooks/useRecentlyUsed';

function App() {
  const [activeView, setActiveView] = useState('dashboard');
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [addedUnits, setAddedUnits] = useState([]);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const { favorites, toggleFavorite, isFavorite, addFavorite } = useFavorites();
  const { addRecentlyUsed, getRecentUnits } = useRecentlyUsed();

  const handleAddUnit = (unit) => {
    setAddedUnits(prev => [...prev, { ...unit, addedId: Date.now() }]);
    addRecentlyUsed(unit.id);
    setIsSearchModalOpen(false);
  };

  const handleRemoveUnit = (addedId) => {
    setAddedUnits(prev => prev.filter(unit => unit.addedId !== addedId));
  };

  const handleNavigate = (view) => {
    setActiveView(view);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header isSidebarCollapsed={isSidebarCollapsed} />

      <Sidebar
        activeView={activeView}
        onNavigate={handleNavigate}
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
      />

      <main className={`transition-all duration-300 pt-16 ${isSidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        <EstimateList
          addedUnits={addedUnits}
          onRemoveUnit={handleRemoveUnit}
          onOpenSearch={() => setIsSearchModalOpen(true)}
        />
      </main>

      {isSearchModalOpen && (
        <SearchModal
          isOpen={isSearchModalOpen}
          onClose={() => setIsSearchModalOpen(false)}
          onAddUnit={handleAddUnit}
          favorites={favorites}
          toggleFavorite={toggleFavorite}
          isFavorite={isFavorite}
          addFavorite={addFavorite}
          recentUnits={getRecentUnits()}
        />
      )}
    </div>
  );
}

export default App;
