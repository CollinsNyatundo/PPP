import React from 'react';
import { Calendar, Clock, Tag } from 'lucide-react';
import { format, parseISO } from 'date-fns';

interface BlogPostMetaProps {
  date: string;
  readTime: string;
  category: string;
}

export const BlogPostMeta: React.FC<BlogPostMetaProps> = ({
  date,
  readTime,
  category,
}) => {
  const formattedDate = format(parseISO(date), 'MMMM d, yyyy');

  return (
    <div className="flex flex-wrap items-center gap-4 text-gray-400">
      <div className="flex items-center gap-2">
        <Calendar className="w-4 h-4" />
        <span>{formattedDate}</span>
      </div>
      <div className="flex items-center gap-2">
        <Clock className="w-4 h-4" />
        <span>{readTime}</span>
      </div>
      <div className="flex items-center gap-2">
        <Tag className="w-4 h-4" />
        <span className="bg-purple-600/20 text-purple-400 px-3 py-1 rounded-full text-sm">
          {category}
        </span>
      </div>
    </div>
  );
};