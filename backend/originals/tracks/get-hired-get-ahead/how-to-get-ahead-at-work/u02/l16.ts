import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 3 · Chapter 2 · Lesson 16 — myths about being valuable. Myth or Fact. */
const lesson: OriginalLesson = {
  key: 'l16',
  title: 'Value myths',
  summary: '"Keep your head down and your work will speak for itself." "Helping others is a distraction." "Only managers can lead." Clinton\'s cousin has strong opinions. Myth or fact?',
  minutes: 11,
  outcomes: ['Spot myths about value at work', 'Know what managers actually notice', 'Lead without a title'],
  learn: [
    {
      kind: 'myth',
      statements: [
        { text: 'Good work always speaks for itself.', isFact: false, explain: 'Often it doesn\'t. Clinton\'s crash fix helped nobody else until he shared it. Results need to be visible to be useful.' },
        { text: 'Helping teammates is a distraction from real work.', isFact: false, explain: 'Making others better is one of the four kinds of value. Onboarding Kemi sped up the whole team.' },
        { text: 'Work tied to the team\'s goals tends to get noticed.', isFact: true, explain: 'It\'s what managers report on. "Calls down by a third" travels further than "lots of tasks".' },
        { text: 'You need a manager title to lead.', isFact: false, explain: 'Clinton led the payout fix across two teams with no title. Owning a problem is leadership.' },
        { text: 'Saying "not now" can make you more valuable.', isFact: true, explain: 'It protects time for work that matters, as long as it\'s kind and offers an alternative.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Make results visible, help others, tie work to goals, lead without a title, and protect your focus.',
    },
  ],
  apply: {
    scenario: 'Clinton answers his cousin.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Fact', 'Myth'],
        items: [
          { text: 'Goal-tied work gets noticed', group: 0 },
          { text: 'Good work always speaks for itself', group: 1 },
          { text: 'Helping others is a distraction', group: 1 },
          { text: 'A kind "not now" can add value', group: 0 },
          { text: 'Only managers can lead', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'My cousin says, "Keep your head down, they\'ll notice eventually." True?',
        options: [
          { text: 'True, never share anything.', why: 'Invisible work often goes unnoticed.' },
          { text: 'Not always. My crash fix helped nobody until I shared it. I\'ll keep working hard and share results.' },
          { text: 'Share everything loudly, every hour.', why: 'Share results, usefully.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        prompt: 'How did Clinton lead without a title?',
        options: [
          { text: 'He told people what to do', why: 'He owned a problem, openly.' },
          { text: 'He didn\'t', why: 'Owning the fix was leadership.' },
          { text: 'He owned the payout fix across two teams' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the myth.',
        lines: ['Onboarding Kemi sped up the team.', 'Helping her wasted my time.', 'Goal-tied work gets noticed.'],
        bug: 1,
        explanation: 'Making others better is real value.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each myth to the truth.',
        pairs: [
          ['Work speaks for itself', 'Results need to be visible'],
          ['Helping is a distraction', 'Making others better is value'],
          ['Only managers lead', 'Owning a problem is leadership'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'What travels further in a company?',
        options: [
          { text: '"Calls down by a third"' },
          { text: '"Did lots of tasks"', why: 'Results tied to goals travel further.' },
          { text: '"Worked late"', why: 'Results tied to goals.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the tip.',
        template: 'Make results [[1]]. Lead without a [[2]].',
        blanks: [['visible'], ['title']],
        distractors: ['secret', 'team', 'boss'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Can you lead without a manager title? (yes or no)',
        answers: ['yes'],
        placeholder: 'Yes or no',
      },
      {
        kind: 'sortGroups',
        prompt: 'Leadership without a title, or not?',
        groups: ['Leadership', 'Not really'],
        items: [
          { text: 'Owning a cross-team fix', group: 0 },
          { text: 'Complaining in the chat', group: 1 },
          { text: 'Running the incident review', group: 0 },
          { text: 'Waiting to be told', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'david',
        message: 'At the hospital they say only consultants matter. Is my work as a junior doctor worthless?',
        options: [
          { text: 'Yes, until you\'re a consultant.', why: 'Value exists at every level.' },
          { text: 'Only if you work 100 hours.', why: 'Hours aren\'t value.' },
          { text: 'No: reliability, helping others and owning small problems matter at every level.' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Which myth have you believed about being valuable? What would change if you dropped it?',
    starters: ['I believed...', 'I would...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Ask a manager you respect: "What makes someone on your team hard to do without?" Compare their answer with the four kinds of value.',
  },
  notes: 'Myths reflect common beliefs; kept qualitative.',
};

export default lesson;
