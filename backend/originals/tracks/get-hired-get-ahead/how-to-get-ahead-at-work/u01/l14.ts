import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 3 · Chapter 1 · Lesson 14 — building relationships beyond your team. Step-by-step. */
const lesson: OriginalLesson = {
  key: 'l14',
  title: 'Beyond your desk',
  summary: 'The bug in week five got fixed faster because Clinton already knew the support lead. Miracle says that wasn\'t luck. The people outside your team are often the ones who help most when things go wrong.',
  minutes: 12,
  outcomes: ['Map the people your work depends on', 'Meet them before you need them', 'Keep relationships going with small actions'],
  learn: [
    {
      kind: 'steps',
      title: 'Four steps to a wider network at work',
      steps: [
        { title: '1. Map who your work touches', body: 'Support (hears from drivers first), QA (tests releases), product (decides what\'s next), finance (owns payment reports). Clinton writes one name for each.' },
        { title: '2. Meet them early, briefly', body: '"Hi, I\'m Clinton, new on offline. I\'d love to understand what you see from drivers. Coffee for 15 minutes?" Most people say yes in the first months; it gets odder later.' },
        { title: '3. Ask what makes their work hard', body: 'The support lead says: "When sync fails, I can\'t tell drivers when it\'ll work again." Clinton writes it down. It becomes his next idea.' },
        { title: '4. Keep it going with small things', body: 'Share a fix that helps them. Thank them in the team chat. Invite them to a demo. Small, regular, genuine.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Map who your work touches. Meet them before you need them. Ask what makes their work hard.',
    },
  ],
  apply: {
    scenario: 'Clinton builds relationships across Njangi Pay.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the steps in order.',
        lines: ['Map who your work touches', 'Meet them early, briefly', 'Ask what makes their work hard', 'Keep it going with small things'],
      },
      {
        kind: 'mcq',
        prompt: 'Why meet people before you need them?',
        options: [
          { text: 'To ask for favours immediately', why: 'It\'s for later, when you need each other.' },
          { text: 'When things go wrong, they already know and trust you' },
          { text: 'It\'s required', why: 'It\'s wise, not required.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each team to what they know.',
        pairs: [
          ['Support', 'What drivers complain about'],
          ['QA', 'What breaks in releases'],
          ['Finance', 'How payment reports are used'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Keeps the relationship going, or not?',
        groups: ['Keeps it going', 'Doesn\'t'],
        items: [
          { text: 'Sharing a fix that helps them', group: 0 },
          { text: 'Only messaging when he needs something', group: 1 },
          { text: 'Thanking them in the team chat', group: 0 },
          { text: 'Inviting them to a demo', group: 0 },
          { text: 'Ignoring their messages', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick Clinton\'s message to the support lead.',
        from: 'clinton',
        message: 'What should I write to the support lead?',
        options: [
          { text: '"Can you test my code?"', why: 'Start by learning about their work.' },
          { text: '"Why do drivers complain so much?"', why: 'Ask with curiosity, not blame.' },
          { text: '"Hi, I\'m Clinton, new on offline. I\'d love to understand what you hear from drivers. 15 minutes for coffee?"' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the step that\'s too late.',
        lines: ['Meets support in week two.', 'Meets QA for the first time during a crisis.', 'Invites finance to a demo.'],
        bug: 1,
        explanation: 'Meeting people for the first time in a crisis is much harder.',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'What did the support lead\'s answer give Clinton?',
        options: [
          { text: 'His next idea: telling drivers when sync will work again' },
          { text: 'A complaint to ignore', why: 'It\'s a real problem he can solve.' },
          { text: 'Nothing', why: 'It gave him an idea.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the tip.',
        template: 'Meet them [[1]] you need them. Ask what makes their work [[2]].',
        blanks: [['before'], ['hard']],
        distractors: ['after', 'easy', 'fun'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many minutes of coffee does Clinton suggest? (a number)',
        answers: ['15', 'fifteen'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Does Clinton\'s work touch this team?',
        groups: ['Touches', 'Doesn\'t really'],
        items: [
          { text: 'Support', group: 0 },
          { text: 'QA', group: 0 },
          { text: 'The building\'s parking attendants', group: 1 },
          { text: 'Finance (payment reports)', group: 0 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Who does your work (or study) depend on outside your immediate group? Have you met them?',
    starters: ['My work touches...', 'I haven\'t met...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Map four people your work touches. Message one this week for a 15-minute chat about what makes their work hard.',
  },
  notes: 'Cross-team relationships: common onboarding advice. The support lead is unnamed.',
};

export default lesson;
