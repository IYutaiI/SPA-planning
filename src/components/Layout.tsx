import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Bell } from 'lucide-react';

export const Layout = () => {
  return (
    <div className="flex min-h-screen w-full bg-dark-900">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <header className="h-14 border-b border-dark-600 flex items-center justify-end px-6">
          <button className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
            <Bell size={18} />
            <span className="text-sm">Notifications</span>
          </button>
        </header>
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
