import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 1. Story with a choice: Remi's calendar has eleven meetings. Why offices meet so much, and which meetings matter. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'Why there are so many meetings',
  summary: 'Monday morning, week two. Remi opens his calendar and finds eleven meetings. One of them is called "Pre-sync to align on the sync". What are all these for?',
  minutes: 12,
  outcomes: [
    'Know the three jobs a meeting can do: share, decide, solve',
    'Tell which of your meetings actually need you',
    'Ask what a meeting is for, politely',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Monday, 8:30 a.m., week two',
      beats: [
        { speaker: 'narrator', text: 'Remi opens his laptop. Friday\'s wrap-up went well. He\'s feeling good. Then he opens his calendar.' },
        { speaker: 'narrator', text: 'Eleven meetings. Daily stand-up. Supplier sync. Q4 catch-up. Finance huddle. All-hands. And, at 3 p.m., a 30-minute meeting called "Pre-sync to align on the sync".' },
        { speaker: 'remi', text: '(A meeting... to get ready for a meeting. When do people actually do the work?)' },
        { speaker: 'zanele', text: 'I have fourteen. I accepted all of them. I feel SO important.' },
        { speaker: 'tey', text: "Welcome to week two, where the jargon moves into meetings. First question: are all eleven meetings really Remi's?" },
      ],
      choice: {
        prompt: 'Remi can\'t go to all eleven and still finish his supplier summary. What should he do?',
        options: [
          {
            text: 'Go to all eleven. An intern should be everywhere.',
            outcome: 'Remi spends the whole day in meetings and writes the summary at 10 p.m. On Tuesday, his calendar has nine more.',
          },
          {
            text: 'Ask Brian: "Which of these do you need me in, and which can I skip and read the notes?"',
            outcome: 'Brian looks at the list. "Stand-up, supplier sync, all-hands. Skip the rest; the pre-sync is mine, you got added by mistake." Remi gets five hours back.',
            best: true,
          },
          {
            text: 'Decline all of them and work on the summary.',
            outcome: 'Remi misses the supplier sync, where they changed the deadline for his summary. He finds out on Wednesday.',
          },
        ],
      },
    },
    {
      kind: 'text',
      html: "<p>Offices have a lot of meetings because getting a group of people to <em>know</em> the same thing, <em>agree</em> on the same thing, or <em>fix</em> the same thing is hard to do by email.</p><p>Almost every meeting has one of three jobs:</p><ul><li><strong>Share:</strong> tell people what's happening. (Stand-ups, all-hands, updates.)</li><li><strong>Decide:</strong> make a choice together. (Approvals, planning.)</li><li><strong>Solve:</strong> work through a problem. (Workshops, brainstorms, \"let's figure this out\".)</li></ul><p>If a meeting does none of those three, it's probably the meeting that should have been an email.</p>",
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'For any meeting, ask yourself: is this to share, decide or solve? And do they need ME for it? If you\'re not sure, it\'s fine to ask the organiser.',
    },
  ],
  apply: {
    scenario: 'Monday, week two. Eleven meetings.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What are the three main jobs a meeting can do?',
        options: [
          { text: 'Eat, talk, leave', why: 'Some meetings feel like that. But there are three real jobs.' },
          { text: 'Share, decide, solve' },
          { text: 'Start, middle, end', why: 'That\'s every meeting\'s shape, not its job.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'What is each meeting for?',
        groups: ['Share', 'Decide', 'Solve'],
        items: [
          { text: 'All-hands: the CEO\'s quarterly update', group: 0 },
          { text: 'Choosing between two couriers', group: 1 },
          { text: 'Working out why deliveries are late', group: 2 },
          { text: 'Daily stand-up', group: 0 },
          { text: 'Approving next year\'s budget', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'brian',
        message: 'Morning! You\'ll see a few invites from me this week, don\'t panic.',
        prompt: 'Remi has eleven. What\'s the most useful reply?',
        options: [
          { text: 'Got them all, I\'ll be at every one!', why: 'Keen, but he can\'t do his actual work if he does.' },
          { text: 'Help, there are eleven.', why: 'Honest. But give Brian something easy to answer.' },
          { text: 'Morning! I\'ve got eleven this week. Which ones do you need me in, so I can keep time for the supplier summary?' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'A meeting that shares, decides or solves nothing "should have been an ..." (one word)',
        answers: ['email', 'e-mail'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: '"Pre-sync to align on the sync." What is it, probably?',
        options: [
          { text: 'A short meeting to prepare before a bigger meeting' },
          { text: 'A swimming class', why: 'Sync, not sink. Remi checked.' },
          { text: 'A meeting to cancel a meeting', why: 'It\'s preparation: agreeing a position before the main meeting.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Zanele\'s plan for Monday. Which line is the problem?',
        lines: [
          'Accept every meeting invite, all fourteen.',
          'Ask Brian which ones she really needs.',
          'Block two hours for her spreadsheet.',
        ],
        bug: 0,
        fix: 'Check what each meeting is for before accepting.',
        explanation: 'Accepting everything leaves no time for the work the meetings are about.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Review from Chapter 1. Match the phrase.',
        pairs: [
          ['Circle back', 'Come back to it later'],
          ['Take it offline', 'Discuss it separately'],
          ['Bandwidth', 'Time and energy for more'],
          ['Action item', 'A specific task from a meeting'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Remi\'s question to himself before every meeting.',
        template: 'Is this to share, [[1]] or [[2]]? And do they need [[3]] for it?',
        blanks: [['decide'], ['solve'], ['me']],
        distractors: ['eat', 'everyone'],
      },
      {
        kind: 'mcq',
        prompt: 'Remi declines every meeting and misses the one where his deadline changed. What\'s the lesson?',
        options: [
          { text: 'Never decline anything', why: 'Too far the other way. Some meetings he really can skip.' },
          { text: 'Meetings are useless', why: 'This one wasn\'t: it changed his deadline.' },
          { text: 'Check which meetings affect your own work before you decline them' },
        ],
        answer: 2,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build a polite question to a meeting organiser.',
        tiles: ['Do', 'you', 'need', 'me', 'there,', 'or', 'can', 'I', 'read', 'the', 'notes?'],
      },
    ],
  },
  reflect: {
    prompt: 'Think about the meetings, classes or group calls in your week. Which ones share, which decide, which solve, and which could have been a message?',
    starters: ['The one that could be a message is...', 'The one that really needs me is...'],
  },
  deepen: {
    title: 'The calendar audit',
    summary: 'Look at next week\'s calendar (or timetable). Label every meeting Share, Decide or Solve. For any that need a label you can\'t find, ask the organiser what it\'s for.',
  },
  notes: 'Share/decide/solve is a teaching framework (variants appear in many meeting-practice guides), not a cited taxonomy. "Sync" = short coordination meeting (business jargon); "huddle" = brief informal meeting (Merriam-Webster). "Pre-sync" invented-sounding but in real use for prep meetings.',
};

export default lesson;
