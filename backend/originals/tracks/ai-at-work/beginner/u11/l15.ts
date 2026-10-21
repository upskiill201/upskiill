import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 11 · Lesson 15 — Checkpoint 3. Measuring, wasted time, skills, teaching. */
const lesson: OriginalLesson = {
  key: 'l15',
  title: 'Checkpoint: measure, trim, sharpen, teach',
  summary: 'Measuring time saved, cutting wasteful habits, keeping your skills sharp and teaching others. Show you can make AI habits that really pay off.',
  minutes: 14,
  milestone: 'CHECKPOINT',
  outcomes: ['Show you can measure and trim your AI habits', 'Show you can keep skills sharp and teach others'],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Checkpoint 3. Tobi wants proof AI is worth it.', replies: ['Ready'] },
        { tey: 'Warm-up: what must you include when timing an AI task?', replies: ['The checking time'] },
        { tey: 'Always. Go.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint: proving the value.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the measurement.',
        lines: ['Pick 3 weekly tasks', 'Time before', 'Time with AI, incl. checks', 'Note quality', 'Report honestly'],
      },
      {
        kind: 'mcq',
        prompt: '3 minutes with AI plus 15 minutes fixing, vs 12 minutes by hand. Saved?',
        options: [
          { text: 'Nothing; it took 18 minutes' },
          { text: '9 minutes', why: 'Count fixing.' },
          { text: '15 minutes', why: 'It took longer.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Faster with AI, or yourself?',
        groups: ['AI', 'Yourself'],
        items: [
          { text: 'Summarise a long report', group: 0 },
          { text: '"See you at 3"', group: 1 },
          { text: 'First draft of a proposal', group: 0 },
          { text: 'Fix one typo', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'The answer is weak. Best move?',
        options: [
          { text: 'Add the missing context and ask once' },
          { text: 'Regenerate ten times', why: 'Time sink.' },
          { text: 'Give up on AI', why: 'Fix the request.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the study to the finding.',
        pairs: [
          ['Noy and Zhang (2023)', 'Writing about 40% faster'],
          ['Brynjolfsson et al. (2023)', 'Novice agents about 34% more productive'],
          ['Dell\'Acqua et al. (2023)', 'The jagged frontier'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'My team uses AI for everything now. Good?',
        prompt: 'Best reply from Ada?',
        options: [
          { text: 'Mostly, but have them draft some things first and compare. Their judgement catches AI mistakes on the tricky tasks.' },
          { text: 'Perfect.', why: 'Skills can fade.' },
          { text: 'Ban it.', why: 'Balance.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the rules.',
        template: 'Count the [[1]] time. Draft first sometimes, then [[2]].',
        blanks: [['checking'], ['compare']],
        distractors: ['lunch', 'copy'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Outside the frontier, AI users were about how many points less likely to be right?',
        answers: ['19'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order the one-hour teaching session.',
        lines: ['Their work', 'Before and after', 'They try it', 'Teach the check', 'Leave a template'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line in Ada\'s report is misleading?',
        lines: ['Follow-ups: 25 to 8 min incl. checks', 'Status: 40 to 10 min', 'Briefs: 40% faster, per a study', 'Contracts: not used'],
        bug: 2,
        fix: 'Briefs: 3 hours to 1.5 hours, incl. checks.',
        explanation: 'Use your own numbers.',
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the learning request.',
        tiles: ['Tell', 'me', 'what', 'I', 'missed'],
        distractors: ['Do', 'it'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Keeps skills sharp, or fades them?',
        groups: ['Sharp', 'Fades'],
        items: [
          { text: 'Draft, then compare', group: 0 },
          { text: 'Paste answers unread', group: 1 },
          { text: 'Explain in your own words', group: 0 },
          { text: 'Never doing the task yourself', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why let learners type their own prompt in training?',
        options: [
          { text: 'Doing it is how they learn' },
          { text: 'To save time', why: 'For learning.' },
          { text: 'No reason', why: 'Active practice.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'Why report where AI didn\'t help?',
        options: [
          { text: 'It makes the report trustworthy and shows where not to use AI' },
          { text: 'To look modest', why: 'For accuracy.' },
          { text: 'Never report that', why: 'It\'s useful.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Which of the four habits matters most for your team right now?',
    starters: ['The habit:', 'Because...'],
  },
  notes: 'Checkpoint for Unit 11 lessons 11-14.',
};

export default lesson;
