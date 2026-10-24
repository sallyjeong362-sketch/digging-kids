import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CategoryBadge } from '../types';

interface GameState {
  stars: number;
  /** key: `${siteId}:${depth}` -> was the most recent attempt correct */
  answered: Record<string, boolean>;
  /** siteId list, a site counts once all 3 of its questions have been answered */
  sitesCompleted: string[];
  categoryBadges: CategoryBadge[];
  bestChainDepth: number;

  answerQuestion: (siteId: string, depth: number, correct: boolean) => void;
  completeSite: (siteId: string, categoryId: string) => void;
  recordChain: (depth: number) => void;
  resetAll: () => void;
}

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      stars: 0,
      answered: {},
      sitesCompleted: [],
      categoryBadges: [],
      bestChainDepth: 0,

      answerQuestion: (siteId, depth, correct) =>
        set((state) => ({
          answered: { ...state.answered, [`${siteId}:${depth}`]: correct },
          stars: correct ? state.stars + 1 : state.stars,
        })),

      completeSite: (siteId, categoryId) => {
        const state = get();
        const alreadySite = state.sitesCompleted.includes(siteId);
        const alreadyBadge = state.categoryBadges.some((b) => b.categoryId === categoryId);
        set({
          sitesCompleted: alreadySite ? state.sitesCompleted : [...state.sitesCompleted, siteId],
          categoryBadges: alreadyBadge
            ? state.categoryBadges
            : [...state.categoryBadges, { categoryId, earnedAt: Date.now() }],
          stars: state.stars + (alreadySite ? 1 : 3) + (alreadyBadge ? 0 : 5),
        });
      },

      recordChain: (depth) =>
        set((state) => ({ bestChainDepth: Math.max(state.bestChainDepth, depth) })),

      resetAll: () => set({ stars: 0, answered: {}, sitesCompleted: [], categoryBadges: [], bestChainDepth: 0 }),
    }),
    { name: 'digging-kids-state' },
  ),
);
