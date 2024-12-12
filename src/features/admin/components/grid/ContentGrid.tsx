import React from 'react';

interface ContentGridProps {
  children: React.ReactNode;
}

export const ContentGrid: React.FC<ContentGridProps> = ({ children }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {children}
    </div>
  );
};