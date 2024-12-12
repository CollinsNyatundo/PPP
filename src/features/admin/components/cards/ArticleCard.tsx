import React from 'react';
import { motion } from 'framer-motion';
import { Edit2, Trash2, Eye } from 'lucide-react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useNavigationStore } from '../../../../lib/stores/navigationStore';
import 'react-lazy-load-image-component/src/effects/blur.css';

interface ArticleCardProps {
  article: {
    id: string;
    title: string;
    content: string;
    image: string;
    published: boolean;
    created_at: string;
    slug: string;
  };
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article, onEdit, onDelete }) => {
  const setNavigationState = useNavigationStore((state) => state.setNavigationState);

  const handleArticleClick = () => {
    setNavigationState({
      scrollPosition: window.scrollY,
      selectedArticleId: article.id,
    });
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group relative"
    >
      {/* Rest of the component remains the same */}
      <Link 
        to={`/blog/${article.slug}`} 
        onClick={handleArticleClick}
        className="block"
      >
        {/* Existing content */}
      </Link>
    </motion.article>
  );
};