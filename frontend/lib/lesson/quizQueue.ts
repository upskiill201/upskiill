/**
 * The Apply quiz as a queue — Duolingo's "fix your mistakes".
 *
 * Every question is asked once. A question answered wrong goes to the back
 * of the queue (after the learner has seen the right answer), and comes back
 * once the first pass is over, until it's answered right. So a lesson never
 * ends on a mistake the learner didn't get to fix.
 */

export interface QuizQueue {
  /** Question indices, in the order they'll be asked. */
  order: number[];
  /** Position in `order`. */
  pos: number;
  /** Questions answered right (eventually). */
  solved: number[];
  /** Length of the first pass — everything after it is a retry. */
  firstPass: number;
}

export function startQuiz(questionCount: number): QuizQueue {
  const order = Array.from({ length: questionCount }, (_, i) => i);
  return { order, pos: 0, solved: [], firstPass: questionCount };
}

export function currentQuestion(q: QuizQueue): number | null {
  return q.order[q.pos] ?? null;
}

/** Record the answer to the current question. */
export function answerQuestion(q: QuizQueue, correct: boolean): QuizQueue {
  const i = currentQuestion(q);
  if (i === null) return q;
  if (correct) return q.solved.includes(i) ? q : { ...q, solved: [...q.solved, i] };
  return { ...q, order: [...q.order, i] };
}

export function nextQuestion(q: QuizQueue): QuizQueue {
  return { ...q, pos: q.pos + 1 };
}

/** Past the first pass: every question from here is a mistake being fixed. */
export function isFixing(q: QuizQueue): boolean {
  return q.pos >= q.firstPass;
}

/** Exactly at the start of the retries — time for "Let's fix your mistakes". */
export function reachedMistakes(q: QuizQueue): boolean {
  return q.pos === q.firstPass && q.order.length > q.firstPass;
}

export function quizDone(q: QuizQueue): boolean {
  return q.pos >= q.order.length;
}

/** How many mistakes are still waiting, counting the current one. */
export function mistakesLeft(q: QuizQueue): number {
  return Math.max(0, q.order.length - Math.max(q.pos, q.firstPass));
}
