export default function DepthBadge({ depth }: { depth: number }) {
  return (
    <div className="inline-flex items-center gap-1.5 rounded-full border-2 border-[var(--border-strong)] bg-[var(--surface-2)] px-4 py-1.5 font-black text-[var(--text)]">
      <span aria-hidden>⛏️</span>
      <span className="text-lg">깊이 {depth}층</span>
    </div>
  );
}
