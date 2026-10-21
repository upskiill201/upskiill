import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 8 · Lesson 20 — Unit Challenge. The founders' pitch. */
const lesson: OriginalLesson = {
  key: 'l20',
  title: 'Unit Challenge: the founders\' pitch',
  summary: 'Two weeks, then five minutes in front of Seun and Amaka. From outline to the last question. Every Unit 8 skill, under pressure.',
  minutes: 15,
  milestone: 'UNIT_CHALLENGE',
  xp: 30,
  outcomes: ['Use every Unit 8 skill on one real presentation', 'Prove you can build, practise and deliver with AI\'s help'],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Unit 8\'s final challenge. The founders\' pitch: outline, slides, visuals, practice, questions.', replies: ['Let\'s go'] },
        { tey: 'The theme: AI drafts and challenges; Ada decides, rehearses and delivers. Go.' },
      ],
    },
  ],
  apply: {
    scenario: 'Day 1. Tobi books the meeting.',
    items: [
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Day 1. Which first request?',
        options: [
          { text: 'Make a pitch deck.', why: 'No audience, time or goal.' },
          { text: 'From this report, outline a 10-minute talk for our founders. Goal: approval for a second market. One line per slide, about 7 slides.' },
          { text: 'Make 25 slides.', why: 'Too many.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Day 2. Order the story.',
        lines: ['Situation', 'Problem', 'Answer', 'Ask'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Day 3. Title is the point, or a label?',
        groups: ['The point', 'Label'],
        items: [
          { text: '"Payments grew by half in four weeks"', group: 0 },
          { text: '"Results"', group: 1 },
          { text: '"It costs 300 GHS per shop"', group: 0 },
          { text: '"Costs"', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Day 4. Which slide breaks one-idea-per-slide?',
        lines: ['"Shops juggle three apps"', '"Fees confuse shops"', '"Growth, costs, risks and team"', '"Approve a second market"'],
        bug: 2,
        fix: 'Keep growth; move the rest to notes or backup.',
        explanation: 'Four ideas on one slide.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Day 5. Match the slide need to the visual.',
        pairs: [
          ['Weekly growth', 'Real chart'],
          ['Launch morning', 'Real photo, with permission'],
          ['Cover mood', 'AI illustration'],
          ['How a payment moves', 'Three boxes with arrows'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Day 6. Ada likes a photo from a news site for slide 2. What now?',
        options: [
          { text: 'Check the licence, or use a company or own photo instead' },
          { text: 'Use it with a credit', why: 'Credit isn\'t permission.' },
          { text: 'Use it; it\'s online', why: 'Online isn\'t free.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Day 7. Order the image prompt.',
        lines: ['Subject', 'Style', 'Mood and light', 'Composition', 'What to leave out'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Day 8. Build the voice instruction for speaker notes.',
        tiles: ['Use', 'short', 'words,', 'no', 'jargon'],
        distractors: ['leverage'],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Day 9. Which feedback request?',
        options: [
          { text: 'Is it good?', why: 'Praise.' },
          { text: 'Act as a busy founder. For each slide: is the title the point, what\'s confusing, what would you ask? Be direct. Name the weakest slide.' },
          { text: 'Tell me it\'s ready.', why: 'Not feedback.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Day 10. Tobi says the slot is now five minutes! Panic?',
        prompt: 'Best reply from Ada?',
        options: [
          { text: 'No panic: I\'ll keep the four-slide spine and move costs and the flowchart to backup slides.' },
          { text: 'I\'ll squeeze all 7 slides in, smaller.', why: 'Cramming.' },
          { text: 'I\'ll cancel.', why: 'Cut instead.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Day 11. Main deck or backup?',
        groups: ['Main', 'Backup'],
        items: [
          { text: 'Growth chart', group: 0 },
          { text: 'Cost breakdown', group: 1 },
          { text: 'The ask', group: 0 },
          { text: 'Failed-payment flowchart', group: 1 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Day 12. Complete Ada\'s rehearsal rule.',
        template: 'Rehearse out [[1]] with a timer. Memorise the first and [[2]] line.',
        blanks: [['loud'], ['last']],
        distractors: ['quietly', 'middle'],
      },
      {
        kind: 'findBug',
        prompt: 'Day 13. Which answer on Ada\'s question sheet is a problem?',
        lines: ['Cost: 300 GHS per shop (slide 9)', 'Bank late again: pause new shops', 'Will shops stay? Definitely, forever', 'Why not Kenya? Untested; Ghana had a partner'],
        bug: 2,
        fix: 'Too early to know; the week 8 review will tell us.',
        explanation: 'Overclaiming.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Meeting day. Ada\'s talk ran 4 minutes 50. Under 5 minutes? (yes or no)',
        answers: ['yes'],
        placeholder: 'Yes or no',
      },
      {
        kind: 'mcq',
        prompt: 'Seun asks: "What happens if the bank is late again?" Best answer?',
        options: [
          { text: 'We\'d run manual settlement at about 400 GHS a week and pause new shops until it\'s fixed. Backup slide 10 has the numbers.' },
          { text: 'It won\'t happen.', why: 'Overclaiming.' },
          { text: 'Um, good question, I\'m not sure.', why: 'She prepared this one.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'I heard the founders approved the second market! But Ada, urgent: the app had a bug this morning and our shops couldn\'t take payments for two hours. Carmen is furious. Call in an hour?',
        prompt: 'Best reply from Ada?',
        options: [
          { text: 'I\'m so sorry. Yes, I\'ll call in an hour with what happened, what we\'ve fixed and what we\'ll do for affected shops.' },
          { text: 'It wasn\'t my fault.', why: 'Next unit: handling this well.' },
          { text: 'Can it wait until next week?', why: 'An upset client needs a quick response.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the one idea behind all of Unit 8?',
        options: [
          { text: 'AI drafts, designs and challenges; you choose the story, check every visual and practise until you\'re ready' },
          { text: 'Let AI present for you', why: 'You present.' },
          { text: 'More slides impress more', why: 'Fewer, clearer slides.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'You finished Unit 8! What will you do differently for your next presentation?',
    starters: ['Differently:', 'First step:'],
  },
  deepen: { title: 'Coming next', summary: 'Unit 9: the angry client email. A launch bug, an upset client, and a call in an hour.' },
  notes: 'Review of the whole unit. Content fictional.',
};

export default lesson;
