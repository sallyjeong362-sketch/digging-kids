export type QuestionType = 'ox' | 'choice';

export interface Category {
  id: string;
  name: string;
  emoji: string;
  tint: string;
  tintDark: string;
}

export interface DigQuestion {
  depth: 1 | 2 | 3;
  emoji: string;
  question: string;
  type: QuestionType;
  /** For 'ox': always ['O', 'X']. For 'choice': 2-3 labeled options. */
  choices: string[];
  correctIndex: number;
  funFact: string;
}

/** One concrete subject (e.g. "기린") to dig into — the unit of depth. */
export interface DigSite {
  id: string;
  categoryId: string;
  name: string;
  emoji: string;
  /** Exactly 3, ordered shallow -> deep. */
  questions: DigQuestion[];
  /** Suggested next sites to keep digging into once this one is done. */
  nextSiteIds: string[];
}

export interface CategoryBadge {
  categoryId: string;
  earnedAt: number;
}
