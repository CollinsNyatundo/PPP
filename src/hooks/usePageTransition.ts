import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const usePageTransition = () => {
  const location = useLocation();

  useEffect(() => {
    // Clear unnecessary data and perform cleanup
    const cleanup = () => {
      // Clear any cached data that's no longer needed
      window.performance?.clearResourceTimings();
      
      // Clear any memory-intensive objects
      if (window.gc) {
        window.gc();
      }
    };

    // Preload critical resources for the homepage
    const preloadHomepage = () => {
      if (location.pathname !== '/') {
        const preloadLink = document.createElement('link');
        preloadLink.rel = 'preload';
        preloadLink.as = 'document';
        preloadLink.href = '/';
        document.head.appendChild(preloadLink);
      }
    };

    cleanup();
    preloadHomepage();

    return () => {
      cleanup();
      // Remove preload links when component unmounts
      document.head.querySelectorAll('link[rel="preload"][as="document"]')
        .forEach(link => link.remove());
    };
  }, [location]);
};