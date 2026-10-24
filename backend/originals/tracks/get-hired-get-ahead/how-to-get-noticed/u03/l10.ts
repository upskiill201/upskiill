import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 1 · Chapter 3 · Lesson 10 — Checkpoint 2. Reviews lessons 6–9. Story beat: David's medical CV. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Checkpoint: David\'s medical CV',
  summary: 'David is applying for a summer research placement at a hospital in Yaoundé. His CV has a skills wheel, an objective and duties everywhere. Clinton, now an expert (he thinks), offers to help. The top third, bullets, tailoring and layout, mixed together.',
  minutes: 13,
  milestone: 'CHECKPOINT',
  outcomes: ['Write a strong top third', 'Turn duties into formula bullets', 'Tailor honestly and keep the layout clean'],
  learn: [
    {
      kind: 'story',
      title: 'Return the favour',
      beats: [
        { speaker: 'narrator', text: 'Saturday. David sends his CV for a summer research placement at a hospital in Yaoundé. The deadline is Tuesday.' },
        { speaker: 'david', text: 'I used a template from the internet. It has a skills wheel! And a section called "Career Objective".' },
        { speaker: 'clinton', text: 'Oh no. Okay. I\'ve been where you are. Sit down. We have work to do.' },
        { speaker: 'tey', text: 'Teaching is the best test of learning. Let\'s help David, using everything from this week.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 2: fix David\'s CV.',
    items: [
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Pick David\'s new two-line profile.',
        options: [
          { text: '"Career Objective: to obtain a placement in a dynamic hospital."', why: 'An objective, and says nothing about David.' },
          { text: '"Third-year medical student. Organised a 60-donor blood drive and tutor two first-years in anatomy every week."' },
          { text: '"Passionate, caring and hardworking future doctor."', why: 'Adjectives, no proof.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Tap David\'s duty that should be an achievement.',
        lines: ['Organised a campus blood drive: 60 donors in one day.', 'Responsible for helping nurses in the ward.', 'Tutor two first-years in anatomy weekly; both passed their exams.'],
        bug: 1,
        fix: 'Ran the waiting-room sign-in at the clinic, cutting average waits by about 20 minutes.',
        explanation: '"Responsible for" is a duty. Say what changed.',
      },
      {
        kind: 'tapBuild',
        prompt: 'Build a formula bullet for David.',
        tiles: ['Organised', 'a', 'blood', 'drive', 'with', '60', 'donors', 'in', 'one', 'day'],
        distractors: ['helped', 'responsible'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Keep or replace in David\'s layout?',
        groups: ['Keep', 'Replace'],
        items: [
          { text: 'Plain headings', group: 0 },
          { text: 'The skills wheel', group: 1 },
          { text: 'One column of bullets', group: 0 },
          { text: 'Email inside an image banner', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'The placement advert asks for these. Match each to David\'s proof.',
        pairs: [
          ['Interest in research', 'Assisted a lecturer\'s survey of 200 students'],
          ['Working with patients', 'Clinic sign-in volunteering'],
          ['Teaching or explaining', 'Weekly anatomy tutoring'],
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'david',
        message: 'The advert says "lab experience". I\'ve only done university practicals. Should I write "lab experience"?',
        options: [
          { text: 'Write "extensive lab experience".', why: 'Overclaiming. An interviewer will ask.' },
          { text: 'Write exactly what it was: "lab practicals in biochemistry and physiology (year 1 to 3)". True and relevant.' },
          { text: 'Leave labs out completely.', why: 'Practicals are relevant. Name them honestly.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        prompt: 'What should go in David\'s top third?',
        options: [
          { text: 'A big photo and his objective', why: 'Photo norms vary, but an objective wastes the best space.' },
          { text: 'His hobbies', why: 'Hobbies rarely belong at the top.' },
          { text: 'His name big, one contact line, a link, and a two-line profile with proof' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the bullet formula.',
        template: 'Strong [[1]] + what you did + the [[2]].',
        blanks: [['verb'], ['result']],
        distractors: ['adjective', 'photo', 'hobby'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'David keeps one private CV with everything and copies from it. What\'s it called? (one word) CV',
        answers: ['master', 'main', 'base'],
        placeholder: 'One word',
      },
      {
        kind: 'findBug',
        prompt: 'Tap the tailoring line that crosses the line.',
        lines: ['Moved the clinic volunteering bullet to the top.', 'Used the advert\'s word "research" for the survey he helped with.', 'Added "published researcher" to match the advert.'],
        bug: 2,
        explanation: 'He hasn\'t published anything. Tailor what\'s true; never add.',
      },
      {
        kind: 'mcq',
        prompt: 'How can David check his new CV reads well for software?',
        options: [
          { text: 'Paste it into a plain text note and check the order still makes sense' },
          { text: 'Make the font bigger', why: 'Font size doesn\'t test how software reads it.' },
          { text: 'Add more columns', why: 'More columns make it harder to read.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'You just helped David. If you swapped CVs with a friend tomorrow, what would you check first on theirs?',
    starters: ['I\'d check...', 'Because...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Swap CVs (or profiles) with a friend. Give each other three fixes from this chapter: one for the top third, one bullet, one layout.',
  },
  notes: 'Checkpoint 2 of Chapter 3 reviews l06–l09. David (shared cast, medical student) appears in Ch1–2. The 200-student survey and clinic waits are story details. These exercises double as Jump ahead / placement questions.',
};

export default lesson;
