import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 7 · Lesson 6. Before / After: don't trust generated code blindly. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'Don\'t trust it blindly',
  summary: 'Benny changes his display name to a line of code. When Hazel opens the sign-up list, a pop-up appears saying "BENNY WAS HERE". Funny. Also a real security hole, written by the AI and approved by Hazel.',
  minutes: 12,
  outcomes: [
    'Spot code that treats people\'s text as code',
    'Spot "security" that only lives in the page',
    'Ask the AI for a security review of its own changes',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Two ways to show a name',
      before: { label: 'What the AI wrote', text: 'row.innerHTML = signup.name + " is driving";\n\n// Benny\'s name: <img src=x onerror="alert(\'BENNY WAS HERE\')">\n// The page runs it as code.' },
      after: { label: 'The safe version', text: 'row.textContent = signup.name + " is driving";\n\n// The same name now shows as plain text.\n// Nothing runs.' },
      notes: [
        'innerHTML treats text as code. If anyone can choose that text (a name, a comment), they can make the page run their code on other people\'s screens. This is called cross-site scripting.',
        'textContent treats it as plain text. Same look, no hole.',
        'Benny made a pop-up. Someone unkind could make a fake login box. Anything people type should be shown as text, never as code.',
      ],
    },
    {
      kind: 'text',
      html: '<p>The second hole was quieter: the AI hid the "Delete gig" button for everyone except Hazel, <em>in the page</em>. But the database had no rule stopping anyone else deleting gigs. Hiding a button isn\'t a lock.</p><p>After any change that handles people\'s data or logins, ask: <strong>"Review your last change for security problems: user text shown as code, checks that only happen in the page, data anyone can read or change. List them, don\'t fix yet."</strong></p>',
    },
  ],
  apply: {
    scenario: 'BENNY WAS HERE.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why did Benny\'s name run as code?',
        options: [
          { text: 'innerHTML treated his name as code instead of text' },
          { text: 'He hacked the database', why: 'He only set his own name. The page did the rest.' },
          { text: 'Names are always code', why: 'Only when the page treats them as code.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which line can run someone else\'s code?',
        lines: [
          'title.textContent = gig.title;',
          'place.textContent = gig.place;',
          'note.innerHTML = signup.note;',
        ],
        bug: 2,
        fix: 'note.textContent = signup.note;',
        explanation: 'signup.note is typed by a parent. innerHTML would run anything in it.',
        language: 'javascript',
      },
      {
        kind: 'sortGroups',
        prompt: 'A real lock, or only hiding?',
        groups: ['Real lock', 'Only hiding'],
        items: [
          { text: 'A database rule: only Hazel can delete gigs', group: 0 },
          { text: 'The Delete button hidden for non-admins', group: 1 },
          { text: 'RLS: only your own profile', group: 0 },
          { text: 'Phone numbers hidden with CSS', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'benny',
        message: 'It was just a joke pop-up. Why\'s it a big deal?',
        prompt: 'Hazel\'s reply?',
        options: [
          { text: 'It\'s not, ignore it.', why: 'The same hole could show a fake login box to every parent.' },
          { text: 'Because the same trick could show every parent a fake login box. You found it kindly. Someone else might not.' },
          { text: 'Because pop-ups are rude.', why: 'The issue is running other people\'s code.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'The safe way to show what people typed.',
        template: 'row.[[1]] = signup.name;',
        blanks: [['textContent']],
        distractors: ['innerHTML', 'outerHTML'],
        language: 'javascript',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Best security request after a change?',
        options: [
          { text: 'Is it secure?', why: 'It will probably say yes.' },
          { text: 'Make it secure', why: 'Vague: it may change lots of things.' },
          { text: 'Review your last change for security problems: user text shown as code, checks only in the page, data anyone can read or change. List them; don\'t fix yet.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'The name for making a page run someone\'s code through text they typed. (Three words, hyphen optional.)',
        answers: ['cross site scripting', 'cross-site scripting', 'xss'],
        placeholder: '...-... ...',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the hole to its fix.',
        pairs: [
          ['innerHTML with people\'s text', 'textContent'],
          ['Button hidden in the page', 'A database rule'],
          ['Everyone can read profiles', 'RLS: only your own'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'The AI\'s security review lists three problems. What next?',
        options: [
          { text: 'Fix them one at a time, testing each, like any other change' },
          { text: 'Fix all three at once', why: 'One at a time, so you know what each change did.' },
          { text: 'Ignore them, the AI wrote them', why: 'You approved them. You fix them.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'Review from Chapter 3: why check generated code at all, if the app works?',
        options: [
          { text: 'You don\'t need to', why: 'BENNY WAS HERE.' },
          { text: 'Working and safe are different tests; you only find holes by looking or testing for them' },
          { text: 'To make it faster', why: 'It\'s about safety.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'Where in your app do people type text that other people see? List each one.',
  },
  deepen: {
    title: 'On your computer: security review',
    summary: 'Ask Claude Code: "Review this project for security problems: user text shown with innerHTML, checks only in the page, tables without RLS, secrets in code. List them with file and line; don\'t fix yet." Fix them one at a time, testing each.',
  },
  notes: 'Cross-site scripting (XSS) via innerHTML is a standard OWASP risk; textContent is the safe DOM sink for plain text. Client-side-only authorisation is a common flaw in AI-generated apps (widely reported, no statistic quoted).',
};

export default lesson;
