import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 2 · Chapter 3 · Lesson 10 — Checkpoint 2. Reviews lessons 6–9. Story beat: Mrs Ewane's mock interview. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Checkpoint: Mrs Ewane\'s mock interview',
  summary: 'The careers office runs mock interviews for final-years, and Mrs Ewane takes Clinton\'s herself. She is much harder than David. Mistake stories, weaknesses, story banks and "Why us?".',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Answer a mistake question honestly', 'Give a real weakness with action', 'Answer "Why us?" with specifics'],
  learn: [
    {
      kind: 'story',
      title: 'The mock',
      beats: [
        { speaker: 'narrator', text: 'The careers office. Mrs Ewane, a clipboard, and no smile at all.' },
        { speaker: 'ewane', text: 'Mr Clinton. I am not Mr David. I will not laugh at your jokes. Tell me about a mistake.' },
        { speaker: 'narrator', text: 'Clinton tells the broken-sync story. Mrs Ewane writes something down. Then she asks another question, and another.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 2: Mrs Ewane\'s mock interview.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the mistake answer in order.',
        lines: ['The mistake, said plainly', 'Owning the fix', 'Telling someone fast', 'The contained result', 'The habit that changed'],
      },
      {
        kind: 'mcq',
        prompt: 'What does the weakness question test?',
        options: [
          { text: 'Whether you\'re perfect', why: 'Nobody is.' },
          { text: 'Self-awareness, and what you\'re doing about it' },
          { text: 'Your favourite trick answer', why: 'Tricks backfire.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best answer to Mrs Ewane.',
        from: 'ewane',
        message: 'Why do you want to work at Njangi Pay? And do not tell me they are "innovative".',
        options: [
          { text: 'They\'re a leading company with growth opportunities.', why: 'She warned you.' },
          { text: 'The salary.', why: 'Say what you\'d bring.' },
          { text: 'My mum\'s njangi ran on a notebook. Njangi Pay is solving that, and their offline mode is the problem I\'ve been solving at Kmer.' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Good weakness answer, or not?',
        groups: ['Good', 'Not good'],
        items: [
          { text: 'I say yes too often; I now plan priorities', group: 0 },
          { text: 'I\'m a perfectionist', group: 1 },
          { text: 'Nervous presenting, so I practise at the meet-up', group: 0 },
          { text: 'I have none', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that would lose marks.',
        lines: ['I told Mr Tamba within ten minutes.', 'It was mostly the phone\'s fault, not mine.', 'Now I test on all three phones first.'],
        bug: 1,
        explanation: 'Blame undoes the story. Own it.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each question to Clinton\'s story.',
        pairs: [
          ['A time you made a mistake', 'The broken sync'],
          ['A time you disagreed', 'The credit mix-up with Nadia'],
          ['A time you solved a hard problem', 'Offline confirmations'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'How many stories should a story bank have, roughly?',
        options: [
          { text: 'About six' },
          { text: 'One', why: 'Too few to cover the themes.' },
          { text: 'One hundred', why: 'Too many to practise.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Mrs Ewane\'s notes.',
        template: 'Mistake: [[1]] it. Weakness: [[2]] one. Why us: [[3]].',
        blanks: [['owned', 'own'], ['real'], ['specific']],
        distractors: ['hid', 'fake', 'generic'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'About how many seconds should a weakness answer take? (a number)',
        answers: ['30', 'thirty'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Specific or generic "Why us?"',
        groups: ['Specific', 'Generic'],
        items: [
          { text: 'Your offline mode', group: 0 },
          { text: 'You\'re innovative', group: 1 },
          { text: 'Savings groups on paper', group: 0 },
          { text: 'Great culture', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Mrs Ewane gives a question with no obvious story. What should Clinton do?',
        options: [
          { text: 'Make one up', why: 'Never invent. Use a real one.' },
          { text: 'Say "pass"', why: 'Pause and pick the closest real story.' },
          { text: 'Pause, pick the closest story from his bank, and tell it in STAR' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Which of the four question types (mistake, weakness, story bank, why us) are you least ready for?',
    starters: ['I\'m least ready for...', 'I\'ll practise by...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Book a mock interview with your careers office, or ask a strict friend to play Mrs Ewane.',
  },
  notes: 'Checkpoint 2. Reviews l06–l09.',
};

export default lesson;
