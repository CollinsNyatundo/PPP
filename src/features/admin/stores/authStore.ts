import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { toast } from 'react-toastify';

interface User {
  id: string;
  email: string;
  role: 'ADMIN' | 'USER';
}

interface AuthState {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      loading: false,
      signIn: async (email: string, password: string) => {
        set({ loading: true });
        try {
          // For development, use environment variables
          if (
            email === import.meta.env.VITE_ADMIN_EMAIL &&
            password === import.meta.env.VITE_ADMIN_PASSWORD
          ) {
            set({
              user: {
                id: '1',
                email,
                role: 'ADMIN',
              },
            });
            toast.success('Successfully logged in');
            return;
          }
          throw new Error('Invalid credentials');
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Login failed';
          toast.error(message);
          throw error;
        } finally {
          set({ loading: false });
        }
      },
      signOut: async () => {
        set({ loading: true });
        try {
          set({ user: null });
          toast.success('Successfully logged out');
        } catch (error) {
          toast.error('Failed to log out');
          throw error;
        } finally {
          set({ loading: false });
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user }),
    }
  )
);