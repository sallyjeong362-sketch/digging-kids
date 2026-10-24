import { useGameStore } from '../store/useGameStore';
import Mole from './Mole';

export default function TopBar({ onHome, onCollection }: { onHome?: () => void; onCollection?: () => void }) {
  const stars = useGameStore((s) => s.stars);
  return (
    <header className="sticky top-0 z-20 flex items-center justify-between border-b-4 border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 sm:px-6">
      <button onClick={onHome} className="flex items-center gap-2" aria-label="홈으로">
        <Mole mood="happy" className="h-10 w-10 sm:h-11 sm:w-11" />
        <span className="text-lg font-black tracking-tight text-[var(--text)] sm:text-xl">두더지 퀴즈</span>
      </button>

      <div className="flex items-center gap-2">
        <span className="flex items-center gap-1.5 rounded-full border-2 border-[var(--border-strong)] bg-[var(--surface-2)] px-3.5 py-1.5 text-base font-black text-[var(--text)] tabular-nums sm:text-lg">
          <span aria-hidden>⭐</span>
          {stars}
        </span>
        {onCollection && (
          <button
            onClick={onCollection}
            className="rounded-full border-2 border-[var(--border-strong)] bg-[var(--surface)] px-3.5 py-1.5 text-xl transition hover:bg-[var(--surface-2)] active:scale-95"
            aria-label="내 뱃지 모음"
          >
            🏅
          </button>
        )}
      </div>
    </header>
  );
}
