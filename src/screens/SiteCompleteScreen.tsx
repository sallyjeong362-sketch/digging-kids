import { getSite } from '../data/sites';
import { getCategory } from '../data/categories';
import Mole from '../components/Mole';
import TopBar from '../components/TopBar';
import DepthBadge from '../components/DepthBadge';

export default function SiteCompleteScreen({
  siteId,
  chain,
  onDigDeeper,
  onStop,
  onHome,
}: {
  siteId: string;
  chain: string[];
  onDigDeeper: (nextSiteId: string) => void;
  onStop: () => void;
  onHome: () => void;
}) {
  const site = getSite(siteId);
  if (!site) return null;
  const category = getCategory(site.categoryId);
  const depth = chain.length * 3;
  const nextSites = site.nextSiteIds.map((id) => getSite(id)).filter((s) => !!s);

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <TopBar onHome={onHome} />

      <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-8 text-center sm:py-12">
        <Mole mood="excited" className="h-24 w-24 sm:h-28 sm:w-28" />
        <h1 className="mt-3 text-2xl font-black text-[var(--text)] sm:text-3xl">
          {category?.emoji} {site.name}, 다 팠어요!
        </h1>
        <div className="mt-3">
          <DepthBadge depth={depth} />
        </div>
        <p className="mt-4 max-w-xs text-sm font-bold text-[var(--text-muted)]">
          여기서 더 파고들어볼까요? 아니면 오늘은 여기까지!
        </p>

        <div className="mt-7 flex w-full flex-col gap-3">
          <p className="text-xs font-black uppercase tracking-wide text-[var(--text-faint)]">더 깊이 파볼까?</p>
          {nextSites.map((next) => (
            <button
              key={next!.id}
              onClick={() => onDigDeeper(next!.id)}
              style={{ ['--cat-tint' as string]: getCategory(next!.categoryId)?.tint, ['--cat-tint-dark' as string]: getCategory(next!.categoryId)?.tintDark }}
              className="cat-art flex items-center gap-3 rounded-2xl border-4 border-[var(--border-strong)] px-4 py-3.5 text-left transition active:scale-95"
            >
              <span className="text-3xl">{next!.emoji}</span>
              <span className="flex-1">
                <span className="block text-base font-black text-[var(--text)]">{next!.name}</span>
                <span className="block text-xs font-bold text-[var(--text-muted)]">파고들기 →</span>
              </span>
            </button>
          ))}
        </div>

        <button
          onClick={onStop}
          className="mt-7 w-full rounded-full border-4 border-[var(--border-strong)] bg-[var(--surface)] py-3.5 text-base font-black text-[var(--text)] transition hover:bg-[var(--surface-2)] active:scale-95"
        >
          오늘은 그만 파고 결과 보기 🎉
        </button>
      </div>
    </div>
  );
}
