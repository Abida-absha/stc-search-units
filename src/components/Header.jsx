import { Bell, Search } from 'lucide-react';
import { useState } from 'react';

const Header = ({ isSidebarCollapsed }) => {
  const [notificationCount] = useState(3);

  return (
    <header className={`bg-white border-b border-gray-200 h-16 fixed top-0 right-0 z-40 flex items-center px-6 transition-all duration-300 ${isSidebarCollapsed ? 'left-16' : 'left-64'}`}>
      <div className="flex items-center justify-between w-full">
        {/* Left side - Search or Title */}
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
        </div>

        {/* Right side - Notifications and User Profile */}
        <div className="flex items-center gap-4">
          {/* Search Icon */}
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" aria-label="Search">
            <Search className="w-5 h-5 text-gray-600" />
          </button>

          {/* Notifications */}
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative" aria-label="Notifications">
            <Bell className="w-5 h-5 text-gray-600" />
            {notificationCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            )}
          </button>

          {/* User Profile */}
          <div className="flex items-center gap-3 pl-3 border-l border-gray-200">
            <div className="text-right">
              <div className="text-sm font-semibold text-gray-900">John</div>
              <div className="text-xs text-gray-500">Estimator</div>
            </div>
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold cursor-pointer hover:ring-2 hover:ring-primary hover:ring-offset-2 transition-all">
              JO
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
