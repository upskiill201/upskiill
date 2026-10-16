import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 9. Tap to explore: the refund map, the team's one-page plan, marked up. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Line check: the refund map',
  summary: 'Sunday night, before the workshop. Remi turns everything into one page he calls the refund map. It\'s mostly other people\'s words. Tap through to see every Chapter 3 tool on it.',
  minutes: 11,
  outcomes: [
    'See every Chapter 3 tool on one page',
    'Write a plan that\'s clearly owned by the group',
    'Leave honest gaps for the group to decide',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'The refund map, draft for Monday',
      text: 'Goal: every business refund paid within 5 days, with no new audit errors. Three delays, three fixes: Njeri\'s signature form (the warehouse is redesigning it), Wanjiku\'s sample-check (two-week test, started Tuesday), Emeka\'s shared reference number (Lagos adds one field). Felix suggested moving the new screen to Week 5. Open question for Monday: what do we tell customers, and when? Decisions today: owners and first steps.',
      hotspots: [
        { phrase: 'every business refund paid within 5 days, with no new audit errors', note: 'The shared goal: one sentence, a number, a guardrail. Said at the top, every time.' },
        { phrase: 'Njeri\'s signature form', note: 'Credit by name. Each fix belongs to someone, and the page says so.' },
        { phrase: 'the warehouse is redesigning it', note: 'The IKEA effect: they\'re building it, so they\'ll use it.' },
        { phrase: 'two-week test, started Tuesday', note: 'Chapter 2\'s small test, still visible, so Wanjiku\'s guardrail stays in view.' },
        { phrase: 'Felix suggested moving the new screen to Week 5', note: 'Pre-wiring paid off: no surprise in the room, and Felix hears his idea in the plan.' },
        { phrase: 'Open question for Monday: what do we tell customers, and when?', note: 'An honest gap for the group to fill, and a clash flagged in advance (Pauline vs Wanjiku).' },
        { phrase: 'Decisions today: owners and first steps', note: 'The meeting will end with commitments, not "great discussion".' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'A plan the group owns: the goal at the top, every piece credited by name, their changes visible, the open questions honest.',
    },
  ],
  apply: {
    scenario: 'Line check, the refund map.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why is the map "mostly other people\'s words"?',
        options: [
          { text: 'Remi was lazy', why: 'It\'s deliberate.' },
          { text: 'To blame them if it fails', why: 'It\'s credit, not blame.' },
          { text: 'People back plans they can see themselves in' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which Chapter 3 tool is it?',
        groups: ['Shared goal', 'Credit', 'Co-creation'],
        items: [
          { text: '"Within 5 days, no new audit errors"', group: 0 },
          { text: '"Njeri\'s signature form"', group: 1 },
          { text: '"The warehouse is redesigning it"', group: 2 },
          { text: 'The goal at the top of the page', group: 0 },
          { text: '"Felix suggested..."', group: 1 },
          { text: 'An open question for the group', group: 2 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'felix',
        message: 'You put my name next to the Week 5 change. Thanks.',
        prompt: 'Remi\'s best reply?',
        options: [
          { text: 'It was your call, and it was the right one. Could you explain it in two lines on Monday?' },
          { text: 'No worries, I\'d have changed it anyway.', why: 'Takes the credit back.' },
          { text: 'You\'re welcome. You owe me.', why: 'Turns credit into debt.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Flagging a disagreement before the meeting is part of pre-___. (one word)',
        answers: ['wiring', 'Wiring'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Why leave "what do we tell customers?" open?',
        options: [
          { text: 'Remi forgot', why: 'It\'s on purpose.' },
          { text: 'It\'s a real decision for the group, and both Pauline and Wanjiku need a say' },
          { text: 'It doesn\'t matter', why: 'It matters a lot to Pauline\'s goal.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Draft 1 of the map. Which line breaks Chapter 3?',
        lines: [
          'Goal: every business refund paid within 5 days, no new audit errors.',
          'Remi\'s plan: new form, new screen, new emails.',
          'Owners and first steps decided Monday.',
        ],
        bug: 1,
        fix: 'Three fixes, from the people who found them.',
        explanation: '"Remi\'s plan" turns everyone\'s work back into his.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put the map in order.',
        lines: ['The shared goal', 'Each fix, with its owner', 'What changed after pre-wiring', 'Open questions and today\'s decisions'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the line to the research.',
        pairs: [
          ['"The warehouse is redesigning it"', 'IKEA effect'],
          ['"Decisions: owners and first steps"', 'Implementation intentions'],
          ['"Within 5 days"', 'Specific goals'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'Goal at the [[1]]. Every piece [[2]] by name. Gaps left [[3]].',
        blanks: [['top'], ['credited'], ['open']],
        distractors: ['bottom', 'hidden'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build what Remi calls it.',
        tiles: ['The', 'refund', 'map.'],
        distractors: ['plan.'],
      },
    ],
  },
  reflect: {
    prompt: 'Look at a plan you\'ve written for a group. How many names are on it besides yours? What open questions could you leave for the group?',
    starters: ['Names on it: ...', 'An open question could be...'],
  },
  deepen: {
    title: 'Count the names',
    summary: 'On your next group plan, count the names. If yours appears most, rewrite it so each piece is credited to the person who owns it.',
  },
  notes: 'Synthesis of Chapter 3 tools: shared goal with guardrail, credit by name, co-creation (IKEA effect), pre-wiring, commitments. Fictional plan.',
};

export default lesson;
