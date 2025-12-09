import { LayoutDashboard, BookOpen, ChevronDown, ChevronRight, Settings, Star, Clock, Folder, Menu, X } from 'lucide-react';
import { useState } from 'react';

const Sidebar = ({ activeView, onNavigate, isCollapsed, setIsCollapsed }) => {
  const [isUnitLibraryOpen, setIsUnitLibraryOpen] = useState(true);

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      onClick: () => onNavigate('dashboard')
    },
    {
      id: 'unit-library',
      label: 'Unit Library',
      icon: BookOpen,
      hasSubmenu: true,
      submenu: [
        {
          id: 'custom-units',
          label: 'Custom Units',
          icon: Settings,
          onClick: () => onNavigate('custom-units')
        },
        {
          id: 'favorites',
          label: 'Favorites',
          icon: Star,
          onClick: () => onNavigate('favorites')
        },
        {
          id: 'recently-used',
          label: 'Recently Used',
          icon: Clock,
          onClick: () => onNavigate('recently-used')
        },
        {
          id: 'all-units',
          label: 'All Units',
          icon: Folder,
          onClick: () => onNavigate('all-units')
        }
      ]
    }
  ];

  return (
    <aside className={`${isCollapsed ? 'w-16' : 'w-64'} bg-white border-r border-gray-200 flex flex-col fixed left-0 top-0 bottom-0 transition-all duration-300`}>
      {/* Logo and Toggle */}
      <div className="p-6 border-b border-gray-200 flex items-center justify-between">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <span className="bg-red-600 text-white px-3 py-1 rounded text-sm font-bold">EG</span>
            <span className="border-l border-gray-300 pl-2 text-gray-700 font-semibold">STC</span>
          </div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? <Menu className="w-5 h-5 text-gray-600" /> : <X className="w-5 h-5 text-gray-600" />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.id}>
              {item.hasSubmenu ? (
                <>
                  <button
                    onClick={() => setIsUnitLibraryOpen(!isUnitLibraryOpen)}
                    className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors ${
                      activeView.startsWith('unit-library') ||
                      ['custom-units', 'favorites', 'recently-used', 'all-units'].includes(activeView)
                        ? 'bg-gray-100 text-primary font-medium'
                        : 'text-gray-700'
                    }`}
                    title={isCollapsed ? item.label : ''}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="w-5 h-5" />
                      {!isCollapsed && <span>{item.label}</span>}
                    </div>
                    {!isCollapsed && (
                      isUnitLibraryOpen ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )
                    )}
                  </button>
                  {isUnitLibraryOpen && !isCollapsed && (
                    <ul className="ml-4 mt-2 space-y-1">
                      {item.submenu.map((subitem) => (
                        <li key={subitem.id}>
                          <button
                            onClick={subitem.onClick}
                            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors ${
                              activeView === subitem.id
                                ? 'bg-primary/10 text-primary font-medium'
                                : 'text-gray-600'
                            }`}
                          >
                            <subitem.icon className="w-4 h-4" />
                            <span className="text-sm">{subitem.label}</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <button
                  onClick={item.onClick}
                  className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors ${
                    activeView === item.id
                      ? 'bg-primary/10 text-primary font-medium'
                      : 'text-gray-700'
                  }`}
                  title={isCollapsed ? item.label : ''}
                >
                  <item.icon className="w-5 h-5" />
                  {!isCollapsed && <span>{item.label}</span>}
                </button>
              )}
            </li>
          ))}
        </ul>
      </nav>

    </aside>
  );
};

export default Sidebar;
