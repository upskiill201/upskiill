import {
  answerQuestion,
  currentQuestion,
  isFixing,
  mistakesLeft,
  nextQuestion,
  quizDone,
  reachedMistakes,
  startQuiz,
  type QuizQueue,
} from '../quizQueue';

/** Answer the current question and move on. */
const step = (q: QuizQueue, correct: boolean) => nextQuestion(answerQuestion(q, correct));

describe('quiz queue', () => {
  it('asks each question once when every answer is right', () => {
    let q = startQuiz(3);
    const asked: (number | null)[] = [];
    while (!quizDone(q)) {
      asked.push(currentQuestion(q));
      q = step(q, true);
    }
    expect(asked).toEqual([0, 1, 2]);
    expect(q.solved).toEqual([0, 1, 2]);
  });

  it('brings a missed question back after the first pass', () => {
    let q = startQuiz(3);
    q = step(q, true); // 0
    q = step(q, false); // 1 missed
    q = step(q, true); // 2
    expect(reachedMistakes(q)).toBe(true);
    expect(isFixing(q)).toBe(true);
    expect(currentQuestion(q)).toBe(1);
    expect(mistakesLeft(q)).toBe(1);
    q = step(q, true);
    expect(quizDone(q)).toBe(true);
    expect(q.solved.sort()).toEqual([0, 1, 2]);
  });

  it('keeps bringing it back until it is right', () => {
    let q = startQuiz(1);
    q = step(q, false);
    q = step(q, false);
    expect(quizDone(q)).toBe(false);
    expect(currentQuestion(q)).toBe(0);
    q = step(q, true);
    expect(quizDone(q)).toBe(true);
  });

  it('has no mistakes round without mistakes', () => {
    let q = startQuiz(2);
    q = step(q, true);
    q = step(q, true);
    expect(reachedMistakes(q)).toBe(false);
    expect(mistakesLeft(q)).toBe(0);
  });
});
