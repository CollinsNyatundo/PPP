import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Edit2, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { useArticles } from '../../../lib/hooks/useSWR';
import { ContentCard } from '../components/cards/ContentCard';
import { MarkdownRenderer } from '../../../components/markdown/MarkdownRenderer';
import LoadingSpinner from '../../../components/LoadingSpinner';
import { api } from '../../../lib/api/client';
import { toast } from 'react-toastify';
import { useNavigationStore } from '../../../lib/stores/navigationStore';

export const ArticlePage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { articles, isLoading, isError, mutate } = useArticles();
  const { setNavigationState, clearNavigationState } = useNavigationStore();

  useEffect(() => {
    // Save current scroll position when component mounts
    setNavigationState({
      scrollPosition: window.scrollY,
      selectedArticleId: articles?.find(a => a.slug === slug)?.id || null
    });

    // Clear navigation state when component unmounts
    return () => clearNavigationState();
  }, [slug, articles, setNavigationState, clearNavigationState]);

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <div>Error loading article</div>;

  const article = articles?.find(a => a.slug === slug);
  if (!article) return <div>Article not found</div>;

  const handleEdit = () => {
    navigate(`/admin/posts/edit/${article.id}`);
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      try {
        await api.deleteArticle(article.id);
        await mutate();
        toast.success('Article deleted successfully');
        navigate('/admin/posts');
      } catch (error) {
        console.error('Error deleting article:', error);
        toast.error('Failed to delete article');
      }
    }
  };

  const handleBack = () => {
    navigate('/admin/posts');
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header Actions */}
      <div className="mb-8 flex items-center justify-between">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={handleBack}
          className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
          Back to Posts
        </motion.button>

        <div className="flex items-center gap-4">
          <button
            onClick={handleEdit}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <Edit2 className="w-4 h-4" />
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </div>
      </div>

      {/* Article Content */}
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-800 rounded-lg overflow-hidden"
      >
        {/* Article Header */}
        <div className="relative h-[400px]">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60" />
        </div>

        {/* Article Metadata */}
        <div className="p-8">
          <h1 className="text-3xl font-bold text-white mb-4">{article.title}</h1>

          <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-6">
            <span>
              Published: {format(new Date(article.created_at), 'MMMM d, yyyy')}
            </span>
            <span>Reading time: {article.read_time}</span>
            <span className="bg-purple-600/20 text-purple-400 px-3 py-1 rounded-full">
              {article.category}
            </span>
            <span className={`px-3 py-1 rounded-full ${
              article.published
                ? 'bg-green-600/20 text-green-400'
                : 'bg-yellow-600/20 text-yellow-400'
            }`}>
              {article.published ? 'Published' : 'Draft'}
            </span>
          </div>

          {/* Article Excerpt */}
          <div className="text-lg text-gray-300 mb-8 border-l-4 border-purple-500 pl-4">
            {article.excerpt}
          </div>

          {/* Article Content */}
          <div className="prose prose-invert max-w-none">
            <MarkdownRenderer content={article.content} />
          </div>
        </div>
      </motion.article>
    </div>
  );
};