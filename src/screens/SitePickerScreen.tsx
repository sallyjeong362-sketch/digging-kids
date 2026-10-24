import { getCategory } from '../data/categories';
import { getSitesForCategory } from '../data/sites';
import Mole from '../components/Mole';
import TopBar from '../components/TopBar';

export default function SitePickerScreen({
  categoryId,
  onPickSite,
  onHome,
}: {
  categoryId: string;
  onPickSite: (siteId: string) => void;
  onHome: () => void;
}) {
  const category = getCategory(categoryId);
  const sites = getSitesForCategory(categoryId);

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <TopBar onHome={onHome} />

      <div className="mx-auto max-w-lg px-4 py-6 text-center sm:py-10">
        <Mole mood="idle" className="mx-auto h-20 w-20 sm:h-24 sm:w-24" />
        <h1 className="mt-3 text-2xl font-black text-[var(--text)] sm:text-3xl">
          {category?.emoji} {category?.name} 중에서, 뭐부터 파볼까?
        </h1>
        <p className="mt-1.5 text-sm font-semibold text-[var(--text-muted)]">하나를 골라서 깊이 파고들어봐요!</p>

        <div className="mt-7 flex flex-col gap-3.5">
          {sites.map((site) => (
            <button
              key={site.id}
              onClick={() => onPickSite(site.id)}
              style={{ ['--cat-tint' as string]: category?.tint, ['--cat-tint-dark' as string]: category?.tintDark }}
              className="cat-art flex items-center gap-4 rounded-2xl border-4 border-[var(--border)] px-5 py-4 text-left transition active:scale-95 active:border-[var(--accent)]"
            >
              <span className="text-4xl">{site.emoji}</span>
              <span className="flex-1">
                <span className="block text-lg font-black text-[var(--text)]">{site.name}</span>
                <span className="block text-xs font-bold text-[var(--text-muted)]">3단계로 깊이 파보기</span>
              </span>
              <span className="text-2xl">→</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
