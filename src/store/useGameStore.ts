import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Badge } from '../types';

interface GameState {
  stars: number;
  answered: Record<string, boolean>;
  badges: Badge[];

  answerQuestion: (questionId: string, correct: boolean) => void;
  completeCategory: (categoryId: string) => void;
  resetAll: () => void;
}

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      stars: 0,
      answered: {},
      badges: [],

      answerQuestion: (questionId, correct) =>
        set((state) => ({
          answered: { ...state.answered, [questionId]: correct },
          stars: correct ? state.stars + 1 : state.stars,
        })),

      completeCategory: (categoryId) => {
        const already = get().badges.some((b) => b.categoryId === categoryId);
        if (already) return;
        set((state) => ({
          badges: [...state.badges, { categoryId, earnedAt: Date.now() }],
          stars: state.stars + 5,
        }));
      },

      resetAll: () => set({ stars: 0, answered: {}, badges: [] }),
    }),
    { name: 'digging-kids-state' },
  ),
);
