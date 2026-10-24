import type { SVGProps } from 'react';

export type MoleMood = 'idle' | 'happy' | 'oops' | 'excited';

interface MoleProps extends SVGProps<SVGSVGElement> {
  mood?: MoleMood;
}

/** The game's mascot: a friendly mole face, built entirely from shapes. */
export default function Mole({ mood = 'idle', ...props }: MoleProps) {
  return (
    <svg viewBox="0 0 120 110" fill="none" {...props}>
      {/* ears */}
      <circle cx="26" cy="30" r="14" fill="#a9825a" />
      <circle cx="94" cy="30" r="14" fill="#a9825a" />
      {/* head */}
      <circle cx="60" cy="58" r="46" fill="#bb9268" />
      <ellipse cx="60" cy="78" rx="26" ry="18" fill="#e8d2ad" />

      {/* eyes */}
      {mood === 'happy' || mood === 'excited' ? (
        <>
          <path d="M38 52 q7 9 14 0" stroke="#3a2a18" strokeWidth="4" fill="none" strokeLinecap="round" />
          <path d="M68 52 q7 9 14 0" stroke="#3a2a18" strokeWidth="4" fill="none" strokeLinecap="round" />
        </>
      ) : mood === 'oops' ? (
        <>
          <circle cx="45" cy="53" r="5" fill="#3a2a18" />
          <circle cx="75" cy="53" r="5" fill="#3a2a18" />
          <path d="M36 42 q9 -6 16 -1" stroke="#3a2a18" strokeWidth="3.5" fill="none" strokeLinecap="round" />
          <path d="M68 41 q9 -5 16 1" stroke="#3a2a18" strokeWidth="3.5" fill="none" strokeLinecap="round" />
        </>
      ) : (
        <>
          <circle cx="45" cy="53" r="5" fill="#3a2a18" />
          <circle cx="75" cy="53" r="5" fill="#3a2a18" />
        </>
      )}

      {/* blush */}
      {(mood === 'happy' || mood === 'excited') && (
        <>
          <ellipse cx="33" cy="68" rx="7" ry="4.5" fill="#f3a9a0" opacity="0.8" />
          <ellipse cx="87" cy="68" rx="7" ry="4.5" fill="#f3a9a0" opacity="0.8" />
        </>
      )}

      {/* nose */}
      <ellipse cx="60" cy="72" rx="8" ry="6" fill="#e39aa0" />

      {/* mouth */}
      {mood === 'happy' || mood === 'excited' ? (
        <path d="M48 84 q12 12 24 0" stroke="#3a2a18" strokeWidth="3.5" fill="none" strokeLinecap="round" />
      ) : mood === 'oops' ? (
        <ellipse cx="60" cy="87" rx="6" ry="7" fill="#3a2a18" />
      ) : (
        <path d="M50 85 q10 4 20 0" stroke="#3a2a18" strokeWidth="3" fill="none" strokeLinecap="round" />
      )}
    </svg>
  );
}
