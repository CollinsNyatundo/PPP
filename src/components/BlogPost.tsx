import React from 'react';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowLeft } from 'lucide-react';
import { MarkdownRenderer } from './markdown/MarkdownRenderer';
import { Link, useParams } from 'react-router-dom';

interface BlogPostProps {
  content: string;
  frontmatter: {
    title: string;
    date: string;
    author: string;
    category: string;
    excerpt: string;
    coverImage: string;
    readTime: string;
  };
}



const BlogPost = ({ content, frontmatter }: BlogPostProps) => {
  return (
    <article className="max-w-4xl mx-auto px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>

        <div className="relative h-[400px] rounded-xl overflow-hidden mb-8">
          <img
            src={frontmatter.coverImage}
            alt={frontmatter.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
        </div>

        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {frontmatter.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-gray-400">
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {format(new Date(frontmatter.date), 'MMM d, yyyy')}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {frontmatter.readTime}
            </span>
            <span className="bg-purple-600/20 text-purple-400 px-3 py-1 rounded-full text-sm">
              {frontmatter.category}
            </span>
          </div>
        </div>

        <div className="prose prose-invert prose-lg max-w-none">
          <MarkdownRenderer content={content} />
        </div>
      </motion.div>
    </article>
  );
};

export default BlogPost;