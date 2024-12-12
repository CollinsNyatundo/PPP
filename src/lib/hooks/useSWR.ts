import useSWR from 'swr';
import { supabase } from '../supabase';
import { toast } from 'react-toastify';

const fetcher = async (key: string) => {
  try {
    const { data, error } = await supabase
      .from(key)
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error(`Error fetching ${key}:`, error);
      throw error;
    }

    return data;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch data';
    console.error('Fetch error:', error);
    throw new Error(message);
  }
};

export function useProjects(limit?: number) {
  const { data, error, mutate, isLoading } = useSWR('projects', fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    dedupingInterval: 10000,
    errorRetryCount: 3,
    onError: (err) => {
      console.error('Project fetch error:', err);
      toast.error('Failed to load projects. Please try again later.');
    },
  });
  
  return {
    projects: limit ? data?.slice(0, limit) : data,
    isLoading,
    isError: error,
    mutate
  };
}

export function useArticles(limit?: number) {
  const { data, error, mutate, isLoading } = useSWR('articles', fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    dedupingInterval: 10000,
    errorRetryCount: 3,
    onError: (err) => {
      console.error('Article fetch error:', err);
      toast.error('Failed to load articles. Please try again later.');
    },
  });
  
  return {
    articles: limit ? data?.slice(0, limit) : data,
    isLoading,
    isError: error,
    mutate
  };
}