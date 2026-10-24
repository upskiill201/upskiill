import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 6. Tap to explore: CLAUDE.md, the project's memory. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'The project\'s memory',
  summary: 'New day, new session. Hazel asks for a small change and it uses blue, a framework and Celsius. It forgot everything. Ruth: "Write the house rules down where it reads them."',
  minutes: 12,
  outcomes: [
    'Explain what CLAUDE.md is for',
    'Create one with /init and edit it',
    'Know what belongs in it, and what doesn\'t',
  ],
  learn: [
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Each new session starts fresh: it doesn\'t remember yesterday\'s chat. But it reads a file called CLAUDE.md in your project folder at the start of every session. Type /init and it writes a first one for you; then you edit it.',
    },
    {
      kind: 'explore',
      title: 'Hazel\'s CLAUDE.md',
      text:
        '# Esplanade Brass site\n\nPages: index.html (my lessons), thermometer.html (pledges toward $18,000).\n\n## House rules\n- Plain HTML, CSS and JavaScript. No frameworks.\n- Colours: gold and black, like our band shirts.\n- Money in US dollars, whole numbers, like $1,200.\n- Dates like "Oct 12".\n- Never change index.html unless I ask.\n- Plan first for anything bigger than one small change.',
      hotspots: [
        { phrase: '# Esplanade Brass site', note: 'A title and one line on what the project is. A new session knows where it is straight away.' },
        { phrase: 'Pages: index.html (my lessons), thermometer.html (pledges toward $18,000).', note: 'A tiny map of the project: which file does what.' },
        { phrase: 'No frameworks.', note: 'A rule it would otherwise break every new session.' },
        { phrase: 'Money in US dollars, whole numbers, like $1,200.', note: 'An example, not an adjective. Same trick as lesson 3.' },
        { phrase: 'Never change index.html unless I ask.', note: 'A standing limit. Now she doesn\'t have to repeat it in every brief.' },
        { phrase: 'Plan first for anything bigger than one small change.', note: 'Even your working habits can live here.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'warning',
      text: 'Keep it short, and never put passwords or secret keys in CLAUDE.md. It\'s a normal file: it gets shared, backed up and read.',
    },
  ],
  apply: {
    scenario: 'House rules for the band\'s project.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why did the new session forget Hazel\'s colours?',
        options: [
          { text: 'It\'s broken', why: 'Each session starts fresh. That\'s normal.' },
          { text: 'A new session doesn\'t remember old chats, and the rules weren\'t written in CLAUDE.md' },
          { text: 'Gold isn\'t allowed', why: 'Gold is fine.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which command writes a first CLAUDE.md for you?',
        answers: ['/init', 'init'],
        placeholder: '/...',
      },
      {
        kind: 'sortGroups',
        prompt: 'Belongs in CLAUDE.md, or not?',
        groups: ['Belongs', 'Keep out'],
        items: [
          { text: 'No frameworks', group: 0 },
          { text: 'The school\'s Wi-Fi password', group: 1 },
          { text: 'Dates like "Oct 12"', group: 0 },
          { text: 'Ruth\'s home phone number', group: 1 },
          { text: 'Which file does what', group: 0 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line should come out of Hazel\'s CLAUDE.md?',
        lines: [
          '- Plain HTML, CSS and JavaScript.',
          '- Colours: gold and black.',
          '- Admin password: brass2026',
          '- Never change index.html unless I ask.',
        ],
        bug: 2,
        fix: 'Delete it. Passwords never go in project files.',
        explanation: 'CLAUDE.md gets shared and backed up like any file. Secrets get their own safe place in Chapter 7.',
      },
      {
        kind: 'chatReply',
        from: 'benny',
        message: 'Should I write the whole history of the band in CLAUDE.md so it really knows us?',
        prompt: 'Hazel\'s answer?',
        options: [
          { text: 'Yes, the longer the better.', why: 'Long files bury the rules that matter.' },
          { text: 'Keep it short: what the project is, which file does what, and the house rules.' },
          { text: 'Write it in all caps.', why: 'Clear beats loud.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the house rule.',
        template: 'Money in US [[1]], whole numbers, like [[2]].',
        blanks: [['dollars'], ['$1,200']],
        distractors: ['coins', 'about a thousand'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the CLAUDE.md line to its job.',
        pairs: [
          ['# Esplanade Brass site', 'Says what the project is'],
          ['Pages: index.html, thermometer.html', 'A map of the files'],
          ['Never change index.html unless I ask', 'A standing limit'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'After /init writes CLAUDE.md, what should Hazel do?',
        options: [
          { text: 'Read it, fix anything wrong, and add her house rules' },
          { text: 'Never open it', why: 'It\'s her project\'s rulebook: read it.' },
          { text: 'Delete it', why: 'It\'s useful. Edit it instead.' },
        ],
        answer: 0,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build a house rule.',
        tiles: ['Plan first', 'for anything bigger', 'than one small change.'],
        distractors: ['sometimes', 'if you feel like it'],
      },
      {
        kind: 'mcq',
        prompt: 'Review: Hazel wants to change the heading. Does she still need to say "keep everything else the same"?',
        options: [
          { text: 'No, CLAUDE.md does that', why: 'CLAUDE.md holds house rules, not every change.' },
          { text: 'Never say it again', why: 'It\'s still a good habit.' },
          { text: 'Yes: precise requests are still the habit; CLAUDE.md just covers the rules for every session' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'What are three house rules for your project that you\'re tired of repeating?',
    starters: ['1.', '2.', '3.'],
  },
  deepen: {
    title: 'On your computer: your CLAUDE.md',
    summary: 'In your project, run claude and type /init. Open the CLAUDE.md it writes (any text editor works, or ask Claude Code to show it). Add three house rules. Start a new session and ask a small change: does it follow them?',
  },
  notes: 'code.claude.com docs (October 2026): /init "Initialize project with a CLAUDE.md guide"; CLAUDE.md is loaded into each session; /memory edits it. Other tools use AGENTS.md or rules files (Chapter 8).',
};

export default lesson;
