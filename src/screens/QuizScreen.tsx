import { useState } from 'react';
import { getCategory } from '../data/categories';
import { getQuestionsForCategory } from '../data/questions';
import { useGameStore } from '../store/useGameStore';
import Mole, { type MoleMood } from '../components/Mole';
import TopBar from '../components/TopBar';

export default function QuizScreen({
  categoryId,
  onFinish,
  onHome,
}: {
  categoryId: string;
  onFinish: (categoryId: string) => void;
  onHome: () => void;
}) {
  const category = getCategory(categoryId);
  const questions = getQuestionsForCategory(categoryId);
  const answerQuestion = useGameStore((s) => s.answerQuestion);
  const completeCategory = useGameStore((s) => s.completeCategory);

  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);

  const question = questions[index];
  const isAnswered = selected !== null;
  const isCorrect = isAnswered && selected === question.correctIndex;
  const moleMood: MoleMood = !isAnswered ? 'idle' : isCorrect ? 'excited' : 'oops';

  function handleSelect(choiceIndex: number) {
    if (isAnswered) return;
    setSelected(choiceIndex);
    answerQuestion(question.id, choiceIndex === question.correctIndex);
  }

  function handleNext() {
    if (index + 1 < questions.length) {
      setIndex(index + 1);
      setSelected(null);
    } else {
      completeCategory(categoryId);
      onFinish(categoryId);
    }
  }

  const isOx = question.type === 'ox';

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <TopBar onHome={onHome} />

      <div className="mx-auto max-w-xl px-4 py-5 sm:px-6 sm:py-8">
        {/* progress dots */}
        <div className="mb-5 flex items-center justify-center gap-2">
          <span className="text-2xl">{category?.emoji}</span>
          <div className="flex gap-1.5">
            {questions.map((q, i) => (
              <span
                key={q.id}
                className={`h-2.5 w-7 rounded-full transition-colors ${
                  i < index ? 'bg-[var(--accent)]' : i === index ? 'bg-[var(--border-strong)]' : 'bg-[var(--border)]'
                }`}
              />
            ))}
          </div>
        </div>

        <div key={question.id} className="animate-pop-in rounded-[32px] border-4 border-[var(--border)] bg-[var(--surface)] p-6 text-center sm:p-8">
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

        {/* mole feedback */}
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
            {index + 1 < questions.length ? '다음 문제 →' : '결과 보러 가기 🎉'}
          </button>
        )}
      </div>
    </div>
  );
}
