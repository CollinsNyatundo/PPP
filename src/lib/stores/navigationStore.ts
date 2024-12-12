import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface NavigationState {
  scrollPosition: number;
  selectedArticleId: string | null;
  searchTerm: string;
  filter: string;
  sortOrder: 'asc' | 'desc';
  setNavigationState: (state: Partial<NavigationState>) => void;
  clearNavigationState: () => void;
}

export const useNavigationStore = create<NavigationState>()(
  persist(
    (set) => ({
      scrollPosition: 0,
      selectedArticleId: null,
      searchTerm: '',
      filter: 'all',
      sortOrder: 'desc',
      setNavigationState: (state) => set((prev) => ({ ...prev, ...state })),
      clearNavigationState: () => set({
        scrollPosition: 0,
        selectedArticleId: null,
        searchTerm: '',
        filter: 'all',
        sortOrder: 'desc',
      }),
    }),
    {
      name: 'blog-navigation-state',
      partialize: (state) => ({
        scrollPosition: state.scrollPosition,
        selectedArticleId: state.selectedArticleId,
        filter: state.filter,
        sortOrder: state.sortOrder,
      }),
    }
  )
);