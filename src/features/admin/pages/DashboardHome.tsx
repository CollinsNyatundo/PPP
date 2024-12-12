import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Briefcase, Users, TrendingUp } from 'lucide-react';
import { StatsCard } from '../components/cards/StatsCard';
import { RecentActivityCard } from '../components/cards/RecentActivityCard';
import { ContentGrid } from '../components/grid/ContentGrid';

export const DashboardHome = () => {
  const stats = [
    { title: 'Total Posts', value: '24', icon: FileText, trend: '+12%' },
    { title: 'Total Projects', value: '18', icon: Briefcase, trend: '+8%' },
    { title: 'Total Views', value: '2.4K', icon: Users, trend: '+24%' },
    { title: 'Engagement Rate', value: '18%', icon: TrendingUp, trend: '+6%' },
  ];

  const recentActivity = [
    { type: 'post', title: 'Machine Learning in Healthcare', date: '2024-03-15', status: 'published' },
    { type: 'project', title: 'Customer Churn Analysis', date: '2024-03-14', status: 'updated' },
    { type: 'post', title: 'Data Science Best Practices', date: '2024-03-13', status: 'draft' },
  ];

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
        <p className="text-gray-400">Here's what's happening with your portfolio.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatsCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            trend={stat.trend}
            delay={index * 0.1}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivityCard activities={recentActivity} />
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
          <div className="space-y-4">
            <button className="w-full py-2 px-4 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors">
              Create New Post
            </button>
            <button className="w-full py-2 px-4 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors">
              Add New Project
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};