import { useEffect } from 'react';
import { useArticleStore } from '../stores/articleStore';

export function useArticles(limit?: number) {
  const { articles, isLoading, error, initialize } = useArticleStore();

  useEffect(() => {
    initialize();
  }, [initialize]);

  return {
    articles: limit ? articles.slice(0, limit) : articles,
    isLoading,
    isError: error,
  };
}