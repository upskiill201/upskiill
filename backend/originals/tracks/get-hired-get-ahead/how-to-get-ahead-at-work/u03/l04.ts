import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 3 · Chapter 3 · Lesson 4 — finding the promotion criteria. Step-by-step. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Find the criteria',
  summary: 'Clinton realises he asked for a promotion without knowing what the next level actually requires. Here are four ways to find out, even at a company with no ladder.',
  minutes: 12,
  outcomes: ['Find written promotion criteria', 'Learn the unwritten ones', 'Write the criteria in your own words'],
  learn: [
    {
      kind: 'steps',
      title: 'Four ways to find the criteria',
      steps: [
        { title: '1. Read the career ladder', body: 'Njangi Pay has one: a table of levels and expectations. Read your level and the next one side by side. Note the differences.' },
        { title: '2. Ask your manager', body: '"What\'s the biggest difference between a Graduate Developer and a Developer here, in practice?" Ngozi: "Developers don\'t wait to be told what to do next."' },
        { title: '3. Watch people at the next level', body: 'What do Developers on the team do that Clinton doesn\'t yet? They write design docs, lead small projects, review others\' designs.' },
        { title: '4. Write it in your own words', body: 'Clinton\'s version: "Own features end to end. Lead work that involves others. Make design decisions and explain them. Help others grow."' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Read the ladder, ask your manager, watch the next level, write it in your own words.',
    },
  ],
  apply: {
    scenario: 'Clinton finds the criteria.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the steps in order.',
        lines: ['Read the career ladder', 'Ask your manager', 'Watch people at the next level', 'Write it in your own words'],
      },
      {
        kind: 'mcq',
        prompt: 'What did Ngozi say is the biggest difference?',
        options: [
          { text: '"Developers work longer hours."', why: 'Independence, not hours.' },
          { text: '"Developers don\'t wait to be told what to do next."' },
          { text: '"Developers are older."', why: 'Independence, not age.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Something Developers do that Clinton doesn\'t yet, or something he already does?',
        groups: ['Not yet', 'Already does'],
        items: [
          { text: 'Writes design docs', group: 0 },
          { text: 'Owns a feature end to end', group: 1 },
          { text: 'Leads small projects with others', group: 0 },
          { text: 'Helps new starters', group: 1 },
          { text: 'Reviews others\' designs', group: 0 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the weak source of criteria.',
        lines: ['The career ladder doc.', 'A rumour in the lunch queue.', 'Watching current Developers.'],
        bug: 1,
        explanation: 'Rumours mislead. Use the ladder, your manager and real examples.',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best question for Ngozi.',
        from: 'clinton',
        message: 'What do I ask Ngozi about the criteria?',
        options: [
          { text: '"Why didn\'t you promote me?"', why: 'Ask about the criteria, forward-looking.' },
          { text: '"Can I see everyone\'s salary?"', why: 'Ask about criteria.' },
          { text: '"What\'s the biggest difference between Graduate Developer and Developer here, in practice?"' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each source to what it gives.',
        pairs: [
          ['Career ladder', 'Written expectations'],
          ['Manager', 'What matters in practice'],
          ['People at the next level', 'Real examples'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Why write the criteria in your own words?',
        options: [
          { text: 'So you understand them and can plan against them' },
          { text: 'To change them', why: 'To understand them.' },
          { text: 'No reason', why: 'It makes them usable.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Clinton\'s criteria.',
        template: 'Own features end to [[1]]. Lead work that involves [[2]].',
        blanks: [['end'], ['others']],
        distractors: ['start', 'nobody', 'money'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What document do Developers write that Clinton doesn\'t yet? A design ___. (one word)',
        answers: ['doc', 'document'],
        placeholder: 'One word',
      },
      {
        kind: 'sortGroups',
        prompt: 'Reliable criteria source, or not?',
        groups: ['Reliable', 'Not reliable'],
        items: [
          { text: 'Your manager', group: 0 },
          { text: 'A random forum', group: 1 },
          { text: 'The career ladder', group: 0 },
          { text: 'A guess', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'What\'s the next level above your current role (or the role you want)? Write its criteria in your own words.',
    starters: ['The next level is...', 'It means...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Find your workplace\'s ladder, or ask your manager the "biggest difference" question. Write the criteria in four lines.',
  },
  notes: 'Career ladders vary; many small companies have none.',
};

export default lesson;
