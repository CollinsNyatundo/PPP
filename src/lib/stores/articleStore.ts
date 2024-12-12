import { create } from 'zustand';
import { supabase } from '../supabase';
import { toast } from 'react-toastify';

interface Article {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  image: string;
  slug: string;
  category: string;
  read_time: string;
  published: boolean;
  created_at: string;
  updated_at: string;
}

interface ArticleState {
  articles: Article[];
  isLoading: boolean;
  error: Error | null;
  initialize: () => Promise<void>;
  addArticle: (article: Article) => void;
  updateArticle: (id: string, updates: Partial<Article>) => void;
  removeArticle: (id: string) => void;
}

export const useArticleStore = create<ArticleState>((set, get) => ({
  articles: [],
  isLoading: false,
  error: null,

  initialize: async () => {
    set({ isLoading: true });
    try {
      // Initial fetch
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      set({ articles: data || [] });

      // Set up real-time subscription
      const subscription = supabase
        .channel('articles-changes')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'articles',
          },
          (payload) => {
            const { eventType, new: newRecord, old: oldRecord } = payload;

            switch (eventType) {
              case 'INSERT':
                get().addArticle(newRecord as Article);
                toast.success('New article published');
                break;
              case 'UPDATE':
                get().updateArticle(oldRecord.id, newRecord as Article);
                toast.info('Article updated');
                break;
              case 'DELETE':
                get().removeArticle(oldRecord.id);
                toast.info('Article removed');
                break;
            }
          }
        )
        .subscribe();

      // Cleanup subscription on store destruction
      return () => {
        subscription.unsubscribe();
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to load articles';
      set({ error: new Error(message) });
      toast.error(message);
    } finally {
      set({ isLoading: false });
    }
  },

  addArticle: (article) => {
    set((state) => ({
      articles: [article, ...state.articles],
    }));
  },

  updateArticle: (id, updates) => {
    set((state) => ({
      articles: state.articles.map((article) =>
        article.id === id ? { ...article, ...updates } : article
      ),
    }));
  },

  removeArticle: (id) => {
    set((state) => ({
      articles: state.articles.filter((article) => article.id !== id),
    }));
  },
}));