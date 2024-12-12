import React from 'react';

export const ArticleSkeleton: React.FC = () => {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg animate-pulse">
      <div className="aspect-video bg-gray-700" />
      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <div className="w-20 h-6 bg-gray-700 rounded-full" />
          <div className="w-24 h-4 bg-gray-700 rounded" />
        </div>
        <div className="w-3/4 h-6 bg-gray-700 rounded" />
        <div className="space-y-2">
          <div className="w-full h-4 bg-gray-700 rounded" />
          <div className="w-2/3 h-4 bg-gray-700 rounded" />
        </div>
      </div>
    </div>
  );
};