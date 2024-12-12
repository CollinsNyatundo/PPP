import React from 'react';
import { FileText, Briefcase, Clock } from 'lucide-react';
import { format } from 'date-fns';

interface Activity {
  type: 'post' | 'project';
  title: string;
  date: string;
  status: string;
}

interface RecentActivityCardProps {
  activities: Activity[];
}

export const RecentActivityCard: React.FC<RecentActivityCardProps> = ({ activities }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-400/10 text-green-400';
      case 'draft':
        return 'bg-yellow-400/10 text-yellow-400';
      default:
        return 'bg-blue-400/10 text-blue-400';
    }
  };

  const getIcon = (type: 'post' | 'project') => {
    return type === 'post' ? FileText : Briefcase;
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h2 className="text-xl font-semibold text-white mb-4">Recent Activity</h2>
      <div className="space-y-4">
        {activities.map((activity, index) => {
          const Icon = getIcon(activity.type);
          const statusColor = getStatusColor(activity.status);

          return (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg"
            >
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-gray-700 rounded-lg">
                  <Icon className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-white">{activity.title}</h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-xs text-gray-400">
                      {format(new Date(activity.date), 'MMM d, yyyy')}
                    </span>
                  </div>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor}`}>
                {activity.status}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};