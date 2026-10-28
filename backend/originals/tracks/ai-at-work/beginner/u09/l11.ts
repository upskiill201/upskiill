import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 9 · Lesson 11 — rehearsing a hard conversation. Story: the bank call. */
const lesson: OriginalLesson = {
  key: 'l11',
  title: 'Rehearsing a hard conversation',
  summary: 'Ada has to ask the bank to cover the shops\' refunds. She\'s never pushed back on a partner before. She rehearses with AI playing the bank\'s manager.',
  minutes: 12,
  outcomes: [
    'Rehearse a hard conversation with AI as the other person',
    'Prepare for pushback, not just your opening',
    'Know the limits of AI role-play',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Practice round',
      beats: [
        { speaker: 'narrator', text: 'Wednesday. The refunds cost 2,400 GHS. Ada thinks the bank should pay, since their update caused the outage.' },
        { speaker: 'ada', text: 'Act as Mr Boateng, the bank\'s partner manager. Polite but careful with money. I\'ll ask you to cover the refunds. Push back realistically.' },
        { speaker: 'narrator', text: 'The AI: "Our contract says we\'re not liable for downtime under four hours." Ada freezes. She hadn\'t read that clause.' },
        { speaker: 'ada', text: 'Good thing this is practice. I\'ll read the contract, then try again: maybe they cover half, or waive next month\'s fees.' },
        { speaker: 'tey', text: 'That\'s rehearsal working. Find the pushback now, prepare an answer and a fallback, then have the real conversation.' },
      ],
      choice: {
        prompt: 'What should Ada prepare before the real call?',
        options: [
          { text: 'Her ask, the facts, the likely pushback, and a fallback she\'d accept', outcome: 'Yes. Ask, facts, pushback, fallback.', best: true },
          { text: 'A word-for-word script', outcome: 'Real people don\'t follow scripts. Prepare points, not lines.' },
          { text: 'Nothing; the AI already practised it', outcome: 'The AI isn\'t Mr Boateng. It helped her prepare.' },
        ],
      },
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Ask AI to play the other person and push back realistically. Prepare your ask, the facts, their pushback, and a fallback you\'d accept.',
    },
  ],
  apply: {
    scenario: 'Ada prepares for the bank call.',
    items: [
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which role-play request is most useful?',
        options: [
          { text: 'Pretend to agree with me.', why: 'No practice value.' },
          { text: 'Act as the bank\'s partner manager, polite but careful with money. I\'ll ask you to cover refunds after your update caused an outage. Push back realistically, one reply at a time.' },
          { text: 'Be as rude as possible.', why: 'Unrealistic.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Order Ada\'s preparation.',
        lines: ['Her ask', 'The facts', 'Likely pushback', 'A fallback she\'d accept'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How much did the refunds cost, in GHS?',
        answers: ['2400', '2,400'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Fallback Ada could accept, or not a fallback?',
        groups: ['Fallback', 'Not a fallback'],
        items: [
          { text: 'Bank covers half the refunds', group: 0 },
          { text: 'Bank waives next month\'s fees', group: 0 },
          { text: 'Threaten to leave immediately', group: 1 },
          { text: 'Shout until they agree', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Will the bank pay for the refunds?',
        prompt: 'Before the call, best reply from Ada?',
        options: [
          { text: 'Definitely, they have to.', why: 'The contract may say otherwise.' },
          { text: 'I\'m asking today. Their contract may limit it, so I have a fallback: half the cost, or a fee waiver.' },
          { text: 'No idea, I\'ll see.', why: 'She\'s prepared.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the tip.',
        template: 'Prepare your ask, the facts, their [[1]], and a [[2]] you\'d accept.',
        blanks: [['pushback'], ['fallback']],
        distractors: ['lunch', 'threat'],
      },
      {
        kind: 'findBug',
        prompt: 'Which part of Ada\'s plan is risky?',
        lines: [
          'Ask: cover the 2,400 GHS refunds',
          'Facts: outage 8-10am, caused by their update',
          'Pushback: "contract limits liability under four hours"',
          'Fallback: if they say no, end the partnership on the spot',
        ],
        bug: 3,
        fix: 'Fallback: half the cost, or a fee waiver.',
        explanation: 'An extreme fallback isn\'t a fallback; it\'s a threat.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the rehearsal benefit to the example.',
        pairs: [
          ['Finds surprises', 'The contract clause'],
          ['Builds calm', 'Second run feels easier'],
          ['Sharpens the ask', 'Clear number: 2,400 GHS'],
        ],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the role-play instruction.',
        tiles: ['Push', 'back', 'realistically,', 'one', 'reply', 'at', 'a', 'time'],
        distractors: ['agree'],
      },
      {
        kind: 'mcq',
        prompt: 'What can AI role-play not do?',
        options: [
          { text: 'Push back', why: 'It can.' },
          { text: 'Play a role', why: 'It can.' },
          { text: 'Know what the real Mr Boateng will say' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Prepare as points, or as a script?',
        groups: ['Points', 'Script'],
        items: [
          { text: 'Ask: cover refunds', group: 0 },
          { text: 'A 2-page speech to read aloud', group: 1 },
          { text: 'Fallback: fee waiver', group: 0 },
          { text: 'Every word of the call written out', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why read the contract before the real call?',
        options: [
          { text: 'The pushback depends on it, so she needs the facts' },
          { text: 'To fill time', why: 'It\'s the key fact.' },
          { text: 'No need', why: 'It changes the conversation.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'What hard conversation is coming up for you? What pushback might you get?',
    starters: ['The conversation:', 'Likely pushback:'],
  },
  deepen: { title: 'Try it today', summary: 'Ask AI to play the other person in a conversation you\'re dreading. Practise twice.' },
  notes: 'Mr Boateng is narrated. Figures fictional.',
};

export default lesson;
