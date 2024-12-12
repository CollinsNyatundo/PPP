import React from 'react';
import { motion } from 'framer-motion';
import { format, parseISO } from 'date-fns';
import { Calendar, Clock, Tag, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MarkdownRenderer } from '../markdown/MarkdownRenderer';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { BlogPostMeta } from './BlogPostMeta';
import 'react-lazy-load-image-component/src/effects/blur.css';

interface BlogPostProps {
  post: {
    title: string;
    content: string;
    excerpt: string;
    image: string;
    created_at: string;
    read_time: string;
    category: string;
    slug: string;
  };
  previousPost?: {
    title: string;
    slug: string;
  };
  nextPost?: {
    title: string;
    slug: string;
  };
  isAdminView?: boolean;
}

export const BlogPost: React.FC<BlogPostProps> = ({ 
  post, 
  previousPost, 
  nextPost,
  isAdminView = false 
}) => {
  return (
    <article className="min-h-screen bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          {/* Back Navigation - Only show in non-admin view */}
          {!isAdminView && (
            <Link
              to="/#blog"
              className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors group"
            >
              <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
              Back to Blog
            </Link>
          )}

          {/* Hero Section */}
          <header className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              {post.title}
            </h1>
            <BlogPostMeta
              date={post.created_at}
              readTime={post.read_time}
              category={post.category}
            />
            <div className="relative h-[400px] rounded-xl overflow-hidden">
              <LazyLoadImage
                src={post.image}
                alt={post.title}
                effect="blur"
                className="w-full h-full object-cover"
                wrapperClassName="w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60" />
            </div>
          </header>

          {/* Content */}
          <div className="max-w-none">
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              {post.excerpt}
            </p>
            <MarkdownRenderer 
              content={post.content}
              className="prose-lg"
            />
          </div>

          {/* Post Navigation - Only show in non-admin view */}
          {!isAdminView && (previousPost || nextPost) && (
            <nav className="mt-12 pt-8 border-t border-gray-800">
              <div className="flex justify-between items-center">
                {previousPost && (
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
                )}

                {nextPost && (
                  <Link
                    to={`/blog/${nextPost.slug}`}
                    className="group flex items-center gap-2 text-right ml-auto"
                  >
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-400">Next Article</span>
                      <span className="text-purple-400 group-hover:text-purple-300 transition-colors">
                        {nextPost.title}
                      </span>
                    </div>
                    <ArrowLeft className="w-5 h-5 text-purple-400 rotate-180 transition-transform group-hover:translate-x-1" />
                  </Link>
                )}
              </div>
            </nav>
          )}
        </motion.div>
      </div>
    </article>
  );
};