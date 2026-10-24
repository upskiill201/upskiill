import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 7. Story: the first prompt, and a page that appears. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'The first prompt',
  summary: 'Hazel teaches private trumpet lessons on Saturdays to pay for reeds and valve oil. Her first build: a one-page site for those lessons. One prompt, one "Allow?", one file.',
  minutes: 12,
  outcomes: [
    'Write a first prompt that says what, who and how',
    'Approve the AI\'s first file and open it in a browser',
    'Know what index.html is',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Monday, 9 p.m., kitchen table',
      beats: [
        { speaker: 'narrator', text: 'Hazel is in her hazel-site folder. Claude Code is waiting. She types.' },
        { speaker: 'hazel', text: 'make me a website' },
        { speaker: 'tey', text: 'Pause. A website about what? For whom? It will guess, and its guess will be generic. Give it the three things only Hazel knows.' },
        { speaker: 'hazel', text: 'Make a one-page website in a single file called index.html. It\'s for my private trumpet lessons in New Orleans: Saturdays, 9 a.m. to 1 p.m., $30 for 45 minutes, beginners welcome, kids and adults. Add a short "about me" and a way to email me at hazel.lessons@example.com. Warm and simple, no frameworks.' },
        { speaker: 'narrator', text: 'It writes a short plan, then asks: "Create index.html?" with Yes and No.' },
        { speaker: 'tey', text: 'That question is the tool asking permission before it touches a file. Read what it wants to do, then decide.' },
      ],
      choice: {
        prompt: 'What should Hazel do with "Create index.html?"',
        options: [
          { text: 'Read what it says it will create, then say Yes.', outcome: 'The file appears in her folder. She double-clicks it, and there\'s her lessons page, in her browser.', best: true },
          { text: 'Say No. It\'s scary.', outcome: 'Nothing happens, safely. But that\'s exactly what she asked for. Saying yes to what you asked for, after reading it, is the job.' },
          { text: 'Close the laptop and hope.', outcome: 'Tomorrow it\'s still waiting. Questions don\'t answer themselves.' },
        ],
      },
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'index.html is the usual name for a website\'s main page. Your browser can open it straight from your folder: double-click it, or ask Claude Code to open it for you.',
    },
  ],
  apply: {
    scenario: 'Hazel\'s lessons page.',
    items: [
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which first prompt gets the most useful page?',
        options: [
          { text: 'make me a website', why: 'It will guess everything: topic, audience, style.' },
          { text: 'Make a one-page site in index.html for my trumpet lessons: Saturdays 9 to 1, $30 for 45 minutes, beginners welcome. Warm and simple.' },
          { text: 'Make the best website ever made', why: 'Excited, but no facts it could use.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which details only Hazel knows (so she must say them)?',
        groups: ['Only Hazel knows', 'The AI can decide'],
        items: [
          { text: 'Lesson times and price', group: 0 },
          { text: 'Her email address', group: 0 },
          { text: 'How to write the HTML', group: 1 },
          { text: 'That kids and adults are welcome', group: 0 },
          { text: 'Which HTML tags to use', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'hazel',
        message: 'It\'s asking "Create index.html?" What do I do?',
        prompt: 'Tey\'s answer?',
        options: [
          { text: 'Always say no to everything.', why: 'Then nothing gets built. Read, then decide.' },
          { text: 'Read what it\'s going to create. It\'s the page you asked for, so say yes.' },
          { text: 'Ignore it.', why: 'It will wait forever.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the first-prompt recipe.',
        template: 'Say [[1]] to build, [[2]] it\'s for, and [[3]] it should feel.',
        blanks: [['what'], ['who'], ['how']],
        distractors: ['why not', 'when'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What\'s the usual file name for a website\'s main page?',
        answers: ['index.html', 'index'],
        placeholder: '....html',
      },
      {
        kind: 'mcq',
        prompt: 'How does Hazel see her new page?',
        options: [
          { text: 'She double-clicks index.html in her folder and it opens in her browser' },
          { text: 'She has to buy a web address first', why: 'Not to look at it on her own laptop.' },
          { text: 'She prints the code', why: 'The browser shows the page from the code.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which part of Hazel\'s prompt will cause a problem?',
        lines: [
          'Make a one-page website in index.html.',
          'For my trumpet lessons: Saturdays 9 to 1, $30 for 45 minutes.',
          'Put my home address and phone number on it.',
          'Warm and simple, no frameworks.',
        ],
        bug: 2,
        fix: 'Use a lessons email address instead.',
        explanation: 'This page will go public one day. Personal details like a home address don\'t belong on it.',
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Hazel\'s opening line.',
        tiles: ['Make', 'a one-page website', 'in a single file', 'called index.html'],
        distractors: ['somewhere', 'quickly'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each part of Hazel\'s prompt to what it tells the AI.',
        pairs: [
          ['"a single file called index.html"', 'Where to put it'],
          ['"Saturdays, $30 for 45 minutes"', 'Facts to include'],
          ['"Warm and simple"', 'How it should feel'],
          ['"no frameworks"', 'A limit'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'The page appears, but the price says $35. What\'s the best next move?',
        options: [
          { text: 'Start again with a new folder', why: 'Much too big for one wrong number.' },
          { text: 'Leave it, nobody will notice', why: 'Parents will notice when you charge $30.' },
          { text: 'Edit the code by hand at random', why: 'You can, later. Asking for one precise change is easier now.' },
          { text: 'Tell it: "The price is $30, not $35. Change only that."' },
        ],
        answer: 3,
      },
    ],
  },
  reflect: {
    prompt: 'What would your one-page site be about? Write the three things only you know: what, who it\'s for, how it should feel.',
    starters: ['What:', 'Who:', 'How it should feel:'],
  },
  deepen: {
    title: 'On your computer: your first page',
    summary: 'cd into your my-site folder and run claude. Type: "Make a one-page website about me in a single file called index.html. [What it\'s for, who it\'s for, 3 facts.] Warm and simple, no frameworks." Read the request, say yes, then open index.html in your browser.',
  },
  notes: 'Default permission mode asks before file edits (code.claude.com permission-modes, October 2026). Example email uses example.com, a reserved domain. $30 lesson price is story-only.',
};

export default lesson;
