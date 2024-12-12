import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { signIn as authSignIn, signOut as authSignOut } from '../lib/auth';

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
          const user = await authSignIn(email, password);
          set({ user });
        } finally {
          set({ loading: false });
        }
      },
      signOut: async () => {
        set({ loading: true });
        try {
          await authSignOut();
          set({ user: null });
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