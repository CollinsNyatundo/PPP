import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AdminSidebar } from '../navigation/AdminSidebar';
import { AdminHeader } from '../navigation/AdminHeader';
import { DashboardHome } from '../../pages/DashboardHome';
import { PostsPage } from '../../pages/PostsPage';
import { ArticlePage } from '../../pages/ArticlePage';
import { ProjectsPage } from '../../pages/ProjectsPage';
import { SettingsPage } from '../../pages/SettingsPage';
import { ProfilePage } from '../../pages/ProfilePage';

export const AdminLayout = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-gray-900 flex">
      <AdminSidebar 
        isCollapsed={isSidebarCollapsed} 
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)} 
      />
      <div className={`flex-1 transition-all duration-300 ${
        isSidebarCollapsed ? 'ml-20' : 'ml-60'
      }`}>
        <AdminHeader isCollapsed={isSidebarCollapsed} />
        <main className="p-8 mt-16">
          <Routes>
            <Route index element={<DashboardHome />} />
            <Route path="posts" element={<PostsPage />} />
            <Route path="posts/:slug" element={<ArticlePage />} />
            <Route path="projects" element={<ProjectsPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="profile" element={<ProfilePage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;