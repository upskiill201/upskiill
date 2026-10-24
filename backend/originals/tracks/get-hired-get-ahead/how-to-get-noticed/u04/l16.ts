import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 1 · Chapter 4 · Lesson 16 — cover letter myths. Myth or Fact. */
const lesson: OriginalLesson = {
  key: 'l16',
  title: 'Cover letter myths',
  summary: '"Nobody reads cover letters." "It should repeat your CV." "Always start with To whom it may concern." The group chat is confident. Myth or fact?',
  minutes: 11,
  outcomes: ['Spot common cover letter myths', 'Explain what actually helps', 'Decide when a letter is worth writing'],
  learn: [
    {
      kind: 'myth',
      statements: [
        { text: 'Nobody reads cover letters any more.', isFact: false, explain: 'Some employers skim or skip them; others read every one, especially when they ask for them or when two CVs look alike. You rarely know which, so a short, specific letter is a safe bet.' },
        { text: 'A cover letter should repeat what\'s on your CV.', isFact: false, explain: 'They already have the CV. The letter says what the CV can\'t: why them, why you, in your voice.' },
        { text: '"To whom it may concern" is the most professional greeting.', isFact: false, explain: 'It sounds distant and old. Use a name if you can find one, or "Dear [Company] team".' },
        { text: 'A short, specific letter usually beats a long, general one.', isFact: true, explain: 'Busy readers skim. Around 250 to 400 words, about one company, with two proofs, is easier to read and remember.' },
        { text: 'You can use the same letter for every job if you change the company name.', isFact: false, explain: 'That\'s the swap-the-name test failing. Reuse proofs, but always write "why them" fresh.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'When a myth sounds convenient ("nobody reads them, so skip it"), ask who benefits from believing it. Usually, nobody you\'d want to work for.',
    },
  ],
  apply: {
    scenario: 'Clinton answers the group chat.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Fact', 'Myth'],
        items: [
          { text: 'Short and specific usually beats long and general', group: 0 },
          { text: 'Nobody reads cover letters', group: 1 },
          { text: 'Repeat your whole CV in the letter', group: 1 },
          { text: '"Why them" should be written fresh each time', group: 0 },
          { text: '"To whom it may concern" is best', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'Someone says "nobody reads cover letters". Should I stop writing them?',
        options: [
          { text: 'Yes, stop.', why: 'You\'d miss the employers who do read them.' },
          { text: 'Some don\'t, some do. Njangi Pay literally said "we read them". A short specific one is worth it.' },
          { text: 'Write one, but make it five pages.', why: 'Short and specific.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        prompt: 'What should the letter do instead of repeating the CV?',
        options: [
          { text: 'List your grades', why: 'That\'s CV territory.' },
          { text: 'Describe your hobbies', why: 'Not the letter\'s job.' },
          { text: 'Explain why them and why you, in your own voice' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the myth.',
        lines: ['Use a name in the greeting if you can find one.', 'Change the company name and reuse the whole letter.', 'Keep it to about one page.'],
        bug: 1,
        explanation: 'That fails the swap-the-name test. Reuse proofs, never "why them".',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each myth to the truth.',
        pairs: [
          ['Nobody reads them', 'Some do, often the ones who ask'],
          ['Repeat your CV', 'Say what the CV can\'t'],
          ['To whom it may concern', 'Use a name or "Dear [Company] team"'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'When is a cover letter MOST likely to matter?',
        options: [
          { text: 'When they ask for one, or two CVs look similar' },
          { text: 'Never', why: 'That\'s the myth.' },
          { text: 'Only for senior roles', why: 'Graduates often benefit most: the letter explains proof from clubs and projects.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Tey\'s tip.',
        template: 'When a myth sounds [[1]], ask who [[2]] from believing it.',
        blanks: [['convenient', 'easy'], ['benefits']],
        distractors: ['scary', 'loses', 'reads'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which test does reusing a whole letter with a new name fail? The swap-the-___ test. (one word)',
        answers: ['name'],
        placeholder: 'One word',
      },
      {
        kind: 'sortGroups',
        prompt: 'Helps or hurts?',
        groups: ['Helps', 'Hurts'],
        items: [
          { text: 'One real detail about the company', group: 0 },
          { text: 'A greeting to "Sir"', group: 1 },
          { text: 'Two proofs matching their must-haves', group: 0 },
          { text: 'Three pages of everything', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'david',
        message: 'My uncle says letters should be formal and start "I wish to apply". Is he wrong?',
        options: [
          { text: 'He\'s right, always start like that.', why: 'It\'s the most-read line. Use it.' },
          { text: 'Start with a joke.', why: 'Risky. A real story is safer and stronger.' },
          { text: 'Polite is good, but the first line should say something only you could say. "I wish to apply" wastes it.' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Which myth did you believe before this chapter? What changed your mind?',
    starters: ['I believed...', 'What changed my mind was...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Look at three job adverts you like. Do they ask for a cover letter, say it\'s optional, or not mention it? Plan your letter accordingly.',
  },
  notes: 'Employer practice on reading cover letters varies; no single statistic is claimed (published surveys conflict and are often vendor-run).',
};

export default lesson;
