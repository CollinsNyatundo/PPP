import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useCacheControl = () => {
  const location = useLocation();

  useEffect(() => {
    // Set cache control headers for static assets
    const setCacheHeaders = () => {
      if ('caches' in window) {
        caches.open('static-assets').then(cache => {
          // Cache static assets with a longer TTL
          const assets = [
            '/logo.png',
            '/favicon.ico',
            // Add other static assets here
          ];
          
          assets.forEach(asset => {
            fetch(asset, {
              cache: 'force-cache',
              headers: {
                'Cache-Control': 'public, max-age=31536000'
              }
            }).then(response => cache.put(asset, response));
          });
        });
      }
    };

    setCacheHeaders();
  }, [location]);
};