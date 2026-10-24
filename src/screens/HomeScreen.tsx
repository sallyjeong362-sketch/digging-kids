import { CATEGORIES } from '../data/categories';
import { getSitesForCategory } from '../data/sites';
import { useGameStore } from '../store/useGameStore';
import Mole from '../components/Mole';
import TopBar from '../components/TopBar';

export default function HomeScreen({
  onPickCategory,
  onCollection,
}: {
  onPickCategory: (categoryId: string) => void;
  onCollection: () => void;
}) {
  const categoryBadges = useGameStore((s) => s.categoryBadges);
  const earnedIds = new Set(categoryBadges.map((b) => b.categoryId));

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <TopBar onCollection={onCollection} />

      <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6 sm:py-10">
        <div className="flex flex-col items-center gap-3 text-center">
          <Mole mood="excited" className="h-24 w-24 sm:h-28 sm:w-28" />
          <h1 className="text-2xl font-black text-[var(--text)] sm:text-3xl">
            오늘은 뭐가 궁금해?
          </h1>
          <p className="max-w-sm text-sm font-semibold text-[var(--text-muted)] sm:text-base">
            주제를 콕 눌러서 깊이깊이 파고들어봐요!
          </p>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3.5 sm:grid-cols-4 sm:gap-4">
          {CATEGORIES.map((cat) => {
            const siteCount = getSitesForCategory(cat.id).length;
            const earned = earnedIds.has(cat.id);
            return (
              <button
                key={cat.id}
                onClick={() => onPickCategory(cat.id)}
                style={{ ['--cat-tint' as string]: cat.tint, ['--cat-tint-dark' as string]: cat.tintDark }}
                className="group relative overflow-hidden rounded-[28px] border-4 border-[var(--border)] bg-[var(--surface)] text-left transition active:scale-95 active:border-[var(--accent)]"
              >
                <div className="cat-art relative flex h-24 items-center justify-center sm:h-28">
                  <span className="rotate-[-6deg] text-5xl drop-shadow-sm transition duration-200 group-hover:rotate-0 group-hover:scale-110 sm:text-6xl">
                    {cat.emoji}
                  </span>
                  {earned && (
                    <span className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white text-lg shadow">
                      🏅
                    </span>
                  )}
                </div>
                <div className="px-3 py-3 text-center">
                  <span className="block text-base font-black text-[var(--text)] sm:text-lg">{cat.name}</span>
                  <span className="mt-0.5 block text-xs font-bold text-[var(--text-faint)]">탐구 {siteCount}곳</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
