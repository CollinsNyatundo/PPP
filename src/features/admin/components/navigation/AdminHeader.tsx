import React from 'react';
import { useAuthStore } from '../../stores/authStore';
import { Bell, Settings } from 'lucide-react';

interface AdminHeaderProps {
  isCollapsed: boolean;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({ isCollapsed }) => {
  const { user } = useAuthStore();

  return (
    <header className={`fixed top-0 right-0 transition-all duration-300 ${
      isCollapsed ? 'left-20' : 'left-60'
    } h-16 bg-gray-800 border-b border-gray-700 z-40`}>
      <div className="h-full px-6 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-white">Dashboard</h1>
        
        <div className="flex items-center space-x-4">
          <button className="p-2 text-gray-400 hover:text-white transition-colors">
            <Bell className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-400 hover:text-white transition-colors">
            <Settings className="w-5 h-5" />
          </button>
          <div className="text-sm text-gray-400">
            {user?.email}
          </div>
        </div>
      </div>
    </header>
  );
};