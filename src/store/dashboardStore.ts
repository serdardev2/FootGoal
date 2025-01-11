import { create } from 'zustand';
import { networkManager } from '../network/network';
import { HomeResponse } from '../types/homeResponse';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_KEY = 'favorites';

interface DashboardStore {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  toggleTheme: () => void;

  matches: HomeResponse[];
  loading: boolean;
  error: string | null;
  fetchMatches: () => Promise<void>;

  favoriteIds: string[];
  toggleFavorite: (matchId: string) => Promise<void>;
  loadFavorites: () => Promise<void>;
}

export const useDashboardStore = create<DashboardStore>((set, get) => ({
  theme: 'light',
  setTheme: (theme) => set({ theme }),
  toggleTheme: () =>
    set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),

  matches: [],
  loading: false,
  error: null,
  fetchMatches: async () => {
    try {
      set({ loading: true, error: null });
      const matches = await networkManager.get<HomeResponse[]>('');
      set({ matches, loading: false });
    } catch (error) {
      console.log('error', error);
      set({ error: (error as Error).message, loading: false });
    }
  },

  favoriteIds: [],

  toggleFavorite: async (matchId: string) => {
    try {
      const currentFavorites = [...get().favoriteIds];
      const index = currentFavorites.indexOf(matchId);

      if (index > -1) {
        currentFavorites.splice(index, 1);
      } else {
        currentFavorites.push(matchId);
      }

      await AsyncStorage.setItem(
        FAVORITES_KEY,
        JSON.stringify(currentFavorites)
      );
      set({ favoriteIds: currentFavorites });
    } catch (error) {
      console.error('Favori işlemi sırasında hata:', error);
    }
  },

  loadFavorites: async () => {
    try {
      const favoritesString = await AsyncStorage.getItem(FAVORITES_KEY);
      const favoriteIds = favoritesString ? JSON.parse(favoritesString) : [];
      set({ favoriteIds });
    } catch (error) {
      console.error('Favoriler yüklenirken hata:', error);
    }
  },
}));
