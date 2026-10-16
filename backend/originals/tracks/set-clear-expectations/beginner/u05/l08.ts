import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 8. Side by side: starting the next project, "same as before" vs a fresh agreement. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'Start the next one right',
  summary: 'Mr Rao wants loyalty points in January, with the same team. Arjun is tempted to send "Same as before, starting Jan 3!" But "same as before" includes everything that went wrong. Two ways to start the next project.',
  minutes: 11,
  outcomes: [
    'Start a new project with fresh, explicit expectations',
    'Carry the lessons forward, not the old gaps',
    'Ask people what they expect this time',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Day 1 of the next project',
      before: { label: '"Same as before"', text: 'Hi both! Loyalty points for Mr Rao. Same as before, starting Jan 3. Kavya: front end. Joel: back end. Let\'s go!' },
      after: { label: 'Fresh agreement', text: 'Loyalty points for Mr Rao, Jan 3 to Jan 31. Intent: Diwali buyers come back. Owners, done, the quality bar and the team page: attached, updated with our three retro changes. Pay: half on Jan 15, half on launch. References: yes, for both. Before we start: what do you each want from this one?' },
      notes: [
        '"Same as before" carries the old gaps forward.',
        'The fresh agreement carries the lessons forward.',
        'It asks what they want, because their unwritten deal may have changed too.',
      ],
    },
    {
      kind: 'text',
      html: "<p>A second project with the same people feels like it should need less setting up. Partly true: trust is higher, and you share a language. But expectations shift: Kavya might want to lead the front end now; Joel might want to learn design. And the old gaps are still there unless you write the fixes in. A short fresh agreement, built from the last retrospective, is how a team actually gets better, rather than just repeating itself.</p>",
    },
    {
      kind: 'check',
      question: 'Why ask "what do you each want from this one?" on a second project?',
      options: ['Their unwritten expectations may have changed', 'To be polite', 'To delay the start'],
      answer: 0,
      explanation: 'People grow. Their psychological contract grows with them.',
    },
  ],
  apply: {
    scenario: 'January, the next project.',
    items: [
      {
        kind: 'sortGroups',
        prompt: '"Same as before" or fresh agreement?',
        groups: ['Same as before', 'Fresh agreement'],
        items: [
          { text: '"Let\'s go!"', group: 0 },
          { text: 'Updated team page, with retro changes', group: 1 },
          { text: '"Kavya: front end. Joel: back end."', group: 0 },
          { text: '"What do you each want from this one?"', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What does "same as before" carry forward?',
        options: [
          { text: 'Only the good parts', why: 'It carries everything, unwritten.' },
          { text: 'Nothing', why: 'It carries the old habits.' },
          { text: 'The old gaps, along with the good parts' },
        ],
        answer: 2,
      },
      {
        kind: 'chatReply',
        from: 'kavya',
        message: 'Honestly? This time I\'d love to own the whole front end, including approving design.',
        prompt: 'Arjun\'s best reply?',
        options: [
          { text: 'I love that. Let\'s try it: you approve front-end design, I review before Mr Rao sees it. Updating the team page now.' },
          { text: 'Let\'s keep it like last time.', why: 'Her expectations have grown. Use it.' },
          { text: 'You\'re not ready.', why: 'The Golem effect, out loud.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'A fresh agreement carries the ___ forward, not the old gaps. (one word)',
        answers: ['lessons', 'Lessons', 'learning'],
        placeholder: 'One word',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the retro change to where it goes.',
        pairs: [
          ['Definition of done on Day 1', 'Every brief'],
          ['Flag problems within 15 minutes', 'The working agreement'],
          ['Requests through one person', 'The note to Mr Rao'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why write pay and references on Day 1 this time?',
        options: [
          { text: 'It\'s required by law', why: 'It\'s about avoiding surprises.' },
          { text: 'Last time, both were unwritten expectations that caused surprises' },
          { text: 'To impress them', why: 'It\'s to be clear.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Arjun\'s Day 1 message. Which line brings an old gap back?',
        lines: [
          'Intent: Diwali buyers come back.',
          'Done means... well, you know by now.',
          'Pay: half Jan 15, half on launch.',
        ],
        bug: 1,
        fix: 'Done: the updated checklist, attached.',
        explanation: '"You know by now" is the curse of knowledge, back for round two.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put starting the next project in order.',
        lines: ['Update the team page with retro changes', 'Write the brief: intent, owners, done', 'Write the unwritten deal: pay, references', 'Ask what they want this time'],
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'Not "same as [[1]]", but "better than [[2]]".',
        blanks: [['before'], ['before', 'last time']],
        distractors: ['ever', 'never'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Arjun\'s Day 1 question.',
        tiles: ['What', 'do', 'you', 'want', 'from', 'this', 'one?'],
        distractors: ['owe'],
      },
    ],
  },
  reflect: {
    prompt: 'Is there something you\'re about to do again with the same people (a project, an event, a term)? What should change in the agreement this time?',
    starters: ['We\'re doing ... again.', 'This time I\'d change...'],
  },
  deepen: {
    title: 'Better than before',
    summary: 'Before you repeat any project, reread your notes from last time and write three changes into the new brief. Ask everyone what they want this time.',
  },
  notes: 'Carrying retrospective actions into the next iteration (Derby & Larsen 2006); renegotiating psychological contracts as roles grow (Rousseau 1995). Fictional details.',
};

export default lesson;
