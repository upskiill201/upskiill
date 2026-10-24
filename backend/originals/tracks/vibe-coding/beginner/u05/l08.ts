import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 8. Before / After: building in layers. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'Build it in layers',
  summary: 'Hazel\'s first real-app brief asked for gigs, sign-ups, login and pledges in one go. It half-worked and she couldn\'t tell which half. Her second try: four layers, each working before the next.',
  minutes: 12,
  outcomes: [
    'Split an app into layers that each work alone',
    'Order the layers so each builds on a working one',
    'Test and commit each layer',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'All at once vs in layers',
      before: { label: 'All at once', text: 'Build the band app: gigs, sign-ups, email login, pledges, and an admin page for Ruth.' },
      after: {
        label: 'Layers',
        text: 'Layer 1: show the gigs from the database (read only).\nLayer 2: a sign-up button that saves to the database.\nLayer 3: email-link login; only logged-in people can sign up.\nLayer 4: move pledges into the database.\nAfter each layer: test it, commit it, then start the next.',
      },
      notes: [
        'Each layer works on its own, so when something breaks, it\'s in the newest layer.',
        'The order matters: you can\'t test sign-ups until gigs show, and you can\'t restrict sign-ups until login exists.',
        'Each layer is a commit you can go back to. Layer 3 breaks? Layers 1 and 2 are safe.',
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'It\'s Chapter 2\'s "one step at a time" scaled up: steps make a layer, layers make an app.',
    },
  ],
  apply: {
    scenario: 'Hazel\'s second try.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the band app\'s layers in order.',
        lines: [
          'Show the gigs from the database',
          'Save sign-ups to the database',
          'Add email-link login',
          'Only logged-in people can sign up',
          'Move pledges into the database',
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why can\'t "only logged-in people can sign up" come first?',
        options: [
          { text: 'There\'s no login and no sign-up yet to restrict' },
          { text: 'It\'s too easy', why: 'It\'s about what exists to build on.' },
          { text: 'It can, order doesn\'t matter', why: 'Each layer needs the one below it.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'A good layer (works alone), or not a layer?',
        groups: ['Good layer', 'Not a layer'],
        items: [
          { text: 'Show the gigs, read only', group: 0 },
          { text: 'Half of the login form', group: 1 },
          { text: 'Save a sign-up when the button is tapped', group: 0 },
          { text: '"Everything else"', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'ruth',
        message: 'Layer 3 broke the sign-ups. What do you do?',
        prompt: 'Hazel\'s answer?',
        options: [
          { text: 'Start the whole app again.', why: 'Layers 1 and 2 were committed and working.' },
          { text: 'Ignore it and do layer 4.', why: 'Never build on a broken layer.' },
          { text: 'The problem is in layer 3. I can revert to layer 2\'s commit, or fix layer 3 before going on.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'After each layer.',
        template: 'Test it, [[1]] it, then start the [[2]] one.',
        blanks: [['commit'], ['next']],
        distractors: ['delete', 'biggest'],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which request starts layer 1 well?',
        options: [
          { text: 'Build the whole band app', why: 'That\'s all layers at once.' },
          { text: 'Show the gigs from the Supabase gigs table as a list: title, date, place. Read only. No sign-ups or login yet.' },
          { text: 'Show gigs and also add login quickly', why: 'Two layers in one.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Layer 3 breaks. Which earlier layer\'s commit is the last known good one? (Number only.)',
        answers: ['2', 'two'],
        placeholder: 'Number',
      },
      {
        kind: 'findBug',
        prompt: 'Which layer plan has a problem?',
        lines: [
          'Layer 1: show gigs',
          'Layer 2: save sign-ups',
          'Layer 3: login, pledges, admin page and emails',
          'Layer 4: move pledges in',
        ],
        bug: 2,
        fix: 'Split it: login is one layer; the others come later, one each.',
        explanation: 'Four features in one layer is "all at once" hiding inside a plan.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the layer to its check.',
        pairs: [
          ['Show gigs', 'Gigs from the database appear'],
          ['Save sign-ups', 'A sign-up shows on another device'],
          ['Login rule', 'Logged out can\'t sign up'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Review from Chapter 4: layer 4 is an experiment Hazel isn\'t sure about. Where should she build it?',
        options: [
          { text: 'On main, carefully', why: 'Experiments go on branches.' },
          { text: 'On a new branch, merged only if it works' },
          { text: 'In a new folder', why: 'A branch does this better.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'Write your own app as 3 or 4 layers. What does each one let you test?',
    starters: ['Layer 1:', 'Layer 2:', 'Layer 3:'],
  },
  deepen: {
    title: 'On your computer: layer by layer',
    summary: 'Write your layers into brief.md. Build layer 1 only, test it, commit. Then layer 2. Keep going. Push after each layer.',
  },
  notes: 'Incremental, vertically sliced delivery.',
};

export default lesson;
