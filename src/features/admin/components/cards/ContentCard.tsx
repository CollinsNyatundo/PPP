import React from 'react';
import { motion } from 'framer-motion';
import { Edit2, Trash2, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

interface ContentCardProps {
  title: string;
  description: string;
  image: string;
  metadata: {
    date?: string;
    status?: string;
    category?: string;
    tags?: string;
  };
  slug?: string;
  onEdit?: () => void;
  onDelete?: () => void;
}

export const ContentCard: React.FC<ContentCardProps> = ({
  title,
  description,
  image,
  metadata,
  slug,
  onEdit,
  onDelete,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group relative"
    >
      <div className="aspect-video relative">
        <LazyLoadImage
          src={image}
          alt={title}
          effect="blur"
          className="w-full h-full object-cover"
          wrapperClassName="w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60" />
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">
          {title}
        </h3>
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
          {description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {metadata.category && (
            <span className="px-2 py-1 bg-purple-900/50 text-purple-300 text-xs rounded-full">
              {metadata.category}
            </span>
          )}
          {metadata.status && (
            <span className={`px-2 py-1 rounded-full text-xs ${
              metadata.status === 'Published' 
                ? 'bg-green-900/50 text-green-300'
                : 'bg-yellow-900/50 text-yellow-300'
            }`}>
              {metadata.status}
            </span>
          )}
          {metadata.date && (
            <span className="px-2 py-1 bg-gray-700/50 text-gray-300 text-xs rounded-full">
              {metadata.date}
            </span>
          )}
        </div>

        <div className="flex justify-end gap-2">
          {slug && (
            <Link
              to={`/admin/posts/${slug}`}
              className="p-2 text-gray-400 hover:text-purple-400 transition-colors"
              aria-label="View article"
            >
              <Eye className="w-4 h-4" />
            </Link>
          )}
          {onEdit && (
            <button
              onClick={onEdit}
              className="p-2 text-gray-400 hover:text-purple-400 transition-colors"
              aria-label="Edit"
            >
              <Edit2 className="w-4 h-4" />
            </button>
          )}
          {onDelete && (
            <button
              onClick={onDelete}
              className="p-2 text-gray-400 hover:text-red-400 transition-colors"
              aria-label="Delete"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};