import AsyncStorage from '@react-native-async-storage/async-storage';
import {createJSONStorage, persist} from 'zustand/middleware';
import {createWithEqualityFn} from 'zustand/traditional';
import {createAppConfigSlice} from './createAppConfigSlice';

export const useStore = createWithEqualityFn(
  persist(
    (set, get) => ({
      ...createAppConfigSlice(set, get),
    }),
    {
      name: 'app-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
