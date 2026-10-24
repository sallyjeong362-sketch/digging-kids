export type QuestionType = 'ox' | 'choice';

export interface Category {
  id: string;
  name: string;
  emoji: string;
  tint: string;
  tintDark: string;
}

export interface Question {
  id: string;
  categoryId: string;
  emoji: string;
  question: string;
  type: QuestionType;
  /** For 'ox': always ['O', 'X']. For 'choice': 2-3 labeled options. */
  choices: string[];
  correctIndex: number;
  funFact: string;
}

export interface Badge {
  categoryId: string;
  earnedAt: number;
}
