import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 2 · Chapter 5 · Lesson 8 — the negotiation conversation, step by step. Step-by-step. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'The ask',
  summary: 'Thursday morning, Clinton calls Brenda. He has a script on a sticky note, but Miracle has told him not to read it. Five steps, about two minutes.',
  minutes: 12,
  outcomes: ['Structure a polite negotiation', 'State a number with a reason', 'Stay quiet after you ask'],
  learn: [
    {
      kind: 'steps',
      title: 'Five steps, two minutes',
      steps: [
        { title: '1. Start with enthusiasm', body: '"Thank you again. I really want to join the offline team, and I loved meeting Ngozi."' },
        { title: '2. Give your reason', body: '"I\'ve spent three months building offline sync for 11 drivers, with tests, which is very close to the team\'s work. And from what I\'ve learned, roles like this in Douala are often offered between about 280,000 and 340,000."' },
        { title: '3. Make one clear ask', body: '"Would 330,000 be possible? If the salary is fixed, a review after probation would also mean a lot."' },
        { title: '4. Stop talking', body: 'After the ask, pause. Let them answer. Filling the silence with "but it\'s fine if not, sorry" undoes the ask.' },
        { title: '5. Listen, then respond', body: 'If they need time, agree a time. If they say yes, thank them. If they say no or offer something else, you\'ll handle that in lesson 13.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Enthusiasm, reason, one clear ask, silence, listen. Two minutes.',
    },
  ],
  apply: {
    scenario: 'Clinton makes his ask.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the steps in order.',
        lines: ['Start with enthusiasm', 'Give your reason', 'Make one clear ask', 'Stop talking', 'Listen, then respond'],
      },
      {
        kind: 'mcq',
        prompt: 'Why start with enthusiasm?',
        options: [
          { text: 'To trick them', why: 'It\'s genuine, and it frames the ask.' },
          { text: 'It shows he wants the job, so the ask feels like a detail, not a threat' },
          { text: 'It doesn\'t matter', why: 'It sets the tone.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Good reason, or weak reason?',
        groups: ['Good', 'Weak'],
        items: [
          { text: 'Three months of offline sync experience', group: 0 },
          { text: 'I need a new phone', group: 1 },
          { text: 'Typical range is 280k to 340k', group: 0 },
          { text: 'My friend earns more', group: 1 },
          { text: 'I added tests that caught two bugs', group: 0 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that undoes the ask.',
        lines: ['Would 330,000 be possible?', 'But honestly it\'s fine if not, sorry, forget I asked.', '(pause)'],
        bug: 1,
        explanation: 'Stop after the ask. Let them answer.',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick Clinton\'s clear ask.',
        from: 'clinton',
        message: 'What exactly do I say for the ask?',
        options: [
          { text: '"Could you maybe, possibly, if it\'s OK, give a bit more?"', why: 'Be clear: one number.' },
          { text: '"I want 330,000. Final."', why: 'A question, not an ultimatum.' },
          { text: '"Would 330,000 be possible? If not, a review after probation would also mean a lot."' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each step to Clinton\'s line.',
        pairs: [
          ['Enthusiasm', 'I loved meeting Ngozi'],
          ['Reason', 'Three months of offline sync'],
          ['Ask', 'Would 330,000 be possible?'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Should Clinton read his script word for word?',
        options: [
          { text: 'No: know the steps, speak naturally' },
          { text: 'Yes, every word', why: 'Shape, not script, like interviews.' },
          { text: 'No script, no preparation', why: 'Prepare the steps.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the steps.',
        template: 'Enthusiasm, reason, one clear [[1]], [[2]], listen.',
        blanks: [['ask'], ['silence']],
        distractors: ['threat', 'apology', 'joke'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'About how many minutes should the conversation take? (a number)',
        answers: ['2', 'two'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Helps the ask, or hurts it?',
        groups: ['Helps', 'Hurts'],
        items: [
          { text: 'One clear number', group: 0 },
          { text: 'Apologising after asking', group: 1 },
          { text: 'A reason tied to the role', group: 0 },
          { text: 'Mentioning personal debts', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'What would make the silence after an ask hardest for you? How could you handle it?',
    starters: ['The hard part is...', 'I could...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Practise the five steps out loud with a friend. Have them stay silent after your ask for five seconds. Don\'t fill it.',
  },
  notes: 'Structure is common negotiation guidance (lead with interest, justify with market and skills, one specific ask). Salary numbers are story details.',
};

export default lesson;
