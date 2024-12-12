import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react';
import { format } from 'date-fns';
import { MarkdownRenderer } from './markdown/MarkdownRenderer';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useArticles } from '../lib/hooks/useSWR';
import LoadingSpinner from './LoadingSpinner';
import 'react-lazy-load-image-component/src/effects/blur.css';

const BlogDetail = () => {
  const { slug } = useParams();
  const { articles, isLoading, isError } = useArticles();
  
  if (isLoading) return <LoadingSpinner />;
  if (isError) return <div>Error loading article</div>;

  const article = articles?.find(a => a.slug === slug);
  if (!article) return <div>Article not found</div>;

  const nextArticle = articles?.find((_, index) => 
    articles[index - 1]?.slug === slug
  );
  const prevArticle = articles?.find((_, index) => 
    articles[index + 1]?.slug === slug
  );

  return (
    <article className="min-h-screen bg-gray-900 pt-20">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            to="/#blog"
            className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 mb-8 transition-colors group"
            aria-label="Back to blog"
          >
            <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
            Back to Blog
          </Link>

          <div className="relative h-[400px] rounded-xl overflow-hidden mb-8">
            <LazyLoadImage
              src={article.image}
              alt={article.title}
              effect="blur"
              className="w-full h-full object-cover"
              wrapperClassName="w-full h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
          </div>

          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {article.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-gray-400">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {format(new Date(article.created_at), 'MMMM d, yyyy')}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {article.read_time}
              </span>
              <span className="flex items-center gap-1">
                <Tag className="w-4 h-4" />
                {article.category}
              </span>
            </div>
          </div>

          <div className="max-w-none">
            <MarkdownRenderer 
              content={article.content}
              className="prose-lg"
            />
          </div>

          {(prevArticle || nextArticle) && (
            <nav className="mt-12 pt-8 border-t border-gray-800">
              <div className="flex justify-between items-center">
                {prevArticle ? (
                  <Link
                    to={`/blog/${prevArticle.slug}`}
                    className="group flex flex-col"
                  >
                    <span className="text-sm text-gray-400">Previous Article</span>
                    <span className="text-purple-400 group-hover:text-purple-300 transition-colors">
                      {prevArticle.title}
                    </span>
                  </Link>
                ) : (
                  <div />
                )}

                {nextArticle ? (
                  <Link
                    to={`/blog/${nextArticle.slug}`}
                    className="group flex flex-col text-right"
                  >
                    <span className="text-sm text-gray-400">Next Article</span>
                    <span className="text-purple-400 group-hover:text-purple-300 transition-colors">
                      {nextArticle.title}
                    </span>
                  </Link>
                ) : (
                  <div />
                )}
              </div>
            </nav>
          )}
        </motion.div>
      </div>
    </article>
  );
};

export default BlogDetail;