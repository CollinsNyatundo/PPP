import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bwejusehtsmakczoviry.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ3ZWp1c2VodHNtYWtjem92aXJ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI5NTA3OTAsImV4cCI6MjA0ODUyNjc5MH0.Z3tebdtW-HI831ZtTlQLt2gydL8HsO2lQzWZh1KaM94';

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
  global: {
    headers: {
      'Content-Type': 'application/json',
    },
  },
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
  db: {
    schema: 'public',
  },
  queries: {
    retryCount: 3,
    retryInterval: 1000,
  },
});

export type Database = {
  public: {
    Tables: {
      projects: {
        Row: {
          id: string;
          title: string;
          description: string;
          image: string;
          tags: string[];
          github: string;
          category: string;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['projects']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['projects']['Insert']>;
      };
      articles: {
        Row: {
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
        };
        Insert: Omit<Database['public']['Tables']['articles']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['articles']['Insert']>;
      };
    };
  };
};