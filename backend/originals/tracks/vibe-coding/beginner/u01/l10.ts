import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 10. Chapter Challenge: Hazel's page. Build: the learner's own one-page site. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Challenge: Hazel\'s page',
  summary: 'Friday. Hazel promised Ruth a working page by practice tomorrow: lessons, prices, an email link, and the band\'s fundraiser line. Use everything from Chapter 1 to get it done, then build yours.',
  minutes: 14,
  milestone: 'UNIT_CHALLENGE',
  outcomes: ['Go from an empty folder to a working page', 'Ask for precise changes and approve them safely'],
  learn: [
    {
      kind: 'story',
      title: 'Friday, 7 p.m.',
      beats: [
        { speaker: 'narrator', text: 'Hazel opens the terminal. No clipboard in sight.' },
        { speaker: 'hazel', text: 'Folder. Start it. One clear prompt. Read every "Allow?". One change at a time.' },
        { speaker: 'ruth', text: '(by text) And show me it works, please. Not tell me. Show me.' },
        { speaker: 'tey', text: 'Get Hazel to practice tomorrow with a page she can show. Then your turn.' },
      ],
    },
  ],
  apply: {
    scenario: 'Chapter Challenge: Friday night build.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Hazel\'s whole evening, in order.',
        lines: [
          'cd Documents',
          'cd hazel-site',
          'claude',
          'Type a clear prompt for the page',
          'Read "Create index.html?" and say yes',
          'Open index.html in the browser and check it',
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'She wants to add the fundraiser. Which request?',
        options: [
          { text: 'Add fundraiser stuff', why: 'What stuff? Where? It will guess.' },
          { text: 'Make the page about the band instead', why: 'That throws away her lessons page.' },
          { text: 'At the bottom, add one line: "Every lesson helps send the Esplanade Brass to D.C." Keep everything else the same.' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Which part of her setup is a mistake?',
        lines: ['cd Documents', 'mkdir hazel-site', 'cd hazel-site', 'Start claude in the home folder instead'],
        bug: 3,
        fix: 'Start claude inside hazel-site.',
        explanation: 'It reads the folder it starts in. Keep that to the project.',
      },
      {
        kind: 'chatReply',
        from: 'ruth',
        message: 'It says "Done! Your page is ready." Good enough?',
        prompt: 'Hazel\'s answer?',
        options: [
          { text: 'Not until I\'ve opened it and checked the times, price and email link myself.' },
          { text: 'Yes, it said so.', why: '"Done" is a claim. Ruth wants it shown.' },
          { text: 'I\'ll ask it if it\'s sure.', why: 'It will say yes. Open the page instead.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Good habit tonight, or bad?',
        groups: ['Good', 'Bad'],
        items: [
          { text: 'One change per message', group: 0 },
          { text: '"Make it better"', group: 1 },
          { text: 'Reading each "Allow?"', group: 0 },
          { text: 'Turning off every question', group: 1 },
          { text: 'Refreshing the page after each change', group: 0 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Hazel\'s checklist.',
        template: 'One [[1]] per project. One [[2]] per message. [[3]] the page after each one.',
        blanks: [['folder'], ['change'], ['Check', 'Refresh']],
        distractors: ['laptop', 'Ignore'],
      },
      {
        kind: 'mcq',
        prompt: 'The email link opens nothing when clicked. What should Hazel type?',
        options: [
          { text: 'The email link doesn\'t open an email when I click it. Make it a mailto link to hazel.lessons@example.com. Keep everything else the same.' },
          { text: 'Fix it', why: 'Fix what? Say what\'s wrong and what you expected.' },
          { text: 'Start over', why: 'One broken link isn\'t worth a restart.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the tool to the moment.',
        pairs: [
          ['Esc', 'It\'s going the wrong way'],
          ['Shift+Tab', 'Switch to Plan mode for a big job'],
          ['/help', 'Forgot a command'],
          ['/exit', 'Done for the night'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Type the command that checks Claude Code is installed.',
        answers: ['claude --version', 'claude -v'],
        placeholder: 'claude ...',
      },
      {
        kind: 'chatReply',
        from: 'benny',
        message: 'Can we add a photo of the band?',
        prompt: 'Best way for Hazel to ask?',
        options: [
          { text: 'Add photos', why: 'Which photo? Where?' },
          { text: 'Find a photo of a band on the internet and add it', why: 'Using random internet photos can break copyright. Use her own.' },
          { text: 'I put band.jpg in this folder. Add it above the About me section, full width. Keep everything else the same.' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        prompt: 'Which mode should Hazel be in tonight?',
        options: [
          { text: 'A mode that skips every question', why: 'Only for throwaway sandboxes.' },
          { text: 'Ask: she sees every change first' },
          { text: 'It doesn\'t matter', why: 'It matters: you\'re learning what it does.' },
        ],
        answer: 1,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build a first prompt with what, who and how.',
        tiles: ['Make a one-page site in index.html', 'for my trumpet lessons,', 'for kids and adults in New Orleans.', 'Warm and simple.'],
        distractors: ['Make it amazing.', 'Use every framework.'],
      },
      {
        kind: 'mcq',
        prompt: 'Why did this course pick Claude Code over a website builder?',
        options: [
          { text: 'It\'s free', why: 'It needs a paid plan.' },
          { text: 'It never makes mistakes', why: 'It does. That\'s why you check.' },
          { text: 'Website builders are illegal', why: 'They\'re fine for demos.' },
          { text: 'You get real files on your own computer that you own and can check' },
        ],
        answer: 3,
      },
      {
        kind: 'findBug',
        prompt: 'Hazel\'s note for Ruth. Which line is wrong?',
        lines: [
          'The page is one file: index.html.',
          'It opens in any browser from my folder.',
          'The AI checked it, so I didn\'t need to.',
          'Next: a fundraising tool.',
        ],
        bug: 2,
        fix: 'I opened it and checked it myself.',
        explanation: 'Checking is Hazel\'s half of the job.',
      },
    ],
  },
  reflect: {
    prompt: 'You just went from nothing to a working page. What part felt hardest: the terminal, writing the prompt, or checking?',
    starters: ['The hardest part was...', 'Next time I\'ll...'],
  },
  deepen: {
    title: 'Build it: your one-page site',
    summary: 'Finish your own page in my-site: what it\'s for, who it\'s for, three real facts, an email link, and three precise changes. Open it in your browser and check every line. That\'s Chapter 1 shipped.',
  },
  notes: 'Chapter 1 review. Photo request teaches using your own image (copyright).',
};

export default lesson;
