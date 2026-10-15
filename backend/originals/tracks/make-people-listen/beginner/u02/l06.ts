import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 6. "Producer's Notes" (card deck): three things, not twelve (Cowan 2001 working-memory limit; signposting). */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'Producer\'s Notes: three things, not twelve',
  summary: 'Mr Rao replies: "Thanks! Can you also tell me everything else that might break?" Arjun has a list of twelve risks. Tey hits the dump button. "Producer\'s Notes: nobody remembers twelve."',
  minutes: 11,
  outcomes: [
    'Know roughly how much people can hold in mind at once',
    'Group many points into three or four',
    'Signpost so listeners know where they are',
  ],
  learn: [
    {
      kind: 'text',
      html: "<p>Arjun's list of risks has twelve items. Each one is real. If he sends all twelve with equal weight, Mr Rao will remember none of them. Here are the Producer's Notes on how much people can hold.</p>",
    },
    {
      kind: 'text',
      html: "<h3>Note 1: The \"seven\" was a guess</h3><p>You may have heard people can remember \"seven things, plus or minus two\". That famous figure from the 1950s was a rough estimate. Later research suggests working memory holds closer to <strong>about four</strong> chunks at once.</p><h3>Note 2: So group things</h3><p>Twelve risks become three groups: <em>\"Three areas need work: payments, stock levels, and password security.\"</em> Now there are three things to hold, each with details inside.</p>",
    },
    {
      kind: 'text',
      html: "<h3>Note 3: Signpost</h3><p>Tell people how many things are coming and where they are: \"Three things. First, payments. Second... Finally...\" Signposts let listeners relax and follow, instead of wondering how long this will last.</p><h3>Note 4: Rank them</h3><p>\"The most urgent is payments.\" If you only get one point across, make sure it's the one that matters most.</p>",
    },
    {
      kind: 'check',
      question: 'About how many chunks can most people hold in mind at once, according to more recent research?',
      options: ['About 4', 'About 12', 'About 25'],
      answer: 0,
      explanation: 'Research since the 2000s suggests around four chunks, fewer than the famous "seven".',
    },
    {
      kind: 'text',
      html: "<h3>Note 5: Put the rest in writing</h3><p>The other nine risks aren't deleted. They go in a written list Mr Rao can check later. Spoken or short messages carry the three. Documents carry the twelve.</p>",
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Group into three or four. Say how many. Say which matters most. Put the full list in writing.',
    },
  ],
  apply: {
    scenario: 'Tey FM, Producer\'s Notes. Twelve risks.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What did later research suggest about the famous "seven, plus or minus two"?',
        options: [
          { text: 'It\'s actually twenty', why: 'Much fewer, not more.' },
          { text: 'It was exactly right', why: 'It was a rough figure; later estimates are lower.' },
          { text: 'Working memory holds closer to about four chunks' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Group Arjun\'s risks into three areas.',
        groups: ['Payments', 'Stock', 'Security'],
        items: [
          { text: 'Checkout freezes under load', group: 0 },
          { text: 'Items show in stock when they aren\'t', group: 1 },
          { text: 'Staff use weak passwords', group: 2 },
          { text: 'Refunds fail sometimes', group: 0 },
          { text: 'No two-step login for admins', group: 2 },
          { text: 'Stock counts update slowly', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'arjun',
        message: 'Mr Rao asked for everything that might break. Shouldn\'t I list all twelve?',
        prompt: 'Producer\'s note?',
        options: [
          { text: 'Yes, all twelve in the email body, equal weight.', why: 'He\'ll remember none of them.' },
          { text: 'Only mention one and hide the rest.', why: 'Hiding risks isn\'t the answer. Group and rank them.' },
          { text: 'Lead with three areas, most urgent first. Put the full twelve in an attached list.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Telling listeners "three things: first... second... finally..." is called ___. (one word)',
        answers: ['signposting', 'signposts', 'signpost'],
        placeholder: 'One word',
      },
      {
        kind: 'orderLines',
        prompt: 'Put Arjun\'s spoken summary in order.',
        lines: ['Three areas need work.', 'Most urgent: payments.', 'Second: stock levels.', 'Finally: password security.', 'The full list is in the attachment.'],
      },
      {
        kind: 'mcq',
        prompt: 'Why rank the points ("most urgent is...")?',
        options: [
          { text: 'To sound important', why: 'It\'s for the listener, not for you.' },
          { text: 'If only one point gets through, it\'s the one that matters most' },
          { text: 'Ranking is always required', why: 'Not a rule, a safety net.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Arjun\'s update. Which line ignores the Producer\'s Notes?',
        lines: [
          'Three areas need work: payments, stock and security.',
          'Most urgent is payments.',
          'Also: risk 4, risk 5, risk 6, risk 7, risk 8, risk 9, risk 10, risk 11, risk 12.',
        ],
        bug: 2,
        fix: 'The full list of 12 is in the attachment.',
        explanation: 'Reeling off nine more risks undoes the grouping. Put them in writing.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Review.',
        pairs: [
          ['"It\'s like a shop with one till"', 'A comparison'],
          ['Subject line = the action', 'BLUF in email'],
          ['Tappers and listeners', 'The curse of knowledge'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The Producer\'s Notes.',
        template: 'Group into [[1]] or four. Say how [[2]]. Say which matters [[3]].',
        blanks: [['three'], ['many'], ['most']],
        distractors: ['twelve', 'least'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build a signposted opening.',
        tiles: ['Three', 'things.', 'First,', 'the', 'most', 'urgent:', 'payments.'],
        distractors: ['twelve'],
      },
    ],
  },
  reflect: {
    prompt: 'Think of something you need to explain that has lots of parts. Group it into three, and say which matters most.',
    starters: ['The topic is...', 'My three groups: ...', 'Most important: ...'],
  },
  deepen: {
    title: 'The rule of three',
    summary: 'Next time you give an update, a presentation or instructions, use exactly three points, signposted. Notice how many people repeat them back to you correctly.',
  },
  notes: 'Miller (1956) "seven plus or minus two" — Cowan (2001), Behavioral and Brain Sciences 24(1): central capacity limit around four chunks; some debate remains (stated as "suggests"). Signposting and ranking are standard presentation advice.',
};

export default lesson;
