import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import BlogCard from '../components/BlogCard';
import BackToSection from '../components/BackToSection';
import { useArticles } from '../lib/hooks/useSWR';
import LoadingSpinner from '../components/LoadingSpinner';

const AllArticles = () => {
  const { articles, isLoading, isError } = useArticles();
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  const filteredArticles = articles?.filter((article) => {
    const matchesSearch = 
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || article.category.toLowerCase() === filter.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <div>Error loading articles</div>;

  return (
    <div className="min-h-screen bg-gray-900 pt-20">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <BackToSection to="/#blog" label="Back to Latest Articles" />

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 text-center">
            All Articles
          </h1>
          <div className="w-20 h-1 bg-purple-600 mx-auto mb-8"></div>

          <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto mb-12">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search articles..."
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
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles?.map((article, index) => (
            <BlogCard key={article.id} post={article} index={index} />
          ))}
        </div>

        {filteredArticles?.length === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-gray-400 mt-8"
          >
            No articles found matching your criteria.
          </motion.p>
        )}
      </div>
    </div>
  );
};

export default AllArticles;