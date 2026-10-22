import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 1 · Chapter 3 · Lesson 3 — duties vs achievements. Before / After. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'Duties vs. achievements',
  summary: 'Clinton\'s meet-up entry says "Responsible for organising events and managing communications." It\'s accurate, and completely forgettable. Miracle shows him the difference between what your job was and what you made happen.',
  minutes: 11,
  outcomes: ['Tell a duty from an achievement', 'Rewrite duties as achievements', 'Keep every achievement true and checkable'],
  learn: [
    {
      kind: 'compare',
      title: 'What you were meant to do vs. what you did',
      before: { label: 'Duties', text: 'Organiser, CS Tech Meet-up\n- Responsible for organising events\n- Managing communications\n- Liaising with speakers\n\nThis is a job description. Any organiser of any club could write it, including a bad one. It says what the role was, not what Clinton did with it.' },
      after: { label: 'Achievements', text: 'Organiser, CS Tech Meet-up\n- Grew weekly attendance from 6 to 40 members in one year\n- Booked 10 local developers as speakers, including two from Douala start-ups\n- Secured a snack sponsor after the first sponsor pulled out\n\nEach line says what changed because Clinton was there. Same role, and now you can see a person who gets results.' },
      notes: [
        'Duty: what anyone in the role is supposed to do. Achievement: what changed because of you.',
        'Test each bullet: could a bad organiser have written the same line? If yes, it\'s a duty.',
        'Use your evidence bank (Chapter 1): it\'s full of achievements, with dates and numbers.',
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Not "responsible for". Say what changed because you were there.',
    },
  ],
  apply: {
    scenario: 'Clinton rewrites his meet-up entry.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Duty or achievement?',
        groups: ['Duty', 'Achievement'],
        items: [
          { text: 'Responsible for organising events', group: 0 },
          { text: 'Grew attendance from 6 to 40 members', group: 1 },
          { text: 'Managing communications', group: 0 },
          { text: 'Secured a sponsor after the first pulled out', group: 1 },
          { text: 'Liaising with speakers', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the test for whether a bullet is just a duty?',
        options: [
          { text: 'Is it longer than ten words?', why: 'Length doesn\'t matter. What changed does.' },
          { text: 'Could a bad organiser have written the same line?' },
          { text: 'Does it use the word "I"?', why: 'CV bullets usually drop "I". The test is whether anything changed.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the bullet that\'s still a duty.',
        lines: ['Grew weekly attendance from 6 to 40.', 'Responsible for social media posts.', 'Booked 10 local developers as speakers.'],
        bug: 1,
        fix: 'Grew the meet-up\'s page from 50 to 400 followers with weekly speaker posts.',
        explanation: '"Responsible for" says what the job was, not what happened.',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'david',
        message: 'My hospital volunteering bullet says "Assisted nurses with patient care." Achievement?',
        options: [
          { text: 'Perfect as it is.', why: 'Every volunteer could write it. Say what changed.' },
          { text: 'Write "Saved lives".', why: 'Too big and not checkable. Keep it specific and true.' },
          { text: 'That\'s a duty. What changed? Maybe: "Ran the waiting-room sign-in, cutting average waits by 20 minutes."' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each duty to an achievement.',
        pairs: [
          ['Managing the group chat', 'Cut daily messages from 200 to one clear update'],
          ['Helping at the phone stall', 'Diagnosed and quoted 15 repairs each Saturday'],
          ['Organising football fixtures', 'Ended double-booked pitches with a shared sheet'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which bullet is an achievement Clinton could defend in an interview?',
        options: [
          { text: '"Revolutionised campus tech culture."', why: 'Huge claim, impossible to check.' },
          { text: '"Booked 10 local developers as speakers, including two from Douala start-ups."' },
          { text: '"Responsible for speakers."', why: 'A duty, not an achievement.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the rule.',
        template: 'Not "responsible [[1]]". Say what [[2]] because you were there.',
        blanks: [['for'], ['changed']],
        distractors: ['with', 'stayed', 'cost'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Where should Clinton look for his achievements? His evidence ___. (one word)',
        answers: ['bank'],
        placeholder: 'One word',
      },
      {
        kind: 'sortGroups',
        prompt: 'Duty or achievement, for a shop assistant?',
        groups: ['Duty', 'Achievement'],
        items: [
          { text: 'Served customers', group: 0 },
          { text: 'Reorganised the stockroom so restocking took half the time', group: 1 },
          { text: 'Handled the till', group: 0 },
          { text: 'Trained two new assistants in their first week', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why is an achievement more convincing than a duty?',
        options: [
          { text: 'It shows what you did with the role, not just that you had it' },
          { text: 'It uses bigger words', why: 'The words can be simple. It\'s the change that convinces.' },
          { text: 'Recruiters don\'t know what duties are', why: 'They do, and they see the same duties all day.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Take one role you\'ve had (a job, a club, a family task). Write one duty line, then rewrite it as an achievement.',
    starters: ['Duty: ...', 'Achievement: ...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Go through your evidence bank and mark every entry that could become a CV achievement. You\'ll need four to six for your CV.',
  },
  notes: 'Duties vs achievements ("accomplishment statements") is standard CV advice (university careers services, NACE resume guidance). Links to Ch1 l14 (evidence bank).',
};

export default lesson;
