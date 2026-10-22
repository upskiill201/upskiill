import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 1 · Chapter 4 · Lesson 5 — Checkpoint 1. Reviews lessons 1–4. Story beat: Mrs Ewane's quiz. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: Mrs Ewane\'s quiz',
  summary: 'Mrs Ewane has a new rule this term: no cover letter leaves her office until the student passes her five-question quiz. Clinton sits down. Openings, purpose, specifics and structure, mixed together.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Write a strong opening line', 'Explain why them and why you', 'Use the four-paragraph shape and the swap-the-name test'],
  learn: [
    {
      kind: 'story',
      title: 'No letter leaves',
      beats: [
        { speaker: 'narrator', text: 'Wednesday. A new sign on the careers office door: "No cover letter leaves this office until you pass the quiz."' },
        { speaker: 'ewane', text: 'Last year a student sent a letter that began "I am writing to apply" and ended "Yours faithfully, [Name]". He forgot to type his name. Sit. Five questions.' },
        { speaker: 'clinton', text: 'I would never forget my own name.' },
        { speaker: 'ewane', text: 'That is what he said.' },
        { speaker: 'tey', text: 'Let\'s pass Mrs Ewane\'s quiz.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 1: the cover letter quiz.',
    items: [
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Question 1: pick the strongest opening.',
        options: [
          { text: '"I am writing to apply for the advertised position."', why: 'The most-read line, wasted.' },
          { text: '"My mum\'s savings group argued every month about who had paid, until I built them a tracker."' },
          { text: '"To whom it may concern."', why: 'Formal, empty, and nobody\'s name.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        prompt: 'Question 2: what two questions does a cover letter answer?',
        options: [
          { text: 'How old you are, and where you live', why: 'Not those. Why them and why you.' },
          { text: 'Why them, and why you' },
          { text: 'What you earn, and what you want to earn', why: 'Too early for money.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Question 3: tap the sentence that fails the swap-the-name test.',
        lines: ['Njangi Pay turns njangi exercise books into a trusted app.', 'I admire your commitment to excellence and innovation.', 'Your reminders feature is what my mum\'s group needed.'],
        bug: 1,
        explanation: 'Works for any company on earth. Say something only true of Njangi Pay.',
      },
      {
        kind: 'orderLines',
        prompt: 'Question 4: put the four paragraphs in order.',
        lines: ['The hook', 'Why them', 'Why you', 'The close'],
      },
      {
        kind: 'mcq',
        prompt: 'Question 5: how long should a cover letter be?',
        options: [
          { text: 'At least two pages', why: 'Too long for busy readers.' },
          { text: 'One line', why: 'Too short to build the bridge.' },
          { text: 'Around 250 to 400 words, under one page' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Bonus: belongs in the letter, or not?',
        groups: ['Belongs', 'Doesn\'t'],
        items: [
          { text: 'One real detail about the company', group: 0 },
          { text: 'Your whole CV in sentences', group: 1 },
          { text: 'Two proofs matching their must-haves', group: 0 },
          { text: '"Please find my CV attached" as the opening', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'ewane',
        message: 'The form says "optional". Why write one at all?',
        options: [
          { text: 'It\'s my chance to say why them and why me, in my own voice. People who bother stand out.' },
          { text: 'You told me to.', why: 'She wants the real reason.' },
          { text: 'I won\'t, actually.', why: 'Then he loses his best chance to stand out.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each document to its job.',
        pairs: [
          ['CV', 'A list of proof'],
          ['Cover letter', 'The bridge to one job'],
          ['Portfolio', 'Proof to look at'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Mrs Ewane\'s rule.',
        template: 'If you can [[1]] the company name and nothing breaks, [[2]] it.',
        blanks: [['swap', 'change'], ['rewrite']],
        distractors: ['send', 'keep', 'print'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What did last year\'s student forget to type at the end of his letter? His ___. (one word)',
        answers: ['name'],
        placeholder: 'One word',
      },
      {
        kind: 'sortGroups',
        prompt: 'Why them, or why you?',
        groups: ['Why them', 'Why you'],
        items: [
          { text: 'They serve 200,000 savings groups', group: 0 },
          { text: 'I explain repairs to customers every Saturday', group: 1 },
          { text: 'They just launched reminders', group: 0 },
          { text: 'I grew a meet-up from 6 to 40', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Which of Mrs Ewane\'s five questions would you have got wrong a week ago?',
    starters: ['A week ago I\'d have said...', 'Now I know...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Write the four-box outline of a cover letter for a role you want. Run the swap-the-name test on every sentence.',
  },
  notes: 'Checkpoint 1 of Chapter 4 = reviews l01–l04. These exercises double as Jump ahead / placement questions.',
};

export default lesson;
