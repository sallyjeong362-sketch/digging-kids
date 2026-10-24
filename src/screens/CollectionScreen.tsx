import { CATEGORIES } from '../data/categories';
import { DIG_SITES } from '../data/sites';
import { useGameStore } from '../store/useGameStore';
import Mole from '../components/Mole';
import TopBar from '../components/TopBar';

export default function CollectionScreen({ onHome }: { onHome: () => void }) {
  const stars = useGameStore((s) => s.stars);
  const categoryBadges = useGameStore((s) => s.categoryBadges);
  const sitesCompleted = useGameStore((s) => s.sitesCompleted);
  const bestChainDepth = useGameStore((s) => s.bestChainDepth);
  const resetAll = useGameStore((s) => s.resetAll);

  const earnedIds = new Set(categoryBadges.map((b) => b.categoryId));

  function handleReset() {
    if (window.confirm('정말 처음부터 다시 시작할까요? 모은 별과 뱃지가 모두 사라져요.')) {
      resetAll();
    }
  }

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <TopBar onHome={onHome} />

      <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6 sm:py-10">
        <div className="flex flex-col items-center gap-2 text-center">
          <Mole mood="happy" className="h-20 w-20 sm:h-24 sm:w-24" />
          <h1 className="text-2xl font-black text-[var(--text)] sm:text-3xl">내 뱃지 모음</h1>
          <p className="text-sm font-semibold text-[var(--text-muted)]">지금까지 모은 별과 뱃지를 확인해봐요!</p>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="rounded-2xl border-4 border-[var(--border)] bg-[var(--surface)] px-3 py-4 text-center">
            <div className="text-3xl font-black tabular-nums text-[var(--text)]">⭐ {stars}</div>
            <div className="mt-1 text-xs font-bold text-[var(--text-faint)]">모은 별</div>
          </div>
          <div className="rounded-2xl border-4 border-[var(--border)] bg-[var(--surface)] px-3 py-4 text-center">
            <div className="text-3xl font-black tabular-nums text-[var(--text)]">🏅 {categoryBadges.length}</div>
            <div className="mt-1 text-xs font-bold text-[var(--text-faint)]">모은 뱃지</div>
          </div>
          <div className="rounded-2xl border-4 border-[var(--border)] bg-[var(--surface)] px-3 py-4 text-center">
            <div className="text-3xl font-black tabular-nums text-[var(--text)]">
              {sitesCompleted.length}/{DIG_SITES.length}
            </div>
            <div className="mt-1 text-xs font-bold text-[var(--text-faint)]">파본 곳</div>
          </div>
          <div className="rounded-2xl border-4 border-[var(--border)] bg-[var(--surface)] px-3 py-4 text-center">
            <div className="text-3xl font-black tabular-nums text-[var(--text)]">⛏️ {bestChainDepth}</div>
            <div className="mt-1 text-xs font-bold text-[var(--text-faint)]">최고 깊이</div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3.5 sm:grid-cols-4">
          {CATEGORIES.map((cat) => {
            const earned = earnedIds.has(cat.id);
            return (
              <div
                key={cat.id}
                style={{ ['--cat-tint' as string]: cat.tint, ['--cat-tint-dark' as string]: cat.tintDark }}
                className={`flex flex-col items-center gap-1.5 rounded-[24px] border-4 p-4 text-center transition ${
                  earned ? 'border-[var(--border-strong)] bg-[var(--surface)]' : 'border-[var(--border)] bg-[var(--surface)] opacity-50'
                }`}
              >
                <span className="cat-art flex h-16 w-16 items-center justify-center rounded-full text-3xl">
                  {earned ? cat.emoji : '🔒'}
                </span>
                <span className="text-sm font-black text-[var(--text)]">{cat.name}</span>
                <span className="text-[11px] font-bold text-[var(--text-faint)]">{earned ? '뱃지 획득!' : '아직이에요'}</span>
              </div>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <button onClick={handleReset} className="text-xs font-bold text-[var(--text-faint)] hover:text-[var(--wrong)] hover:underline">
            처음부터 다시 시작하기
          </button>
        </div>
      </div>
    </div>
  );
}
