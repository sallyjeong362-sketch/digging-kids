import { useEffect, useMemo } from 'react';
import { getSite } from '../data/sites';
import { useGameStore } from '../store/useGameStore';
import Mole from '../components/Mole';
import TopBar from '../components/TopBar';
import DepthBadge from '../components/DepthBadge';

const CONFETTI_COLORS = ['#ffc93c', '#46b36a', '#ef6a5e', '#5e9bd9', '#c77dd1'];

function Confetti() {
  const pieces = useMemo(
    () =>
      Array.from({ length: 26 }, (_, i) => ({
        left: Math.random() * 100,
        delay: Math.random() * 0.6,
        duration: 1.6 + Math.random() * 1.2,
        color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
        size: 8 + Math.random() * 8,
        rotate: Math.random() * 360,
      })),
    [],
  );
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {pieces.map((p, i) => (
        <span
          key={i}
          className="absolute top-0 rounded-sm"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size * 0.6,
            background: p.color,
            transform: `rotate(${p.rotate}deg)`,
            animation: `confetti-fall ${p.duration}s ${p.delay}s ease-in forwards`,
          }}
        />
      ))}
      <style>{`
        @keyframes confetti-fall {
          0% { transform: translateY(-10px) rotate(0deg); opacity: 1; }
          100% { transform: translateY(560px) rotate(260deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

export default function CelebrationScreen({
  chain,
  onHome,
  onCollection,
}: {
  chain: string[];
  onHome: () => void;
  onCollection: () => void;
}) {
  const stars = useGameStore((s) => s.stars);
  const bestChainDepth = useGameStore((s) => s.bestChainDepth);
  const recordChain = useGameStore((s) => s.recordChain);

  const depth = chain.length * 3;
  const isNewRecord = depth > 0 && depth >= bestChainDepth;
  const sites = chain.map((id) => getSite(id)).filter((s) => !!s);

  useEffect(() => {
    recordChain(depth);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[var(--bg)]">
      <Confetti />
      <TopBar onHome={onHome} />

      <div className="relative mx-auto flex max-w-lg flex-col items-center px-4 py-10 text-center sm:py-14">
        <span className="flex h-28 w-28 items-center justify-center rounded-full bg-[var(--accent-soft)] text-6xl sm:h-32 sm:w-32 sm:text-7xl">
          {isNewRecord && depth > 0 ? '🏆' : '🎉'}
        </span>
        <h1 className="mt-5 text-2xl font-black text-[var(--text)] sm:text-3xl">
          {isNewRecord && depth > 0 ? '최고 기록 경신!' : '오늘도 잘 팠어요!'}
        </h1>
        <div className="mt-3">
          <DepthBadge depth={depth} />
        </div>
        <Mole mood="excited" className="mt-4 h-24 w-24 sm:h-28 sm:w-28" />

        {sites.length > 0 && (
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
            {sites.map((s, i) => (
              <span key={s!.id} className="flex items-center gap-1 text-sm font-bold text-[var(--text-muted)]">
                {i > 0 && <span className="text-[var(--text-faint)]">→</span>}
                <span className="text-xl">{s!.emoji}</span>
                {s!.name}
              </span>
            ))}
          </div>
        )}

        <p className="mt-4 text-lg font-bold text-[var(--text)]">
          별 <span className="text-[var(--accent-soft-text)]">⭐ {stars}</span>개를 모았어요!
        </p>

        <div className="mt-8 flex w-full flex-col gap-3 sm:w-80">
          <button
            onClick={onHome}
            className="w-full rounded-full bg-[var(--accent)] py-4 text-lg font-black text-white shadow-lg transition hover:bg-[var(--accent-hover)] active:scale-95"
          >
            또 다른 주제 파러 가기
          </button>
          <button
            onClick={onCollection}
            className="w-full rounded-full border-4 border-[var(--border-strong)] bg-[var(--surface)] py-3.5 text-base font-black text-[var(--text)] transition hover:bg-[var(--surface-2)] active:scale-95"
          >
            내 뱃지 모음 보기 🏅
          </button>
        </div>
      </div>
    </div>
  );
}
