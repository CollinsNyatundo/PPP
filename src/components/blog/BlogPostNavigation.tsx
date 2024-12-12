import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface BlogPostNavigationProps {
  previousPost?: {
    title: string;
    slug: string;
  };
  nextPost?: {
    title: string;
    slug: string;
  };
}

export const BlogPostNavigation: React.FC<BlogPostNavigationProps> = ({
  previousPost,
  nextPost,
}) => {
  return (
    <nav className="mt-12 pt-8 border-t border-gray-800">
      <div className="flex justify-between items-center">
        {previousPost ? (
          <Link
            to={`/blog/${previousPost.slug}`}
            className="group flex items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5 text-purple-400 transition-transform group-hover:-translate-x-1" />
            <div className="flex flex-col">
              <span className="text-sm text-gray-400">Previous Article</span>
              <span className="text-purple-400 group-hover:text-purple-300 transition-colors">
                {previousPost.title}
              </span>
            </div>
          </Link>
        ) : (
          <div />
        )}

        {nextPost ? (
          <Link
            to={`/blog/${nextPost.slug}`}
            className="group flex items-center gap-2 text-right"
          >
            <div className="flex flex-col">
              <span className="text-sm text-gray-400">Next Article</span>
              <span className="text-purple-400 group-hover:text-purple-300 transition-colors">
                {nextPost.title}
              </span>
            </div>
            <ArrowRight className="w-5 h-5 text-purple-400 transition-transform group-hover:translate-x-1" />
          </Link>
        ) : (
          <div />
        )}
      </div>
    </nav>
  );
};