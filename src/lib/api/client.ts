import { supabase } from '../supabase';
import type { Database } from '../supabase';
import { toast } from 'react-toastify';

const handleError = (error: any, operation: string) => {
  console.error(`Error ${operation}:`, error);
  const message = error?.message || `Failed to ${operation}`;
  toast.error(message);
  throw error;
};

export const api = {
  async fetchProjects() {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    } catch (error) {
      handleError(error, 'fetching projects');
    }
  },

  async createProject(project: Database['public']['Tables']['projects']['Insert']) {
    try {
      const { data, error } = await supabase
        .from('projects')
        .insert([project])
        .select()
        .single();

      if (error) throw error;
      toast.success('Project created successfully');
      return data;
    } catch (error) {
      handleError(error, 'creating project');
    }
  },

  async updateProject(
    id: string,
    updates: Database['public']['Tables']['projects']['Update']
  ) {
    try {
      const { data, error } = await supabase
        .from('projects')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      toast.success('Project updated successfully');
      return data;
    } catch (error) {
      handleError(error, 'updating project');
    }
  },

  async deleteProject(id: string) {
    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success('Project deleted successfully');
    } catch (error) {
      handleError(error, 'deleting project');
    }
  },

  async fetchArticles() {
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    } catch (error) {
      handleError(error, 'fetching articles');
    }
  },

  async createArticle(article: Database['public']['Tables']['articles']['Insert']) {
    try {
      const { data, error } = await supabase
        .from('articles')
        .insert([{
          ...article,
          slug: article.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        }])
        .select()
        .single();

      if (error) throw error;
      toast.success('Article created successfully');
      return data;
    } catch (error) {
      handleError(error, 'creating article');
    }
  },

  async updateArticle(
    id: string,
    updates: Database['public']['Tables']['articles']['Update']
  ) {
    try {
      const { data, error } = await supabase
        .from('articles')
        .update({
          ...updates,
          slug: updates.title 
            ? updates.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')
            : undefined,
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      toast.success('Article updated successfully');
      return data;
    } catch (error) {
      handleError(error, 'updating article');
    }
  },

  async deleteArticle(id: string) {
    try {
      const { error } = await supabase
        .from('articles')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success('Article deleted successfully');
    } catch (error) {
      handleError(error, 'deleting article');
    }
  }
};