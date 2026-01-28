import { NavLink } from 'react-router-dom';
import { Users, Calendar, Swords, Layers, Wand2, BarChart3, User } from 'lucide-react';

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
    <aside className="w-44 bg-dark-800 min-h-screen flex flex-col">
      {/* Logo */}
      <div className="p-4 flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center">
          <span className="text-white font-bold text-sm">N</span>
        </div>
        <span className="text-purple-400 font-semibold">NexusManager</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-2">
        {navItems.map(item => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 transition-colors ${
                isActive
                  ? 'bg-purple-600/20 text-white'
                  : 'text-gray-400 hover:bg-dark-700 hover:text-white'
              }`
            }
          >
            <item.icon size={18} />
            <span className="text-sm">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* User Profile */}
      <div className="p-3 border-t border-dark-600">
        <div className="flex items-center gap-3 px-2 py-2">
          <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white text-sm font-medium">
            C
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-white">Coach Pro</span>
            <span className="text-xs text-gray-500">Premium Account</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
