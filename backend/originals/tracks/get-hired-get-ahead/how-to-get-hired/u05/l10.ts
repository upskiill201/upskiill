import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 2 · Chapter 5 · Lesson 10 — Checkpoint 2. Reviews lessons 6–9. Story beat: rehearsal with David. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Checkpoint: rehearsal',
  summary: 'Wednesday night. David plays Brenda again. He is much tougher this time: long silences, "That\'s our standard offer." Clinton stays calm. Reading the letter, whether to negotiate, the ask, and asking together.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Read an offer letter for what to clarify', 'Make a clear, reasoned ask', 'Keep the conversation on the same side'],
  learn: [
    {
      kind: 'story',
      title: 'Tough Brenda',
      beats: [
        { speaker: 'narrator', text: 'David, playing Brenda, folds his arms.' },
        { speaker: 'david', text: '(as Brenda) That\'s our standard offer.' },
        { speaker: 'narrator', text: 'Clinton breathes, smiles and doesn\'t fill the silence. Then David drops character.' },
        { speaker: 'david', text: 'OK, that was good. Quiz time.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 2: rehearsal with David.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the ask in order.',
        lines: ['Start with enthusiasm', 'Give your reason', 'Make one clear ask', 'Stop talking', 'Listen, then respond'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Clarify, or ask for?',
        groups: ['Clarify', 'Ask for'],
        items: [
          { text: 'Take-home pay', group: 0 },
          { text: 'An earlier review', group: 1 },
          { text: 'How probation works', group: 0 },
          { text: 'A training budget', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What usually puts an offer at risk?',
        options: [
          { text: 'A polite, reasoned question', why: 'That rarely does.' },
          { text: 'Demands, ultimatums or lies' },
          { text: 'Gratitude', why: 'Always fine.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the "against" line.',
        lines: ['I really want to make this work.', 'I know my worth, so pay up.', 'Is there any flexibility?'],
        bug: 1,
        explanation: 'A demand. Stay on the same side.',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick Clinton\'s answer to "That\'s our standard offer."',
        from: 'david',
        message: '(as Brenda) That\'s our standard offer.',
        options: [
          { text: '"Then I\'m out."', why: 'Try an alternative first.' },
          { text: '"Oh. Sorry. Forget it."', why: 'Calmly try another option.' },
          { text: '"I understand. Is there any flexibility on other parts, like a review after probation?"' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each offer line to what it means.',
        pairs: [
          ['Before tax and contributions', 'Gross, not take-home'],
          ['Six-month probation', 'A trial period'],
          ['Reviewed annually', 'A year until a pay change'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'What should Clinton do right after asking?',
        options: [
          { text: 'Stop talking and let them answer' },
          { text: 'Apologise', why: 'That undoes the ask.' },
          { text: 'Ask again louder', why: 'Pause.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete David\'s notes.',
        template: 'Ask politely, [[1]], with a reason. Then [[2]].',
        blanks: [['once'], ['pause', 'listen']],
        distractors: ['twice', 'shout', 'apologise'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What number will Clinton ask for, in francs? (a number)',
        answers: ['330000', '330,000', '330 000'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Often negotiable, or usually fixed?',
        groups: ['Often negotiable', 'Usually fixed'],
        items: [
          { text: 'Start date', group: 0 },
          { text: 'Set pay bands on a big scheme', group: 1 },
          { text: 'Review timing', group: 0 },
          { text: 'Legal notice minimums', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What makes Clinton\'s reason strong?',
        options: [
          { text: 'It\'s about his rent', why: 'Tie it to value and the market.' },
          { text: 'It\'s emotional', why: 'Tie it to evidence.' },
          { text: 'It\'s tied to the role and to his research' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Which part of negotiating feels hardest for you: asking, the silence, or hearing no?',
    starters: ['The hardest part is...', 'To practise, I\'ll...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Rehearse your ask with a friend playing a tough recruiter. Ask them to say "That\'s our standard offer" at least once.',
  },
  notes: 'Checkpoint 2. Reviews l06–l09.',
};

export default lesson;
