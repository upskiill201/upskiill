import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 2 · Chapter 5 · Lesson 15 — Checkpoint 3. Reviews lessons 11–14. Story beat: the decision. */
const lesson: OriginalLesson = {
  key: 'l15',
  title: 'Checkpoint: the decision',
  summary: 'Friday morning. Clinton has decided: Njangi Pay. Before he makes two phone calls, one happy and one hard, Mrs Ewane gives him a last quiz. Honesty, beyond salary, counter-offers and choosing.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Negotiate honestly', 'Ask beyond salary and handle counter-offers', 'Choose between offers with a method'],
  learn: [
    {
      kind: 'story',
      title: 'Friday, 8am',
      beats: [
        { speaker: 'narrator', text: 'Friday, 8am. The careers office. Clinton has decided.' },
        { speaker: 'ewane', text: 'Njangi Pay. Good. You have two calls to make today, Mr Clinton, and the second one is harder. First: quiz.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 3: before the calls.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why didn\'t Clinton invent a higher Kmer offer?',
        options: [
          { text: 'He forgot', why: 'He chose honesty.' },
          { text: 'It\'s a lie, and in a small industry it can easily backfire' },
          { text: 'Brenda told him not to', why: 'He chose honesty himself.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Reasonable ask beyond salary, or not?',
        groups: ['Reasonable', 'Not'],
        items: [
          { text: 'Review after probation', group: 0 },
          { text: 'Guaranteed promotion in 3 months', group: 1 },
          { text: 'Training budget', group: 0 },
          { text: 'A company car', group: 1 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Put the decision method in order.',
        lines: ['Pick your top three priorities', 'Score each offer', 'Do the gut check', 'Talk to one or two people'],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that burns goodwill after a counter-offer.',
        lines: ['Thank you, I appreciate that.', 'Not enough. Try harder.', 'Could you send it in writing?'],
        bug: 1,
        explanation: 'She already moved. Accept with thanks or one small ask.',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best answer to Mrs Ewane.',
        from: 'ewane',
        message: 'Brenda offered 315,000 and a review. Why did you accept, rather than push for 330?',
        options: [
          { text: 'I was scared.', why: 'He decided using his plan.' },
          { text: 'I didn\'t think about it.', why: 'He compared it with his plan.' },
          { text: 'It was inside my range, above my walk-away, and she\'d already moved. Pushing more would have cost goodwill.' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each situation to a good response.',
        pairs: [
          ['Salary is fixed', 'Ask for a review or training instead'],
          ['They meet you halfway', 'Accept with thanks'],
          ['A friend says "lie"', 'Use only real alternatives'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'What did Clinton\'s gut check show?',
        options: [
          { text: 'Relief at Njangi, sadness about leaving Mr Tamba' },
          { text: 'He wanted Kmer', why: 'Sadness about leaving isn\'t wanting to stay.' },
          { text: 'Nothing', why: 'It showed relief at Njangi Pay.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Mrs Ewane\'s notes.',
        template: 'Never [[1]] an offer. A no to your ask is not a no to [[2]].',
        blanks: [['invent', 'inflate'], ['you']],
        distractors: ['mention', 'them', 'money'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many minutes is Clinton\'s walk to Kmer? (a number)',
        answers: ['20', 'twenty'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Honest or dishonest?',
        groups: ['Honest', 'Dishonest'],
        items: [
          { text: 'I have a real offer from Kmer', group: 0 },
          { text: 'Three companies want me (untrue)', group: 1 },
          { text: 'My ask is based on research', group: 0 },
          { text: 'Kmer offered 380k (it was 280k)', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Which call is harder today?',
        options: [
          { text: 'Accepting Njangi Pay', why: 'That\'s the happy one.' },
          { text: 'Calling his mum', why: 'That\'s a happy one too.' },
          { text: 'Telling Mr Tamba no' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Which part of this chapter would change how you handle your next offer the most?',
    starters: ['The biggest change:', 'Because...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Write your own "before I negotiate" list: range, target, walk-away, top two asks beyond salary, top three priorities.',
  },
  notes: 'Checkpoint 3. Reviews l11–l14.',
};

export default lesson;
