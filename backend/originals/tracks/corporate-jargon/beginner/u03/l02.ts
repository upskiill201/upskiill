import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 2. Card deck: time acronyms — ASAP, EOD, COB, EOW, ETA, OOO, TBC/TBD. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'Time: ASAP, EOD, EOW, ETA, OOO',
  summary: 'Half of all office acronyms are about time: when it\'s due, when you\'ll arrive, when you\'re away. Get these wrong and you\'re a day late without knowing it.',
  minutes: 11,
  outcomes: [
    'Decode the time acronyms: ASAP, EOD, COB, EOW, ETA, OOO, TBC, TBD',
    'Turn a vague time acronym into a real time',
    'Avoid the "whose end of day?" trap',
  ],
  learn: [
    {
      kind: 'text',
      html: "<p>Monday morning. Remi makes a list of every acronym in his inbox. Half of them are about <strong>time</strong>. That makes sense: deadlines are the thing everyone at work needs to agree on.</p>",
    },
    {
      kind: 'text',
      html: "<h3>ASAP</h3><p><strong>As soon as possible.</strong> Sometimes said as a word (\"ay-sap\"). Warning: everyone's \"possible\" is different. If it matters, ask: \"Is today okay, or do you need it this morning?\"</p><h3>EOD / COB</h3><p><strong>End of day / close of business.</strong> By the end of today's working day. Usually around 5 or 6 p.m.</p><h3>EOW</h3><p><strong>End of week.</strong> Usually Friday afternoon. (Some people mean Thursday. Ask if it matters.)</p>",
    },
    {
      kind: 'text',
      html: "<h3>ETA</h3><p><strong>Estimated time of arrival.</strong> When something (or someone) will arrive. At work it's used for anything: \"What's the ETA on the report?\" = when will it be ready?</p><h3>OOO</h3><p><strong>Out of office.</strong> Away from work: on leave, at a conference, ill. An \"OOO message\" is the automatic email reply that says so.</p><h3>TBC / TBD</h3><p><strong>To be confirmed / to be decided (or determined).</strong> TBC: there's a plan, but it's not certain yet. TBD: nobody has decided yet.</p>",
    },
    {
      kind: 'check',
      question: 'Brian writes: "Workshop date: TBC." What does that tell Remi?',
      options: ['The workshop is cancelled', 'There\'s a likely date, but it isn\'t certain yet', 'The workshop is today'],
      answer: 1,
      explanation: 'TBC = to be confirmed. A plan exists, not yet fixed.',
    },
    {
      kind: 'callout',
      tone: 'warning',
      text: 'The end-of-day trap: Emeka\'s EOD in Lagos is two hours after Remi\'s EOD in Nairobi. With people in other time zones, write a time: "by 5 p.m. Nairobi time".',
    },
  ],
  apply: {
    scenario: 'Monday, week three. Remi\'s time-acronym list.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match the time acronyms.',
        pairs: [
          ['ASAP', 'As soon as possible'],
          ['COB', 'Close of business'],
          ['ETA', 'Estimated time of arrival'],
          ['TBD', 'To be decided'],
        ],
      },
      {
        kind: 'mcq',
        prompt: '"What\'s the ETA on the KPI deck?" What does Brian want to know?',
        options: [
          { text: 'When the deck will be ready' },
          { text: 'Where the deck is going', why: 'ETA is about time, not place.' },
          { text: 'Who is making the deck', why: 'He knows: Remi.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Certain, or not certain yet?',
        groups: ['Certain', 'Not certain yet'],
        items: [
          { text: 'Deadline: EOD Friday', group: 0 },
          { text: 'Date: TBC', group: 1 },
          { text: 'Venue: TBD', group: 1 },
          { text: 'OOO until Wednesday', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'emeka',
        message: 'Can you send the courier numbers by EOD?',
        prompt: 'Emeka is in Lagos, two hours behind Nairobi. Best reply?',
        options: [
          { text: 'Sure, by EOD!', why: 'Whose EOD? Lagos EOD is two hours later than Nairobi\'s.' },
          { text: 'Sure! I\'ll send them by 5 p.m. Nairobi time, which is 3 p.m. for you.' },
          { text: 'EOD is too soon.', why: 'Is it? He hasn\'t checked yet.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Out of office, as an acronym: ___ (three letters)',
        answers: ['OOO', 'ooo'],
        placeholder: 'Three letters',
      },
      {
        kind: 'mcq',
        prompt: 'Zanele gets a task "ASAP" from Brian. She\'s already busy with another urgent one. What should she do?',
        options: [
          { text: 'Drop everything', why: 'Maybe, but the other task might matter more.' },
          { text: 'Ask: "Is today okay, or do you need it before my other task?"' },
          { text: 'Ignore "ASAP"; everyone says it', why: 'Sometimes it really is urgent. Check.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Remi\'s notes. Which one is wrong?',
        lines: [
          'EOD: end of the working day.',
          'EOW: end of the working week, usually Friday.',
          'TBD: it has already been decided.',
        ],
        bug: 2,
        fix: 'TBD: not decided yet.',
        explanation: 'TBD means it\'s still to be decided.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Review.',
        pairs: [
          ['Pre-read', 'Read this before the meeting'],
          ['Tentative', 'Maybe coming'],
          ['AOB', 'Any other business'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Turn the vague time into a real one.',
        template: 'Instead of "ASAP", write "by [[1]] p.m. [[2]]". Instead of "EOW", write "by [[3]] afternoon".',
        blanks: [['5', '4', '3'], ['today'], ['Friday']],
        distractors: ['someday', 'soon'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Remi\'s reply to "ETA?"',
        tiles: ['It\'ll', 'be', 'ready', 'by', '3', 'p.m.', 'today.'],
        distractors: ['ASAP', 'soon'],
      },
    ],
  },
  reflect: {
    prompt: 'When someone says "ASAP" or "end of day" to you, what do you usually assume? Has that ever caused a mix-up?',
    starters: ['I usually assume...', 'Once, a mix-up happened when...'],
  },
  deepen: {
    title: 'Replace one vague time a day',
    summary: 'This week, every time you\'re about to write ASAP, EOD or "soon", write a real time instead: "by 3 p.m. today". Notice how many follow-up questions disappear.',
  },
  notes: 'ASAP, EOD, COB (close of business), EOW, ETA, OOO, TBC, TBD (to be decided/determined) — Cambridge/Merriam-Webster abbreviations. Nairobi EAT UTC+3, Lagos WAT UTC+1.',
};

export default lesson;
