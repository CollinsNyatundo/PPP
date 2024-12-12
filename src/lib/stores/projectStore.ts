import { create } from 'zustand';
import { supabase } from '../supabase';
import { toast } from 'react-toastify';

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  github: string;
  category: string;
  created_at: string;
  updated_at: string;
}

interface ProjectState {
  projects: Project[];
  isLoading: boolean;
  error: Error | null;
  initialize: () => Promise<void>;
  addProject: (project: Project) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  removeProject: (id: string) => void;
}

export const useProjectStore = create<ProjectState>((set, get) => ({
  projects: [],
  isLoading: false,
  error: null,

  initialize: async () => {
    set({ isLoading: true });
    try {
      // Initial fetch
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      set({ projects: data || [] });

      // Set up real-time subscription
      const subscription = supabase
        .channel('projects-changes')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'projects',
          },
          (payload) => {
            const { eventType, new: newRecord, old: oldRecord } = payload;

            switch (eventType) {
              case 'INSERT':
                get().addProject(newRecord as Project);
                toast.success('New project added');
                break;
              case 'UPDATE':
                get().updateProject(oldRecord.id, newRecord as Project);
                toast.info('Project updated');
                break;
              case 'DELETE':
                get().removeProject(oldRecord.id);
                toast.info('Project removed');
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
      const message = error instanceof Error ? error.message : 'Failed to load projects';
      set({ error: new Error(message) });
      toast.error(message);
    } finally {
      set({ isLoading: false });
    }
  },

  addProject: (project) => {
    set((state) => ({
      projects: [project, ...state.projects],
    }));
  },

  updateProject: (id, updates) => {
    set((state) => ({
      projects: state.projects.map((project) =>
        project.id === id ? { ...project, ...updates } : project
      ),
    }));
  },

  removeProject: (id) => {
    set((state) => ({
      projects: state.projects.filter((project) => project.id !== id),
    }));
  },
}));