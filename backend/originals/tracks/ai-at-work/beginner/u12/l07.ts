import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 12 · Lesson 7 — voice and phone assistants. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'Voice and phone assistants',
  summary: 'Tolu spends half his day at Makola market on his phone. Voice AI could help him a lot, and also embarrass him in front of a shop owner. Tey explains how to use it well.',
  minutes: 12,
  outcomes: [
    'Use voice AI for notes and quick drafts',
    'Know the limits of voice in public',
    'Check voice-typed text before sending',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Voice is great when your hands are busy. Tolu can say his visit notes out loud after each shop and get a tidy summary.', replies: ['What else?'] },
        { tey: 'Drafting quick messages, asking how-to questions, even practising a conversation. Many assistants now have voice modes.', replies: ['Any risks?'] },
        { tey: 'Three. People around you can hear, so no customer details aloud in a busy market. Voice typing mishears names and numbers. And voice memos are still data: same rules about what goes in.', replies: ['So what\'s the habit?'] },
        { tey: 'Speak notes in private or quietly, use shop IDs instead of names, and always read the text back before you send it.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Voice for notes and quick drafts. Keep customer details out of earshot, use IDs, and read it back before sending.',
    },
  ],
  apply: {
    scenario: 'Tolu uses voice AI at the market.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Good voice use, or risky?',
        groups: ['Good', 'Risky'],
        items: [
          { text: 'Voice notes after a visit, in the car', group: 0 },
          { text: 'Reading a shop owner\'s ID number aloud in the market', group: 1 },
          { text: 'Asking "how do I explain refunds simply?"', group: 0 },
          { text: 'Sending voice-typed text unread', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What does voice typing often get wrong?',
        options: [
          { text: 'Common words', why: 'Names and numbers are hardest.' },
          { text: 'Nothing', why: 'It mishears.' },
          { text: 'Names and numbers' },
        ],
        answer: 2,
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'My voice-typed email said "Carmen" as "car men". Embarrassing!',
        prompt: 'Best reply from Ada?',
        options: [
          { text: 'Stop using voice.', why: 'Just read it back.' },
          { text: 'Voice typing often trips on names. A quick read-back before sending catches it every time.' },
          { text: 'Nobody will notice.', why: 'They will.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the tip.',
        template: 'Use [[1]] instead of names, and read it [[2]] before sending.',
        blanks: [['IDs'], ['back']],
        distractors: ['emojis', 'never'],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which voice note is safest?',
        options: [
          { text: '"Ama Mensah, phone 024 555 0101, ID GHA-123, wants a refund."', why: 'Personal details aloud.' },
          { text: '"Shop S-14 wants a refund for Tuesday. Follow up Thursday."' },
          { text: '"Remember the thing."', why: 'Too vague.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the voice risk to the fix.',
        pairs: [
          ['People can hear', 'Speak in private, or quietly'],
          ['Mishears names', 'Read it back'],
          ['It\'s still data', 'Same rules: IDs, no secrets'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which voice habit is a mistake?',
        lines: [
          'Notes in the car after each visit',
          'Shop IDs instead of names',
          'Read the summary back',
          'Say the bank password aloud so the AI can log in',
        ],
        bug: 3,
        fix: 'Delete it.',
        explanation: 'Never share passwords, by voice or text.',
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Tolu\'s voice note.',
        tiles: ['Shop', 'S-14', 'wants', 'a', 'refund'],
        distractors: ['Ama'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many risks did Tey name?',
        answers: ['3', 'three'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Good for voice, or better typed?',
        groups: ['Voice', 'Typed'],
        items: [
          { text: 'Quick notes while walking', group: 0 },
          { text: 'A precise contract clause', group: 1 },
          { text: 'A practice run of a hard conversation', group: 0 },
          { text: 'A table of figures', group: 1 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Order Tolu\'s voice note habit.',
        lines: ['Step away from customers', 'Speak notes using shop IDs', 'Let AI tidy them', 'Read back before saving or sending'],
      },
      {
        kind: 'mcq',
        prompt: 'Why use shop IDs in voice notes?',
        options: [
          { text: 'No personal details are spoken or stored' },
          { text: 'IDs are shorter', why: 'Privacy.' },
          { text: 'No reason', why: 'Privacy.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'When are your hands busy at work? Could voice notes help, and what would you keep out of them?',
    starters: ['My hands are busy when...', 'I\'d keep out...'],
  },
  deepen: { title: 'Try it today', summary: 'Try voice notes for one task today, then read the text back carefully.' },
  notes: 'Phone number uses a fictional 555 pattern.',
};

export default lesson;
