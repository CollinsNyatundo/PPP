import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, Clock } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

interface BlogCardProps {
  post: {
    title: string;
    excerpt: string;
    created_at: string;
    read_time: string;
    slug: string;
    image: string;
  };
  index: number;
}

const BlogCard: React.FC<BlogCardProps> = ({ post, index }) => {
  const formattedDate = post.created_at ? format(parseISO(post.created_at), 'MMM d, yyyy') : '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="bg-gray-800 rounded-xl overflow-hidden group hover:transform hover:transform hover:scale-[1.02] transition-all duration-300 flex flex-col h-full"
    >
      <Link to={`/blog/${post.slug}`}>
        <div className="relative h-48 overflow-hidden">
          <LazyLoadImage
            src={post.image}
            alt={post.title}
            effect="blur"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            wrapperClassName="w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
        </div>
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-purple-400 transition-colors line-clamp-2">
            {post.title}
          </h3>
          <p className="text-gray-400 mb-4 line-clamp-2">{post.excerpt}</p>
          <div className="flex items-center text-gray-500 text-sm">
            <Calendar className="w-4 h-4 mr-2" />
            <span>{formattedDate}</span>
            <Clock className="w-4 h-4 ml-4 mr-2" />
            <span>{post.read_time}</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default BlogCard;