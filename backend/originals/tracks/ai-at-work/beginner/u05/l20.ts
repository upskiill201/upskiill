import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 5 · Lesson 20 — Unit Challenge. The two-day answer. */
const lesson: OriginalLesson = {
  key: 'l20',
  title: 'Unit Challenge: the two-day answer',
  summary: 'Tuesday to Thursday: Lucía\'s big question, from first prompt to a cited one-page brief. Every Unit 5 skill, under pressure.',
  minutes: 15,
  milestone: 'UNIT_CHALLENGE',
  xp: 30,
  outcomes: ['Use every Unit 5 skill on one real decision', 'Prove you can research fast, fairly and honestly'],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Unit 5\'s final challenge. "Should we launch in Ghana next?" Two days, start to finish.', replies: ['Let\'s go'] },
        { tey: 'The theme: AI to plan and challenge, sources to verify, people to decide. Go.' },
      ],
    },
  ],
  apply: {
    scenario: 'Tuesday 9am. Lucía\'s question arrives.',
    items: [
      {
        kind: 'tapBuild',
        prompt: 'Tuesday 9:00. Build Ada\'s first note.',
        tiles: ['Decision:', 'Ghana', 'next,', 'or', 'not?'],
        distractors: ['obviously'],
      },
      {
        kind: 'sortGroups',
        prompt: '9:15. Specific research question, or too vague?',
        groups: ['Specific', 'Vague'],
        items: [
          { text: 'What licence would we need, and how long does it take?', group: 0 },
          { text: 'Is Ghana good?', group: 1 },
          { text: 'Which apps do Accra shop owners use now?', group: 0 },
          { text: 'What about the market?', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: '9:30. Which first AI request?',
        options: [
          { text: 'Should we launch in Ghana?', why: 'Hands over the decision.' },
          { text: 'I\'m researching whether a payments app should launch in Ghana next. What key things must I find out, and which official sources usually have the answers?' },
          { text: 'Tell me everything about Ghana.', why: 'Too broad.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: '10:00. Order these sources from strongest to weakest.',
        lines: ['Central bank report', 'University study', 'News article', 'Sponsored blog'],
      },
      {
        kind: 'findBug',
        prompt: '11:00. Which claim in Ada\'s notes overstates its source?',
        lines: [
          '54% of 300 surveyed traders prefer mobile money for big payments [3]',
          'Partner bank operates in Accra [2]',
          'Ghanaian traders have abandoned cash [blog]',
          'Licence: timeline to confirm with regulator',
        ],
        bug: 2,
        fix: 'Use the survey\'s actual finding, with its limits.',
        explanation: 'The blog inflated the survey.',
      },
      {
        kind: 'mcq',
        prompt: '12:00. The AI\'s table ends "Kenya is clearly best". What now?',
        options: [
          { text: 'Switch to Kenya', why: 'It decided without your criteria.' },
          { text: 'Ask again with our criteria, a source or "unknown" in each cell, and no recommendation' },
          { text: 'Ignore the whole table', why: 'Redo it properly.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: '2pm. I asked the AI why Ghana is best and it totally agreed!',
        prompt: 'Best reply?',
        options: [
          { text: 'Great, done.', why: 'Leading question, agreeing answer.' },
          { text: 'AI can\'t help with this.', why: 'It can, when asked neutrally.' },
          { text: 'It tends to agree with how we ask. I\'ve asked it what would make Ghana the wrong choice; here\'s the biggest risk it found.' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Wednesday. Match the critic role to what it found.',
        pairs: [
          ['Sceptical investor', 'Why would shops switch?'],
          ['Worried regulator', 'No licence timeline'],
          ['Busy shop owner', '"My current app is free"'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Wednesday 11am. How should Ada find out if shops will switch?',
        options: [
          { text: 'Ask the AI to predict it.', why: 'It can\'t know.' },
          { text: 'Use AI to write neutral interview questions, then talk to ten shop owners.' },
          { text: 'Ask the AI to pretend to be shop owners.', why: 'Invented answers.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Thursday 9am. Known, findable or unknowable for now?',
        groups: ['Known', 'Findable', 'Unknowable'],
        items: [
          { text: 'Partner bank in Accra (their site)', group: 0 },
          { text: 'Exact licence timeline', group: 1 },
          { text: 'Will most shops switch?', group: 2 },
          { text: 'Survey: 54% prefer mobile money for big payments', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Thursday 2:15. Before my 3pm call: do we need a local company in Ghana? Yes or no?',
        prompt: 'Best reply at 2:55?',
        options: [
          { text: 'Likely yes, based on the regulator\'s guidance (link). Not yet confirmed by a lawyer, so treat it as "probably".' },
          { text: 'Yes, definitely; the AI said so.', why: 'No official source, overstated.' },
          { text: 'I couldn\'t find out.', why: 'She found a strong, honest answer.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Thursday 4pm. Complete the drafting request.',
        template: 'Using only my [[1]] notes, draft the six-part brief. Keep source [[2]] next to each fact.',
        blanks: [['checked'], ['numbers']],
        distractors: ['rough', 'emojis'],
      },
      {
        kind: 'orderLines',
        prompt: '4:30. Order the brief.',
        lines: ['Question', 'Answer', 'Why', 'Biggest risk', 'Unknowns', 'Sources'],
      },
      {
        kind: 'findBug',
        prompt: '5:00. Which citation needs fixing?',
        lines: ['[1] Bank of Ghana report, p.41', '[2] Partner bank site, accessed 14 May', '[3] Trader survey 2024, Table 2', '[4] AI chat, Tuesday'],
        bug: 3,
        fix: 'Replace with the document it pointed to, once opened, or remove.',
        explanation: 'An AI chat isn\'t a source.',
      },
      {
        kind: 'typeAnswer',
        prompt: '5:30. Ada\'s answer: "Yes, as a ...-month pilot in one Accra market." (number)',
        answers: ['3', 'three'],
        placeholder: 'A number',
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Thursday 6pm. Carmen approved the pilot! Can your team turn it into a plan by next week?',
        prompt: 'Tobi has asked Ada\'s new colleague Tolu to run the pilot. Best reply from Ada?',
        options: [
          { text: 'I\'ll ask the AI to write the whole plan tonight.', why: 'Planning is next, and it needs people.' },
          { text: 'That\'s not my job.', why: 'She\'s the one who knows the research.' },
          { text: 'Yes. Our new colleague Tolu is running it, and I\'ll work with him tomorrow to turn the brief into a plan.' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the one idea behind all of Unit 5?',
        options: [
          { text: 'AI should make research decisions', why: 'People decide.' },
          { text: 'AI to plan, explain and challenge; sources to verify; people to decide' },
          { text: 'Read everything before deciding', why: 'Stop when more wouldn\'t change the decision.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'You finished Unit 5! Which research habit will you use on your next real question?',
    starters: ['The habit:', 'The question I\'ll use it on:'],
  },
  deepen: { title: 'Coming next', summary: 'Unit 6: Tolu\'s first project. Ada helps her new colleague turn the pilot into a plan.' },
  notes: 'Review of the whole unit. Tolu is Ada\'s new colleague (narrated; replaces the earlier outline idea of Grace as a colleague, per CAST.md). Content fictional.',
};

export default lesson;
