import React, { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useNavigationStore } from '../lib/stores/navigationStore';
import { motion } from 'framer-motion';

interface BackToSectionProps {
  to: string;
  label: string;
}

const BackToSection: React.FC<BackToSectionProps> = ({ to, label }) => {
  const location = useLocation();
  const { scrollPosition, clearNavigationState } = useNavigationStore();
  
  useEffect(() => {
    return () => {
      // Clear navigation state when component unmounts
      if (!location.pathname.includes('/blog/')) {
        clearNavigationState();
      }
    };
  }, [location, clearNavigationState]);

  const handleClick = () => {
    // Restore scroll position after a short delay to ensure navigation is complete
    setTimeout(() => {
      window.scrollTo({
        top: scrollPosition,
        behavior: 'smooth'
      });
    }, 100);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Link
        to={to}
        onClick={handleClick}
        className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 mb-8 transition-colors group"
        aria-label={`Back to ${label}`}
      >
        <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
        {label}
      </Link>
    </motion.div>
  );
};

export default BackToSection;