import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search } from 'lucide-react';
import { ContentGrid } from '../components/grid/ContentGrid';
import { ContentCard } from '../components/cards/ContentCard';
import { PostEditor } from '../components/editors/PostEditor';
import { useArticles } from '../../../lib/hooks/useSWR';
import { api } from '../../../lib/api/client';
import { toast } from 'react-toastify';
import LoadingSpinner from '../../../components/LoadingSpinner';
import { useNavigationStore } from '../../../lib/stores/navigationStore';

export const PostsPage = () => {
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [editingPost, setEditingPost] = useState<any>(null);
  const { articles, isLoading, isError, mutate } = useArticles();
  const { scrollPosition, selectedArticleId, clearNavigationState } = useNavigationStore();

  useEffect(() => {
    // Restore scroll position and highlight selected article
    if (scrollPosition && selectedArticleId) {
      setTimeout(() => {
        window.scrollTo({
          top: scrollPosition,
          behavior: 'smooth'
        });

        const articleElement = document.getElementById(`article-${selectedArticleId}`);
        if (articleElement) {
          articleElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
          articleElement.classList.add('ring-2', 'ring-purple-500');
          setTimeout(() => {
            articleElement.classList.remove('ring-2', 'ring-purple-500');
          }, 2000);
        }
      }, 100);

      clearNavigationState();
    }
  }, [scrollPosition, selectedArticleId, clearNavigationState]);

  // Rest of the component remains the same...
  const handleEdit = (post: any) => {
    setEditingPost(post);
    setIsEditorOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await api.deleteArticle(id);
        await mutate();
        toast.success('Post deleted successfully');
      } catch (error) {
        console.error('Error deleting post:', error);
        toast.error('Failed to delete post');
      }
    }
  };

  const handleSave = async (data: any) => {
    try {
      if (editingPost) {
        await api.updateArticle(editingPost.id, data);
        toast.success('Post updated successfully');
      } else {
        await api.createArticle(data);
        toast.success('Post created successfully');
      }
      setIsEditorOpen(false);
      setEditingPost(null);
      await mutate();
    } catch (error) {
      console.error('Error saving post:', error);
      toast.error('Failed to save post');
    }
  };

  const filteredPosts = articles?.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || post.category.toLowerCase() === filter.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  if (isError) {
    return (
      <div className="text-center text-red-500 py-8">
        Error loading posts. Please try again later.
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h1 className="text-3xl font-bold text-white mb-2">Blog Posts</h1>
          <p className="text-gray-400">Manage your blog posts and articles</p>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => {
            setEditingPost(null);
            setIsEditorOpen(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          New Post
        </motion.button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
          />
        </div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="bg-gray-800 border border-gray-700 rounded-lg text-white px-4 py-2 focus:outline-none focus:border-purple-500"
        >
          <option value="all">All Categories</option>
          <option value="Data Science">Data Science</option>
          <option value="Machine Learning">Machine Learning</option>
          <option value="Data Visualization">Data Visualization</option>
        </select>
      </div>

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <ContentGrid>
          {filteredPosts?.map((post) => (
            <div
              key={post.id}
              id={`article-${post.id}`}
              className="transition-all duration-300"
            >
              <ContentCard
                title={post.title}
                description={post.excerpt}
                image={post.image}
                slug={post.slug}
                metadata={{
                  category: post.category,
                  status: post.published ? 'Published' : 'Draft',
                  date: new Date(post.created_at).toLocaleDateString(),
                }}
                onEdit={() => handleEdit(post)}
                onDelete={() => handleDelete(post.id)}
              />
            </div>
          ))}
        </ContentGrid>
      )}

      {isEditorOpen && (
        <PostEditor
          post={editingPost}
          onSave={handleSave}
          onClose={() => {
            setIsEditorOpen(false);
            setEditingPost(null);
          }}
        />
      )}
    </div>
  );
};