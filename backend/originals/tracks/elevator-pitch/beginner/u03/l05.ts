import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 5 — Checkpoint. Reviews lessons 1–4 plus Chapters 1–2. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: Tunde\'s verdict',
  summary: 'Ada asks Tunde if she can use the "swore he\'d paid" story on stage. He reads the Pixar version, laughs so loudly the whole office turns round, and says: "Use it. But tell them I\'ve paid on time ever since."',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Use Pink\'s pitch types, the Pixar story and rhymes without notes', 'Connect stickiness to Chapters 1 and 2'],
  learn: [
    {
      kind: 'story',
      title: 'The office, Thursday',
      beats: [
        { speaker: 'narrator', text: 'Tunde reads the Pixar pitch. "One day, Tunde swore he\'d paid in March..." He laughs so hard the whole office looks up.' },
        { speaker: 'narrator', text: 'Tunde: "Use it! But add a line: \'And Tunde has paid on time every month since.\' I have a reputation."' },
        { speaker: 'ada', text: 'Deal. That\'s actually a perfect "until finally".' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint: week three.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What\'s the difference between a correct pitch and a memorable one?',
        options: [
          { text: 'A memorable one is longer', why: 'Length doesn\'t make things stick.' },
          { text: 'There\'s no difference', why: 'Arjun zoned out of a correct one.' },
          { text: 'A memorable one has something vivid to hold on to: a story, a hook, a detail' },
        ],
        answer: 2,
      },
      {
        kind: 'orderLines',
        prompt: 'Put the Pixar pattern in order.',
        lines: ['Once upon a time', 'Every day', 'One day', 'Because of that', 'Until finally'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the Pink pitch type.',
        pairs: [
          ['"Peace."', 'One-word'],
          ['"Ever had someone swear they\'d paid?"', 'Question'],
          ['"Ending the ajo argument, for good"', 'Subject line'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'Quiz: why might a rhyme make my closing line feel more true?',
        prompt: 'Your answer?',
        options: [
          { text: 'Rhymes are easier to process, and easy can feel true: the rhyme-as-reason effect.' },
          { text: 'Rhymes are always true.', why: 'They only feel truer.' },
          { text: 'Judges are poets.', why: 'Probably not all of them.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Use a question pitch when your argument is ___. (one word)',
        answers: ['strong', 'good'],
        placeholder: 'One word',
      },
      {
        kind: 'sortGroups',
        prompt: 'Sticky, or forgettable?',
        groups: ['Sticky', 'Forgettable'],
        items: [
          { text: 'Tunde swore he\'d paid in March', group: 0 },
          { text: 'The app has a payment log', group: 1 },
          { text: 'The office split into two teams', group: 0 },
          { text: 'It is a solution for groups', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Ada\'s new pitch. Which line slips back into Chapter 1 mistakes?',
        lines: [
          'One day, Tunde swore he\'d paid in March.',
          'So I learned Python and built an app that records every payment.',
          'It uses a members table and a payments table with foreign keys.',
        ],
        bug: 2,
        fix: 'And Tunde has paid on time every month since.',
        explanation: 'Database details are still the lift mistake, even inside a good story.',
      },
      {
        kind: 'mcq',
        prompt: 'Tunde asks to add "and Tunde has paid on time ever since". Why is it a great "until finally"?',
        options: [
          { text: 'It makes the pitch longer', why: 'It\'s short.' },
          { text: 'It closes the story with a funny, human proof that the app works' },
          { text: 'It mentions Python', why: 'It doesn\'t.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        prompt: 'Which Chapter 2 tool also uses a question?',
        options: [
          { text: 'Handing the conversation back: "What about you?"' },
          { text: 'Dropping the "just"', why: 'That\'s about shrinkers.' },
          { text: 'The headline', why: 'Not a question.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Chapter 3 so far.',
        template: 'Correct is the [[1]]. Add a [[2]], a hook, or one good [[3]].',
        blanks: [['minimum'], ['story'], ['rhyme', 'question']],
        distractors: ['database', 'feature'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Tunde\'s line.',
        tiles: ['Tunde', 'has', 'paid', 'on', 'time', 'ever', 'since.'],
        distractors: ['never'],
      },
    ],
  },
  reflect: {
    prompt: 'Look at your pitch so far. What\'s the ONE vivid thing someone would remember a day later? If there isn\'t one, what could it be?',
    starters: ['The sticky part is...', 'If there isn\'t one, I could add...'],
  },
  deepen: {
    title: 'Ask permission',
    summary: 'If your pitch includes a real person (a customer, a colleague, a family member), ask them first, like Ada asked Tunde. It\'s respectful, and they often give you a better line.',
  },
  notes: 'Checkpoint: reviews lessons 1–4 plus Chapters 1–2.',
};

export default lesson;
