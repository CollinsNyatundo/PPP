import React, { useEffect } from 'react';
import { usePageTransition } from '../hooks/usePageTransition';
import { useCacheControl } from '../hooks/useCacheControl';
import { useScrollTop } from '../hooks/useScrollTop';

const NavigationManager: React.FC = () => {
  usePageTransition();
  useCacheControl();
  useScrollTop();

  useEffect(() => {
    // Initialize performance monitoring
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          // Log navigation timing metrics
          if (entry.entryType === 'navigation') {
            console.debug('Navigation Performance:', {
              timeToFirstByte: entry.responseStart - entry.requestStart,
              domInteractive: entry.domInteractive,
              domComplete: entry.domComplete,
              loadEventEnd: entry.loadEventEnd
            });
          }
        });
      });

      observer.observe({ entryTypes: ['navigation', 'resource'] });
      return () => observer.disconnect();
    }
  }, []);

  return null;
};

export default NavigationManager;