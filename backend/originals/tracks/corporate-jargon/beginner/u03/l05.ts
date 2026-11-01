import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 5 — Checkpoint 1. Reviews lessons 1–4 plus earlier chapters. Story beat: Felix's out-of-office reply. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: the out-of-office surprise',
  summary: 'Remi still needs access to the invoice system. He emails Felix. Two seconds later, an automatic reply arrives, written entirely in letters.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Decode time and email acronyms without notes', 'Work out what to do when the person you need is away'],
  learn: [
    {
      kind: 'story',
      title: 'Wednesday, 10:03 a.m.',
      beats: [
        { speaker: 'narrator', text: 'Remi emails Felix: "Hi Felix, could I get access to the invoice system? Thanks!" He hits send. Two seconds later:' },
        { speaker: 'felix', text: '(automatic reply) OOO til EOW, limited email. For urgent IT issues pls raise a ticket via the helpdesk, ETA 24h. Return date TBC. NB: pwd resets = self-service portal. BR, Felix' },
        { speaker: 'remi', text: '(Even his robot speaks in acronyms.)' },
        { speaker: 'tey', text: "Felix's out-of-office message is a perfect checkpoint. Everything in it is from this week. Decode it, then decide what Remi does next." },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 1. Felix\'s out-of-office reply.',
    items: [
      {
        kind: 'mcq',
        prompt: '"OOO til EOW." When is Felix back?',
        options: [
          { text: 'Tomorrow morning', why: 'EOW = end of week. He\'s away until then.' },
          { text: 'After the end of the week, so probably next Monday' },
          { text: 'Never', why: 'Just until the end of the week.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Decode Felix\'s reply.',
        pairs: [
          ['OOO', 'Out of office'],
          ['ETA 24h', 'Expect it within 24 hours'],
          ['TBC', 'To be confirmed'],
          ['BR', 'Best regards'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'zanele',
        message: 'Felix is OOO. Just wait till Monday for access?',
        prompt: 'Remi needs access for Brian\'s KPI deck, due EOW. What does he say?',
        options: [
          { text: 'Sure, Monday is fine.', why: 'The deck is due by the end of THIS week.' },
          { text: 'I\'ll call Felix on holiday.', why: 'His message gives another route: the helpdesk.' },
          { text: 'Can\'t wait: the deck is due Friday. I\'ll raise a helpdesk ticket now, ETA 24 hours.' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Spelled out, or said as a word?',
        groups: ['Spelled out', 'Said as a word'],
        items: [
          { text: 'ETA', group: 0 },
          { text: 'PIN', group: 1 },
          { text: 'OOO', group: 0 },
          { text: 'NASA', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: '"NB" is Latin for "note ..." (one word)',
        answers: ['well'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Remi forwards Felix\'s reply to Brian. What appears in the subject line?',
        options: [
          { text: 'RE:', why: 'RE: is for a reply. He\'s forwarding.' },
          { text: 'BCC:', why: 'BCC isn\'t a subject-line label.' },
          { text: 'FWD: (or FW:)' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Remi\'s helpdesk ticket. Which line could cause a delay?',
        lines: [
          'Request: access to the invoice system.',
          'Why: needed for the KPI deck.',
          'Deadline: ASAP.',
        ],
        bug: 2,
        fix: 'Deadline: by Thursday 5 p.m. Nairobi time.',
        explanation: 'ASAP means different things to different people. A real time gets the ticket prioritised properly.',
      },
      {
        kind: 'mcq',
        prompt: 'Remi wants Brian to know about the delay, without asking him to do anything. Which label fits?',
        options: [
          { text: 'NB: action needed', why: 'He doesn\'t need Brian to act.' },
          { text: 'FYI' },
          { text: 'URGENT', why: 'It\'s not urgent for Brian.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Review from earlier chapters.',
        pairs: [
          ['Heads-up', 'An advance warning'],
          ['Hard stop', 'Must leave at a fixed time'],
          ['Next steps', 'Who does what next'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Remi\'s message to Brian.',
        template: '[[1]]: Felix is OOO until [[2]], so I\'ve raised a helpdesk ticket for access. [[3]] 24 hours, so the KPI deck is still on track.',
        blanks: [['FYI'], ['EOW', 'Friday'], ['ETA']],
        distractors: ['BCC', 'TBD'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the subject line for Remi\'s reply to Wanjiku\'s chain.',
        tiles: ['RE:', 'Courier', 'test', 'update'],
        distractors: ['FWD:', 'BCC:'],
      },
    ],
  },
  reflect: {
    prompt: 'What does your out-of-office message say (or what would it say)? Does it tell people who to contact and when you\'re back?',
    starters: ['Mine says...', 'I\'d add...'],
  },
  deepen: {
    title: 'Write a good out-of-office',
    summary: 'A good OOO says: when you\'re back, who to contact for urgent things, and nothing else. Write yours now, in plain words, so it\'s ready for your next day off.',
  },
  notes: 'Review of lessons 1–4 plus Chapters 1–2. BR = best regards (common email sign-off abbreviation). pwd = password. Helpdesk/self-service portal = standard IT terms.',
};

export default lesson;
