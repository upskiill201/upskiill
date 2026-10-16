import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 9. Tap to explore: the team page, marked up. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Line check: the team page',
  summary: 'Day 11. Arjun, Kavya and Joel turn everything from this chapter into one pinned page. Joel says it\'s the first job where he knew what he owned by Week 2. Tap through to see every Chapter 2 tool on it.',
  minutes: 11,
  outcomes: [
    'See every Chapter 2 tool on one page',
    'Write a team page for your own group',
    'Keep it short enough that people use it',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Rao Shop team page (pinned)',
      text: 'Intent: Diwali shoppers on cheap phones find and buy a gift in under two minutes, in Hindi or English. Kavya owns product pages and the shipping page. Joel owns the cart, checkout and order emails. Arjun approves everything and talks to Mr Rao. Kavya decides layout; Joel decides speed; clashes come to Arjun, decided by noon. Overlap 11 to 4; urgent is a call. Handoffs: Joel sets the format, Kavya follows. New tasks get a name, a date and a yes.',
      hotspots: [
        { phrase: 'Intent: Diwali shoppers on cheap phones find and buy a gift in under two minutes', note: 'Commander\'s intent for the whole project: the why and what success looks like.' },
        { phrase: 'Kavya owns product pages and the shipping page.', note: 'One owner per piece. No "we".' },
        { phrase: 'Arjun approves everything and talks to Mr Rao.', note: 'One Accountable person, and one route to the client.' },
        { phrase: 'Kavya decides layout; Joel decides speed', note: 'Decision rights, given to the people closest to the work.' },
        { phrase: 'clashes come to Arjun, decided by noon', note: 'A tie-break with a deadline. No more day-long polite stand-offs.' },
        { phrase: 'Overlap 11 to 4; urgent is a call.', note: 'The working agreement that ended the 9 p.m. friction.' },
        { phrase: 'Handoffs: Joel sets the format, Kavya follows.', note: 'The "undefined" bug, prevented for every future field.' },
        { phrase: 'New tasks get a name, a date and a yes.', note: 'The habit that stops "we\'ll handle it".' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'A team page: the intent, who owns what, who approves, who decides, how you work, how handoffs work, how new tasks land.',
    },
  ],
  apply: {
    scenario: 'Line check, the team page.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why did Joel know what he owned by Week 2?',
        options: [
          { text: 'Arjun reminded him daily', why: 'The page did that.' },
          { text: 'He guessed right this time', why: 'No more guessing needed.' },
          { text: 'It was written on one page everyone could see' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which Chapter 2 tool is it?',
        groups: ['Ownership', 'Decisions', 'Working agreement'],
        items: [
          { text: 'Joel owns the cart', group: 0 },
          { text: 'Kavya decides layout', group: 1 },
          { text: 'Overlap 11 to 4', group: 2 },
          { text: 'Arjun approves everything', group: 0 },
          { text: 'Clashes decided by noon', group: 1 },
          { text: 'Urgent is a call', group: 2 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'joel',
        message: 'Can we add "the person receiving work owns the handoff format" for everything, not just sizes?',
        prompt: 'Arjun\'s best reply?',
        options: [
          { text: 'Yes, great idea. Add it. It\'s your page as much as mine.' },
          { text: 'Let me think about it for a week.', why: 'A good, small idea. Just add it.' },
          { text: 'Only I edit the page.', why: 'Then it\'s Arjun\'s page, not the team\'s.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'The first line of the page is the ___. (one word)',
        answers: ['intent', 'Intent', 'purpose', 'goal'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Why only one person talks to Mr Rao?',
        options: [
          { text: 'Mr Rao dislikes juniors', why: 'It\'s about clarity.' },
          { text: 'One route to the client stops mixed messages and surprise tasks' },
          { text: 'To keep juniors hidden', why: 'They\'re credited, just not the client contact.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Draft 1 of the page. Which line breaks Chapter 2?',
        lines: [
          'Kavya owns product pages.',
          'Order emails: we\'ll all keep an eye on them.',
          'Overlap 11 to 4.',
        ],
        bug: 1,
        fix: 'Joel owns order emails.',
        explanation: '"We\'ll all keep an eye on it" is diffusion of responsibility in writing.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put the team page in order.',
        lines: ['The intent', 'Who owns what', 'Who decides', 'How we work and hand off'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the line to the research.',
        pairs: [
          ['The intent line', 'Commander\'s intent'],
          ['One approver', 'RACI\'s single A'],
          ['Written together', 'Team charters'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'One [[1]] everyone can see. Short enough that people [[2]] it.',
        blanks: [['page'], ['use', 'read']],
        distractors: ['folder', 'ignore'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Arjun\'s reply to Joel.',
        tiles: ['It\'s', 'your', 'page', 'too.'],
        distractors: ['my'],
      },
    ],
  },
  reflect: {
    prompt: 'Write a five-line team page for a group you\'re in: intent, who owns what, who decides, how you work, how new tasks land.',
    starters: ['Intent: ...', 'Owners: ...', 'Decides: ...'],
  },
  deepen: {
    title: 'Pin it',
    summary: 'Pin your team page where the group already looks: the group chat, the shared drive, the wall. Ask everyone to add one line.',
  },
  notes: 'Synthesis of Chapter 2 tools: intent, single ownership, single accountable approver, decision rights with a tie-break, working agreement, handoff ownership, new-task habit. Fictional page.',
};

export default lesson;
