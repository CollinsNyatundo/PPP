import React from 'react';
import { Brain, LineChart } from 'lucide-react';

export const Logo: React.FC = () => {
  return (
    <div 
      className="flex items-center gap-1 cursor-pointer"
      role="img"
      aria-label="CN Analytics Logo"
    >
      <div className="relative">
        <Brain className="w-8 h-8 text-purple-500 transition-colors duration-200 group-hover:text-purple-400" />
        <LineChart className="w-4 h-4 text-blue-400 absolute -bottom-1 -right-1 transition-colors duration-200 group-hover:text-blue-300" />
      </div>
      <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text transition-all duration-200 group-hover:from-purple-300 group-hover:to-blue-300">
        CN Analytics
      </span>
    </div>
  );
};

export default Logo;