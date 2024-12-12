import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { 
  LayoutDashboard, 
  FileText, 
  Briefcase, 
  Settings, 
  LogOut, 
  ChevronLeft, 
  ChevronRight,
  User
} from 'lucide-react';
import { Logo } from '../../../../components/Logo';

interface AdminSidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ 
  isCollapsed, 
  onToggleCollapse 
}) => {
  const { signOut } = useAuthStore();
  
  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Posts', path: '/admin/posts', icon: FileText },
    { name: 'Projects', path: '/admin/projects', icon: Briefcase },
    { name: 'Profile', path: '/admin/profile', icon: User },
    { name: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  return (
    <aside className={`fixed top-0 left-0 h-full bg-gray-800 border-r border-gray-700 transition-all duration-300 ${
      isCollapsed ? 'w-20' : 'w-60'
    }`}>
      <div className="h-16 flex items-center justify-between px-4 border-b border-gray-700">
        <div className={`transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
          <Logo />
        </div>
        <button
          onClick={onToggleCollapse}
          className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? (
            <ChevronRight className="w-5 h-5 text-gray-400" />
          ) : (
            <ChevronLeft className="w-5 h-5 text-gray-400" />
          )}
        </button>
      </div>
      
      <nav className="p-4">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/admin'}
            className={({ isActive }) => `
              flex items-center px-4 py-2 rounded-lg text-sm font-medium
              transition-all duration-200 mb-1
              ${isActive 
                ? 'bg-purple-600 text-white' 
                : 'text-gray-400 hover:text-white hover:bg-gray-700'}
            `}
            title={isCollapsed ? item.name : undefined}
          >
            <item.icon className="w-5 h-5" />
            {!isCollapsed && <span className="ml-3">{item.name}</span>}
          </NavLink>
        ))}
      </nav>

      <button
        onClick={signOut}
        className={`absolute bottom-4 left-4 right-4 flex items-center px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors ${
          isCollapsed ? 'justify-center' : ''
        }`}
        title={isCollapsed ? 'Sign Out' : undefined}
      >
        <LogOut className="w-5 h-5" />
        {!isCollapsed && <span className="ml-3">Sign Out</span>}
      </button>
    </aside>
  );
};