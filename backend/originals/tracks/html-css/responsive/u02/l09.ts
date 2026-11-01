import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 2 · Chapter 2 · Lesson 9 — a specificity war (ids, long selectors, !important) vs flat classes. Before / After. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'The specificity war',
  summary: 'Every time a style didn\'t win, Kofi made the selector longer, then added an id, then !important. Now nothing can be changed without another !important. Here\'s his stylesheet, and the same look with flat classes.',
  minutes: 11,
  outcomes: ['Recognise a stylesheet stuck in a specificity war', 'Explain why !important makes things worse', 'Keep selectors flat with one class each'],
  learn: [
    {
      kind: 'compare',
      title: 'Escalating vs flat',
      before: { label: 'The war', text: 'body main article h2 { color: #FF9600; }\n#sunrise h2 { color: #F0438A; }\n.featured h2 { color: #FFF6E5 !important; }\nmain .beat-card h2 { color: #FF9600 !important; }\n\nEach rule tries to beat the last. Now Efua\'s small change needs yet another !important, and nobody can tell which colour will show.' },
      after: { label: 'Flat classes', text: '.beat-card h2 { color: #FF9600; }\n.featured h2 { color: #F0438A; }\n\nBoth score 0-1-1, so order decides: featured comes later and wins on featured cards. No ids, no !important. Any change is one line.' },
      notes: [
        'Each extra id, class or !important makes the next change harder.',
        '!important can only be beaten by another !important.',
        'Keep selectors short and similar, and let order do the rest.',
      ],
    },
    {
      kind: 'tryIt',
      title: 'Flat and calm',
      caption: 'Two short rules with the same score. The later one wins on featured cards.',
      code: '<style>\n  body { background-color: #14213D; color: #FFF6E5; font-family: Verdana, sans-serif; }\n  .beat-card { border: 2px solid #FF9600; border-radius: 12px; padding: 16px; margin-bottom: 16px; }\n  .beat-card h2 { color: #FF9600; }\n  .featured h2 { color: #F0438A; }\n</style>\n<article class="beat-card featured"><h2>Sunrise in Osu</h2></article>\n<article class="beat-card"><h2>Jollof Bounce</h2></article>\n',
      challenge: 'Swap the order of the two h2 rules. The featured heading turns orange: same score, so later wins.',
    },
    {
      kind: 'callout',
      tone: 'warning',
      text: 'Avoid !important and ids for styling. If a rule won\'t win, find out why before making it stronger.',
    },
  ],
  apply: {
    scenario: 'Ending the war.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why is !important a trap?',
        options: [
          { text: 'Browsers ignore it', why: 'They obey it. That\'s the problem.' },
          { text: 'It slows the page', why: 'It makes the CSS hard to change.' },
          { text: 'Only another !important can beat it, so they multiply' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'End the war: remove !important from the rule, and make the featured heading pink with a .featured h2 rule',
        starter: '<style>\n  .beat-card h2 { color: #FF9600 !important; }\n\n</style>\n<article class="beat-card featured"><h2>Sunrise in Osu</h2></article>\n',
        solution: '<style>\n  .beat-card h2 { color: #FF9600; }\n  .featured h2 { color: #F0438A; }\n</style>\n<article class="beat-card featured"><h2>Sunrise in Osu</h2></article>\n',
        hint: 'Delete !important, then add .featured h2 { color: #F0438A; } after it.',
        checks: [
          { message: 'The featured heading is pink', dom: { selector: '.featured h2', style: 'color', styleValue: '#F0438A' } },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Calm stylesheet, or war?',
        groups: ['Calm', 'War'],
        items: [
          { text: '.beat-card h2 { ... }', group: 0 },
          { text: 'body main article h2 { ... }', group: 1 },
          { text: '.featured h2 { ... }', group: 0 },
          { text: 'color: #FF9600 !important;', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that will cause trouble later.',
        language: 'css',
        lines: ['.beat-card { padding: 16px; }', '.beat-card h2 { color: #FF9600 !important; }', '.featured { border-color: #F0438A; }'],
        bug: 1,
        explanation: 'No .featured h2 rule can ever change this colour without its own !important.',
        fix: '.beat-card h2 { color: #FF9600; }',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'kofi',
        message: 'My rule doesn\'t win. Should I add !important?',
        options: [
          { text: 'Yes, always.', why: 'That\'s how the war started.' },
          { text: 'First check which rule is winning and why. Usually a flatter selector or a better order fixes it.' },
          { text: 'Add an id.', why: 'Also escalation. Find the cause.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What colour is the featured heading?',
        code: '.featured h2 { color: #F0438A; }\n.beat-card h2 { color: #FF9600; }\n\n<article class="beat-card featured"><h2>Sunrise in Osu</h2></article>',
        language: 'html',
        options: [
          { text: 'Orange: same score, and .beat-card h2 comes later' },
          { text: 'Pink: featured is special', why: 'Classes have no meaning to the browser. Order breaks the tie.' },
          { text: 'Both', why: 'One wins: the later.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each habit to its effect.',
        pairs: [
          ['Short class selectors', 'Easy to override'],
          ['Ids for styling', 'Hard to override'],
          ['!important', 'Only beaten by another !important'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Order the flat rules so featured wins.',
        language: 'css',
        template: '.[[1]] h2 { color: #FF9600; }\n.[[2]] h2 { color: #F0438A; }',
        blanks: [['beat-card'], ['featured']],
        distractors: ['important', 'sunrise', 'main'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which word, after a !, overrides normal rules? (one word)',
        answers: ['important', '!important'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'When is !important reasonable?',
        options: [
          { text: 'On every rule, to be safe', why: 'Then nothing can be changed.' },
          { text: 'Rarely, such as overriding styles you can\'t edit, like a third-party widget' },
          { text: 'Whenever a rule doesn\'t work', why: 'Find the cause first.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'Has your stylesheet started a war? Where?',
    starters: ['I made...', 'I\'ll flatten...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Search your style.css for !important and for #ids. Replace each with a flat class rule.',
  },
  notes: '!important declarations win over normal ones and can only be overridden by other important declarations (or higher origins). Low, even specificity is a widely used CSS architecture guideline.',
};

export default lesson;
