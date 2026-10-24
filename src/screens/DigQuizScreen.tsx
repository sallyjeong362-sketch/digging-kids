import { useState } from 'react';
import { getSite } from '../data/sites';
import { useGameStore } from '../store/useGameStore';
import Mole, { type MoleMood } from '../components/Mole';
import TopBar from '../components/TopBar';
import DepthBadge from '../components/DepthBadge';

export default function DigQuizScreen({
  siteId,
  chain,
  onSiteComplete,
  onHome,
}: {
  siteId: string;
  chain: string[];
  onSiteComplete: (siteId: string, chain: string[]) => void;
  onHome: () => void;
}) {
  const site = getSite(siteId);
  const answerQuestion = useGameStore((s) => s.answerQuestion);
  const completeSite = useGameStore((s) => s.completeSite);

  const [qIndex, setQIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);

  if (!site) return null;

  const question = site.questions[qIndex];
  const isAnswered = selected !== null;
  const isCorrect = isAnswered && selected === question.correctIndex;
  const moleMood: MoleMood = !isAnswered ? 'idle' : isCorrect ? 'excited' : 'oops';
  const absoluteDepth = chain.length * 3 + question.depth;
  const isOx = question.type === 'ox';

  function handleSelect(choiceIndex: number) {
    if (isAnswered) return;
    setSelected(choiceIndex);
    answerQuestion(site!.id, question.depth, choiceIndex === question.correctIndex);
  }

  function handleNext() {
    if (qIndex + 1 < site!.questions.length) {
      setQIndex(qIndex + 1);
      setSelected(null);
    } else {
      completeSite(site!.id, site!.categoryId);
      onSiteComplete(site!.id, [...chain, site!.id]);
    }
  }

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <TopBar onHome={onHome} />

      <div className="mx-auto max-w-xl px-4 py-5 sm:px-6 sm:py-8">
        <div className="mb-5 flex flex-col items-center gap-2.5">
          <DepthBadge depth={absoluteDepth} />
          <div className="flex items-center gap-2 text-sm font-bold text-[var(--text-muted)]">
            <span className="text-xl">{site.emoji}</span>
            {site.name} 파고드는 중 · {qIndex + 1}/{site.questions.length}
          </div>
          <div className="flex gap-1.5">
            {site.questions.map((q, i) => (
              <span
                key={q.depth}
                className={`h-2.5 w-7 rounded-full transition-colors ${
                  i < qIndex ? 'bg-[var(--accent)]' : i === qIndex ? 'bg-[var(--border-strong)]' : 'bg-[var(--border)]'
                }`}
              />
            ))}
          </div>
        </div>

        <div key={question.depth} className="animate-pop-in rounded-[32px] border-4 border-[var(--border)] bg-[var(--surface)] p-6 text-center sm:p-8">
          <div className="text-7xl sm:text-8xl">{question.emoji}</div>
          <h2 className="mt-4 text-xl font-black leading-snug text-[var(--text)] sm:text-2xl">{question.question}</h2>

          <div className={`mt-6 grid gap-3 ${isOx ? 'grid-cols-2' : 'grid-cols-1'}`}>
            {question.choices.map((choice, i) => {
              const isThisCorrect = i === question.correctIndex;
              const isThisSelected = i === selected;
              let style = 'border-[var(--border)] bg-[var(--surface-2)] text-[var(--text)] hover:border-[var(--border-strong)]';
              if (isAnswered) {
                if (isThisCorrect) style = 'border-[var(--correct)] bg-[var(--accent-soft)] text-[var(--accent-soft-text)]';
                else if (isThisSelected) style = 'border-[var(--wrong)] bg-[var(--wrong)]/10 text-[var(--wrong)]';
                else style = 'border-[var(--border)] bg-[var(--surface-2)] text-[var(--text-faint)] opacity-60';
              }
              return (
                <button
                  key={i}
                  onClick={() => handleSelect(i)}
                  disabled={isAnswered}
                  className={`relative rounded-2xl border-4 px-5 font-black transition active:scale-95 ${style} ${
                    isOx ? 'py-7 text-4xl sm:text-5xl' : 'py-4 text-lg sm:text-xl'
                  } ${isAnswered && isThisSelected && isCorrect ? 'animate-pop-in' : ''} ${
                    isAnswered && isThisSelected && !isCorrect ? 'animate-shake' : ''
                  }`}
                >
                  {choice}
                  {isAnswered && isThisCorrect && <span className="ml-1.5">✅</span>}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-5 flex items-start gap-3">
          <Mole mood={moleMood} className={`h-16 w-16 shrink-0 sm:h-20 sm:w-20 ${!isAnswered ? 'animate-wiggle' : 'animate-pop-in'}`} />
          <div className="relative flex-1 rounded-2xl rounded-tl-none border-3 border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm font-bold text-[var(--text)] sm:text-base">
            {!isAnswered && '정답이 뭘까? 하나를 골라봐!'}
            {isAnswered && isCorrect && '우와, 정답이야! 참 잘했어요 ⭐'}
            {isAnswered && !isCorrect && `아깝다! 정답은 "${question.choices[question.correctIndex]}"이었어요.`}
            {isAnswered && <p className="mt-1.5 font-semibold text-[var(--text-muted)]">{question.funFact}</p>}
          </div>
        </div>

        {isAnswered && (
          <button
            onClick={handleNext}
            className="mt-5 w-full animate-pop-in rounded-full bg-[var(--accent)] py-4 text-lg font-black text-white shadow-lg transition hover:bg-[var(--accent-hover)] active:scale-95"
          >
            {qIndex + 1 < site.questions.length ? '한 층 더 파고들기 ⛏️' : '다 팠어요! 🎉'}
          </button>
        )}
      </div>
    </div>
  );
}
