import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Bell, Search, Command, ChevronRight } from 'lucide-react';

const pageTitles: Record<string, { title: string; subtitle: string }> = {
  '/': { title: 'Roster', subtitle: 'Gerez votre effectif' },
  '/planning': { title: 'Planning', subtitle: 'Organisez vos sessions' },
  '/scrims': { title: 'Scrims', subtitle: 'Matchs d\'entrainement' },
  '/compositions': { title: 'Compositions', subtitle: 'Strategies d\'equipe' },
  '/draft': { title: 'Draft Simulation', subtitle: 'Simulez vos picks & bans' },
  '/statistiques': { title: 'Statistiques', subtitle: 'Analysez les performances' },
};

export const Layout = () => {
  const location = useLocation();
  const currentPage = pageTitles[location.pathname] || { title: 'Dashboard', subtitle: '' };

  return (
    <div className="flex min-h-screen w-full">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-16 glass-light flex items-center justify-between px-6 sticky top-0 z-40">
          {/* Breadcrumb & Title */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-500">Dashboard</span>
              <ChevronRight size={14} className="text-gray-600" />
              <span className="text-white font-medium">{currentPage.title}</span>
            </div>
          </div>

          {/* Search & Actions */}
          <div className="flex items-center gap-4">
            {/* Search Bar */}
            <div className="relative group">
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl input-modern w-64 group-hover:border-purple-500/30 transition-all">
                <Search size={16} className="text-gray-500" />
                <input
                  type="text"
                  placeholder="Rechercher..."
                  className="bg-transparent border-none outline-none text-sm text-white placeholder-gray-500 w-full"
                />
                <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-dark-600 text-gray-500">
                  <Command size={10} />
                  <span className="text-xs">K</span>
                </div>
              </div>
            </div>

            {/* Notifications */}
            <button className="relative p-2.5 rounded-xl glass-light hover:bg-white/10 transition-all group">
              <Bell size={18} className="text-gray-400 group-hover:text-white transition-colors" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></span>
            </button>

            {/* Status Indicator */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-xs text-green-400 font-medium">En ligne</span>
            </div>
          </div>
        </header>

        {/* Page Header */}
        <div className="px-6 pt-6 pb-2">
          <div className="flex items-end justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">{currentPage.title}</h1>
              <p className="text-gray-500 text-sm mt-1">{currentPage.subtitle}</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>

        {/* Footer */}
        <footer className="px-6 py-3 border-t border-white/5">
          <div className="flex items-center justify-between text-xs text-gray-600">
            <span>NexusManager v2.0</span>
            <div className="flex items-center gap-4">
              <span>Build #2024.01</span>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                <span>Tous les systemes operationnels</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};
