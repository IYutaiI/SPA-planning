import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Bell } from 'lucide-react';

const pageTitles: Record<string, string> = {
  '/': 'Roster',
  '/planning': 'Planning',
  '/scrims': 'Scrims',
  '/compositions': 'Compositions',
  '/draft': 'Draft Simulation',
  '/statistiques': 'Statistiques',
};

export const Layout = () => {
  const location = useLocation();
  const currentPage = pageTitles[location.pathname] || 'Dashboard';

  return (
    <div className="flex min-h-screen w-full bg-dark-900">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-14 border-b border-dark-600 flex items-center justify-between px-6">
          <span className="text-white font-medium">{currentPage}</span>
          <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <span className="text-sm">Notifications</span>
          </button>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
