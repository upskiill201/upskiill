import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 9 · Lesson 4 — notes into actions. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Notes into actions',
  summary: 'Ada\'s call notes are scrappy. Hidden inside them are five actions. Tap the notes to see what AI found, and what it got wrong.',
  minutes: 12,
  outcomes: [
    'Pull actions out of messy notes with AI',
    'Spot vague or missing owners',
    'Check AI-found actions against what was said',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Ada\'s scrappy call notes',
      text: 'C very upset, shops lost sales. Refund fees for the day - agreed. Visits to all shops - T to do. Bank alert?? A to check w/ bank. Maybe a text to shops, C to think. Update Thurs.',
      hotspots: [
        { phrase: 'Refund fees for the day - agreed', note: 'A decision. The AI should list it as decided, not as an idea.' },
        { phrase: 'T to do', note: 'An owner (Tolu), but no date. Ask: by when?' },
        { phrase: 'Bank alert??', note: 'Two question marks: not decided yet. Ada is checking, so it\'s an action to investigate, not a promise.' },
        { phrase: 'Maybe a text to shops, C to think', note: 'An open question owned by Carmen. Not an action for Ada\'s team yet.' },
        { phrase: 'Update Thurs', note: 'Who sends it, and at what time? Fill the gap before sending.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Ask AI: "List decisions, actions (owner, date) and open questions. Mark any missing owner or date." Then fill the gaps from memory, not guesses.',
    },
  ],
  apply: {
    scenario: 'Ada turns her notes into actions.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Decision, action or open question?',
        groups: ['Decision', 'Action', 'Open question'],
        items: [
          { text: 'Refund fees for the day', group: 0 },
          { text: 'Tolu visits all shops', group: 1 },
          { text: 'Maybe a text to shops', group: 2 },
          { text: 'Ada checks bank alert options', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which request pulls out the actions best?',
        options: [
          { text: 'Summarise my notes.', why: 'Mixes everything.' },
          { text: 'From these notes, list decisions, actions (owner and date) and open questions. Mark any missing owner or date. Only use what\'s in the notes.' },
          { text: 'Add more actions.', why: 'Don\'t invent.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Which item did the AI get wrong?',
        lines: [
          'Decision: refund fees for Monday',
          'Action: Tolu visits all shops (date missing)',
          'Decision: we will set up a bank alert',
          'Open question: text message to shops (Carmen)',
        ],
        bug: 2,
        fix: 'Action: Ada checks bank alert options with the bank.',
        explanation: '"Bank alert??" wasn\'t decided; Ada is checking.',
      },
      {
        kind: 'mcq',
        prompt: '"Visits to all shops - T to do". What\'s missing?',
        options: [
          { text: 'A date' },
          { text: 'An owner', why: 'T is Tolu.' },
          { text: 'Nothing', why: 'There\'s no date.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Did we agree to send shops a text message?',
        prompt: 'Best reply from Ada?',
        options: [
          { text: 'Not yet: Carmen was going to think about it. Shall I draft one in case she says yes?' },
          { text: 'Yes, it\'s agreed.', why: 'It was "maybe".' },
          { text: 'No, never.', why: 'It\'s still open.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the tip.',
        template: 'Mark any missing [[1]] or [[2]].',
        blanks: [['owner'], ['date']],
        distractors: ['emoji', 'colour'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the note to what it really is.',
        pairs: [
          ['"agreed"', 'A decision'],
          ['"T to do"', 'An action for Tolu'],
          ['"C to think"', 'An open question for Carmen'],
        ],
      },
      {
        kind: 'tapBuild',
        prompt: 'Fix Tolu\'s action.',
        tiles: ['Tolu:', 'visit', 'all', 'shops', 'by', 'Friday'],
        distractors: ['maybe'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many question marks after "Bank alert" in the notes?',
        answers: ['2', 'two'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order Ada\'s process.',
        lines: ['Paste the notes', 'Ask for decisions, actions, questions', 'Check against memory', 'Fill missing owners and dates'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Fill the gap from memory, or ask someone?',
        groups: ['From memory', 'Ask someone'],
        items: [
          { text: 'Tolu agreed Friday on the call', group: 0 },
          { text: 'Whether Carmen wants a text', group: 1 },
          { text: 'Ada said she\'d send Thursday\'s update', group: 0 },
          { text: 'What the bank can offer', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why check AI-found actions against what was said?',
        options: [
          { text: 'AI can turn a "maybe" into a decision' },
          { text: 'AI is always wrong', why: 'It\'s usually close; check the edges.' },
          { text: 'No need', why: 'It can misread.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Look at your last meeting notes. Which actions are missing an owner or a date?',
    starters: ['Missing owner:', 'Missing date:'],
  },
  deepen: { title: 'Try it today', summary: 'Paste one set of meeting notes into AI and ask it to mark missing owners and dates.' },
  notes: 'Fictional notes.',
};

export default lesson;
