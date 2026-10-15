import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 2. Card deck: meeting types decoded — stand-up, sync, catch-up, 1:1, all-hands, huddle, workshop. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'Stand-up, sync, catch-up, all-hands',
  summary: 'Remi\'s eleven meetings have eleven strange names. A stand-up where nobody stands. An all-hands where nobody uses their hands. Here is what each one really is.',
  minutes: 12,
  outcomes: [
    'Decode the names of the most common meeting types',
    'Know what each one expects from you',
    'Prepare the right thing for each',
  ],
  learn: [
    {
      kind: 'text',
      html: "<p>Every office names its meetings, and the names don't always make sense. Brian's Lagos colleagues sit down for the \"stand-up\" because they join on video. The all-hands has never involved anybody's hands.</p><p>The names are about what kind of meeting it is. Here are the ones Remi has this week.</p>",
    },
    {
      kind: 'text',
      html: "<h3>Stand-up</h3><p>A short daily team meeting, often 15 minutes. Each person says what they did, what they're doing next, and whether anything is blocking them. The name comes from standing up so it stays short.</p><p><strong>Bring:</strong> your three lines, ready to go.</p><h3>Sync</h3><p>Short for \"synchronise\". A meeting to make sure people working on the same thing are up to date with each other.</p><p><strong>Bring:</strong> where your part is up to.</p>",
    },
    {
      kind: 'text',
      html: "<h3>Catch-up</h3><p>An informal meeting to hear what's been happening. Often between two people.</p><h3>One-to-one (1:1)</h3><p>A regular private meeting between you and your manager. Your time to ask questions, raise problems and get feedback.</p><p><strong>Bring:</strong> your questions. It's YOUR meeting as much as theirs.</p>",
    },
    {
      kind: 'check',
      question: 'Brian books a weekly "1:1" with Remi. What is it?',
      options: ['A meeting for the whole team', 'A private meeting between Remi and Brian', 'A test Remi has to pass'],
      answer: 1,
      explanation: 'One-to-one: just the two of them. The best place for Remi\'s questions.',
    },
    {
      kind: 'text',
      html: "<h3>All-hands (or town hall)</h3><p>A meeting for the whole company or department. Usually leaders share news and answer questions. You mostly listen.</p><h3>Huddle</h3><p>A quick, often unplanned meeting of a few people to sort something out.</p><h3>Workshop</h3><p>A longer, hands-on session where the group works on a problem together. Expect to do things, not just listen.</p>",
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Stand-up = daily, short, three lines. Sync = get up to date. 1:1 = you and your manager. All-hands = everyone, mostly listening. Workshop = come ready to work.',
    },
  ],
  apply: {
    scenario: 'Monday. Remi reads his calendar like a dictionary.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match the meeting to what it is.',
        pairs: [
          ['Stand-up', 'Short daily team update'],
          ['1:1', 'You and your manager'],
          ['All-hands', 'Whole company, mostly listening'],
          ['Workshop', 'Hands-on group problem-solving'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why is it called a "stand-up"?',
        options: [
          { text: 'Because it\'s for comedians', why: 'No jokes required. Though Zanele tries.' },
          { text: 'Because you have to stand up for yourself', why: 'Nice idea, but no.' },
          { text: 'Standing keeps it short, even if people now join sitting down' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Mostly listen, or come ready to talk?',
        groups: ['Mostly listen', 'Come ready to talk'],
        items: [
          { text: 'All-hands', group: 0 },
          { text: 'Stand-up', group: 1 },
          { text: '1:1 with your manager', group: 1 },
          { text: 'Town hall', group: 0 },
          { text: 'Workshop', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'zanele',
        message: 'What should I bring to the supplier sync? My whole spreadsheet? All 40 tabs?',
        prompt: 'What should Remi tell her?',
        options: [
          { text: 'Just where your part is up to. Maybe the one tab that matters.' },
          { text: 'All 40, they\'ll love it.', why: 'A sync is about being up to date, not a full presentation.' },
          { text: 'Nothing, syncs are just for listening.', why: 'Everyone shares where their part is up to.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: '"Sync" is short for ... (one word)',
        answers: ['synchronise', 'synchronize', 'synchronisation', 'synchronization'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the best way for Remi to use his first 1:1 with Brian?',
        options: [
          { text: 'Wait for Brian to talk', why: 'A 1:1 is his time too. Wasting it is a missed chance.' },
          { text: 'Bring his questions and anything that\'s blocking him' },
          { text: 'Present his whole week in slides', why: 'Too formal. It\'s a conversation.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Remi\'s stand-up update. Which line doesn\'t belong?',
        lines: [
          'Yesterday I finished the supplier list.',
          'Today I\'m writing the summary for Brian.',
          'Here is a 20-minute explanation of every invoice I checked.',
          'Nothing is blocking me.',
        ],
        bug: 2,
        fix: 'Delete it. Details go offline, not in the stand-up.',
        explanation: 'A stand-up is three short lines per person. Details go to a separate conversation.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Chapter 1 review. Match the phrase.',
        pairs: [
          ['Low-hanging fruit', 'Easy wins'],
          ['Ping me', 'Send me a quick message'],
          ['Deep dive', 'A detailed look'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The three lines of a stand-up.',
        template: 'What I [[1]], what I\'m doing [[2]], and whether anything is [[3]] me.',
        blanks: [['did'], ['next', 'today'], ['blocking']],
        distractors: ['ate', 'praising'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Remi\'s stand-up line about a problem.',
        tiles: ['I\'m', 'blocked', 'until', 'I', 'get', 'invoice', 'system', 'access.'],
        distractors: ['offline', 'needle'],
      },
    ],
  },
  reflect: {
    prompt: 'What meetings, classes or calls do you have in a normal week? Give each one its "office name": is it a stand-up, a sync, a 1:1, an all-hands or a workshop?',
    starters: ['My ... is really a stand-up because...', 'My closest thing to a 1:1 is...'],
  },
  deepen: {
    title: 'Your stand-up, ready to go',
    summary: 'Write tomorrow\'s three stand-up lines tonight: what you did, what you\'re doing next, what\'s blocking you. Even if you don\'t have stand-ups, it\'s a great way to plan a day.',
  },
  notes: 'Stand-up meeting (Cambridge: a short meeting where people stand; from agile/Scrum "daily stand-up"). Sync = synchronise (business jargon). One-to-one/1:1, all-hands (Merriam-Webster: "all hands" = all members of a group), town hall (business sense), huddle (Merriam-Webster), workshop.',
};

export default lesson;
