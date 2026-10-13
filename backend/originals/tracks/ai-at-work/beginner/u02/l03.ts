import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 2 · Lesson 3 — the three levels of editing, and targeted rewrites instead of rolling the dice. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: "Rewrite, don't regenerate",
  summary: 'Hitting "regenerate" rolls the dice. Asking for a specific level of edit gets you exactly what you need.',
  minutes: 12,
  outcomes: [
    'Choose between a proofread, a light edit and a rewrite',
    'Ask the AI to keep your words where possible',
    'Get a list of suggested changes instead of a new draft',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: "When you don't like an AI draft, do you hit the regenerate button?", replies: ['All the time', 'What button?'] },
        {
          tey: "Regenerating is rolling the dice: a whole new draft, good parts and all thrown away. Sometimes better, sometimes worse. Never targeted.",
        },
        { tey: 'Editors work differently. They agree on HOW MUCH to change before they touch anything.', replies: ['How much?', 'Like levels?'] },
        {
          tey: 'Three levels. A proofread fixes typos and grammar only. A light edit also tidies wording and cuts flab, but keeps your words. A rewrite changes structure and wording freely.',
        },
        { tey: 'Most of the time you want a light edit. Most people accidentally ask for a rewrite.', replies: ['Why does that matter?'] },
        {
          tey: "Because a rewrite replaces your voice and can quietly change your meaning. Ask for the smallest level that fixes the problem, and it stays yours.",
        },
      ],
    },
    {
      kind: 'reading',
      title: 'The three levels of editing',
      html:
        '<table><thead><tr><th>Level</th><th>What changes</th><th>Use it when</th></tr></thead><tbody>' +
        '<tr><td><strong>Proofread</strong></td><td>Spelling, grammar, punctuation only</td><td>You are happy with it; just catch mistakes</td></tr>' +
        '<tr><td><strong>Light edit</strong></td><td>Also clearer wording, cut extra words; keeps your sentences</td><td>It is a bit long or clunky</td></tr>' +
        '<tr><td><strong>Rewrite</strong></td><td>Structure and wording can change freely</td><td>It is not working at all</td></tr>' +
        '</tbody></table>' +
        '<p>Two extra moves make edits safer:</p>' +
        '<ul>' +
        '<li><strong>"Keep my words where possible."</strong> Protects your voice.</li>' +
        '<li><strong>"List the changes you would make, don\'t rewrite yet."</strong> You choose which suggestions to accept, like a reviewer\'s notes.</li>' +
        '</ul>',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Ask for the smallest level of edit that fixes the problem.',
    },
    {
      kind: 'check',
      question: "Ada's email is fine but a bit wordy. Which level?",
      options: ['Proofread', 'Light edit', 'Full rewrite'],
      answer: 1,
    },
  ],
  apply: {
    scenario: 'Ada is editing her own drafts with AI.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match the level of edit to what it changes.',
        pairs: [
          ['Proofread', 'Spelling and grammar only'],
          ['Light edit', 'Clearer wording, keeps your sentences'],
          ['Rewrite', 'Structure and wording, freely'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Which level does each situation need?',
        groups: ['Proofread', 'Light edit', 'Rewrite'],
        items: [
          { text: 'Happy with it, just catch typos', group: 0 },
          { text: 'A bit long and clunky', group: 1 },
          { text: 'The structure is a mess and the point is buried', group: 2 },
          { text: 'One sentence feels awkward', group: 1 },
          { text: 'Final check before sending a contract email', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What is the problem with pressing "regenerate" on a nearly-good draft?',
        options: [
          { text: 'It throws away the good parts and rolls the dice on a new draft' },
          { text: 'It costs extra', why: 'Not the point. It is untargeted.' },
          { text: 'It always gets worse', why: 'Not always, but it is never targeted.' },
        ],
        answer: 0,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the line that protects Ada\'s voice.',
        tiles: ['Keep', 'my', 'words', 'where', 'possible'],
        distractors: ['delete', 'replace'],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'I asked the AI to "improve" my email and now it sounds nothing like me and says something slightly different!',
        prompt: 'What should Ada suggest next time?',
        options: [
          { text: 'Ask for a light edit, keep your words where possible, and list the changes so you can check the meaning.' },
          { text: 'Ask it to "improve it more".', why: 'Same problem, bigger.' },
          { text: 'Never edit with AI.', why: 'A smaller edit level fixes this.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Ada\'s editing request.',
        template: 'Give this a [[1]] edit: tidy the wording and cut extra words, but keep my [[2]] where possible. [[3]] what you changed.',
        blanks: [['light'], ['words', 'sentences'], ['List', 'Show']],
        distractors: ['total', 'Hide'],
      },
      {
        kind: 'findBug',
        prompt: 'Spot the request that will replace Ada\'s voice.',
        lines: ['Proofread this: spelling and grammar only.', 'Completely rewrite this however you like.', 'Light edit, keep my words.'],
        bug: 1,
        fix: 'Light edit: cut extra words, keep my wording.',
        explanation: 'For a draft that is already mostly fine, a free rewrite is the wrong level.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'The edit level that fixes only spelling and grammar is a ... (one word)',
        answers: ['proofread', 'proofreading', 'proof-read'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Ada wants suggestions she can pick from, not a new draft. Which request?',
        options: [
          { text: 'Make it better.', why: 'It will just rewrite it.' },
          { text: 'List up to 5 changes you would make to this, with a one-line reason each. Don\'t rewrite it yet.' },
          { text: 'Rewrite it 3 times.', why: 'Three new drafts, not suggestions.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Order the safe editing routine.',
        lines: ['Decide the smallest level that fixes the problem', 'Ask for it, keeping your words where possible', 'Ask it to list what changed', 'Check the meaning did not change'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Targeted edit, or a dice roll?',
        groups: ['Targeted', 'Dice roll'],
        items: [
          { text: 'Pressing regenerate', group: 1 },
          { text: 'Light edit, list the changes', group: 0 },
          { text: '"Make it better"', group: 1 },
          { text: 'Proofread only', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Quick check of my announcement before it goes out? I like the wording, I just want no mistakes.',
        prompt: 'Which request should Ada use?',
        options: [
          { text: 'Proofread this: spelling, grammar and punctuation only. Don\'t change the wording.' },
          { text: 'Rewrite this to be more engaging.', why: 'She likes the wording. Proofread only.' },
          { text: 'Light edit and shorten it.', why: 'She did not ask for changes to wording or length.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Ask for the ... level of edit that fixes the problem (one word)',
        answers: ['smallest', 'lowest', 'minimum', 'least'],
        placeholder: 'One word',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the risk to the safety move.',
        pairs: [
          ['Your voice disappears', '"Keep my words where possible"'],
          ['Meaning quietly changes', '"List what you changed"'],
          ['Good parts get lost', 'Edit instead of regenerate'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Which level do most everyday drafts actually need?',
        options: [{ text: 'A light edit' }, { text: 'A full rewrite', why: 'Usually too much.' }, { text: 'No edit at all', why: 'A quick light edit usually helps.' }],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Think of the last time an AI edit changed too much. Which level should you have asked for?',
    starters: ['I asked it to...', 'I should have asked for...'],
  },
  deepen: { title: 'Try it today', summary: 'Ask for "a list of up to 5 suggested changes" on your next draft, and accept only the ones you agree with.' },
  notes: 'Proofread / copy-edit / rewrite levels are standard editorial practice, simplified.',
};

export default lesson;
