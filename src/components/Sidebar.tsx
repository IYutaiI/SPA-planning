import { NavLink } from 'react-router-dom';
import { Users, Calendar, Swords, Layers, Wand2, BarChart3, User, Sparkles, Settings, LogOut } from 'lucide-react';

const navItems = [
  { path: '/', icon: Users, label: 'Roster' },
  { path: '/planning', icon: Calendar, label: 'Planning' },
  { path: '/scrims', icon: Swords, label: 'Scrims' },
  { path: '/compositions', icon: Layers, label: 'Compositions' },
  { path: '/draft', icon: Wand2, label: 'Draft Simulation' },
  { path: '/statistiques', icon: BarChart3, label: 'Statistiques' },
];

export const Sidebar = () => {
  return (
    <aside className="w-56 glass min-h-screen flex flex-col">
      {/* Logo Section */}
      <div className="p-5 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center glow-purple">
              <Sparkles className="text-white" size={20} />
            </div>
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-dark-800"></div>
          </div>
          <div className="flex flex-col">
            <span className="gradient-text font-bold text-lg tracking-tight">NexusManager</span>
            <span className="text-gray-500 text-xs">Pro Edition</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1">
        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 py-2">
          Menu Principal
        </div>
        {navItems.map(item => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `group flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 ${
                isActive
                  ? 'nav-active bg-gradient-to-r from-purple-600/20 to-cyan-600/10 text-white'
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div className={`p-1.5 rounded-lg transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-to-br from-purple-500 to-cyan-500 text-white shadow-lg shadow-purple-500/25'
                    : 'bg-dark-600 text-gray-400 group-hover:bg-dark-500 group-hover:text-white'
                }`}>
                  <item.icon size={16} />
                </div>
                <span className="text-sm font-medium">{item.label}</span>
                {isActive && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-400 to-cyan-400 animate-pulse"></div>
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Quick Actions */}
      <div className="p-3 border-t border-white/5">
        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 py-2 mb-1">
          Raccourcis
        </div>
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-400 hover:bg-white/5 hover:text-white transition-all duration-300">
          <div className="p-1.5 rounded-lg bg-dark-600">
            <Settings size={16} />
          </div>
          <span className="text-sm font-medium">Parametres</span>
        </button>
      </div>

      {/* User Profile */}
      <div className="p-3 border-t border-white/5">
        <div className="glass-light rounded-xl p-3 hover-card cursor-pointer">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <User size={18} className="text-white" />
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-dark-700"></div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-white truncate">Coach Pro</div>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-400 to-cyan-400"></div>
                <span className="text-xs text-gray-400">Premium</span>
              </div>
            </div>
            <button className="p-1.5 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition-all">
              <LogOut size={14} />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};
