import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 16 — Efua's notes vs Kofi's notes: myths about note-taking (handwriting, typing, neatness, length). */
const lesson: OriginalLesson = {
  key: 'l16',
  title: "Efua's notes vs Kofi's notes",
  summary: 'Handwritten or typed? Neat or messy? Long or short? Efua and Kofi argue it out, and most of the popular answers turn out to be myths.',
  minutes: 12,
  outcomes: [
    'Separate note-taking myths from what matters',
    'Choose paper or screen for good reasons',
    'Judge notes by what they make you do, not how they look',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'Handwritten notes are always better than typed notes.',
          isFact: false,
          explain: 'A famous 2014 study found an advantage for handwriting, but later studies found the difference was small or not reliable. What matters more is whether you process it in your own words or copy word for word. Typing makes copying easier, which is the real risk.',
        },
        {
          text: 'Copying word for word is a weaker way to take notes than writing in your own words.',
          isFact: true,
          explain: 'This is the part researchers agree on most. Processing, not transcribing, is what helps.',
        },
        {
          text: 'The neater your notes, the more you learn from them.',
          isFact: false,
          explain: 'Neatness can eat your time. Efua\'s notes are full of arrows and question marks. They work because of what she thinks while writing, not how pretty they are.',
        },
        {
          text: 'Longer notes mean you have learned more.',
          isFact: false,
          explain: "Kofi's 40 copied pages vs Efua's 12. Length often means copying. Short notes force decisions.",
        },
        {
          text: 'A laptop or phone in class can pull your attention away from the lesson.',
          isFact: true,
          explain: 'Notifications and other tabs compete with the teacher. If you type, close everything else.',
        },
      ],
    },
    {
      kind: 'text',
      html: '<p>So, Efua (paper) vs Kofi (Cornell notes, typed on his phone in the evening)? <strong>Both can work.</strong> The questions that matter:</p><ul><li>Am I writing <strong>my own words</strong>, or copying?</li><li>Do my notes have <strong>questions</strong> I can test myself with?</li><li>Can I <strong>find</strong> things in them?</li><li>If digital: are distractions <strong>closed</strong>?</li></ul><p>Pick the one you\'ll actually use, and judge your notes by what they make you <strong>do</strong>.</p>',
    },
    {
      kind: 'check',
      question: 'What matters more than paper vs screen?',
      options: ['Neatness', 'Writing in your own words instead of copying', 'Using colours'],
      answer: 1,
    },
  ],
  apply: {
    scenario: 'Efua and Kofi settle the argument.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Fact', 'Myth'],
        items: [
          { text: 'Own words beat copying word for word', group: 0 },
          { text: 'Handwriting always wins', group: 1 },
          { text: 'Neater notes teach you more', group: 1 },
          { text: 'Other tabs pull your attention away', group: 0 },
          { text: 'Longer notes mean more learning', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why might typed notes go wrong more often?',
        options: [
          { text: 'Typing fast makes it easy to copy word for word without thinking' },
          { text: 'Keyboards are bad for memory', why: 'It is how you use it, not the keyboard.' },
          { text: 'Typed notes are not allowed', why: 'Usually they are.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'efua',
        message: "Admit it, Kofi. Paper is better. Science says so.",
        prompt: 'What is the most accurate reply?',
        options: [
          { text: 'Science says own words beat copying. On paper vs typing, later studies found the difference was small. Your notes win because you process, not because of the pen.' },
          { text: 'Paper is always better, you are right.', why: 'The evidence is not that clear.' },
          { text: 'Typing is always better.', why: 'Also not supported.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the question to what it checks.',
        pairs: [
          ['Own words or copied?', 'Did I process it?'],
          ['Are there questions?', 'Can I test myself?'],
          ['Can I find things?', 'Is it organised?'],
          ['Distractions closed?', 'Am I paying attention?'],
        ],
      },
      {
        kind: 'findBug',
        prompt: "Which of Clinton's beliefs is the myth?",
        lines: ['I write my notes in my own words now.', 'My notes are 50 pages, so I must know a lot.', 'I close other apps when I type notes.'],
        bug: 1,
        fix: 'My notes are 50 pages, so I should check how much I actually remember.',
        explanation: 'Length is not learning. Test yourself on them.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Judge your notes by what they make you ..., not how they look. (one word)',
        answers: ['do'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Kofi wants honest feedback on his notes. Which request is best?',
        options: [
          { text: 'Are my notes beautiful?', why: 'Looks are not the point.' },
          { text: '[one page] Is this in my own words or copied-sounding? Does it have questions I can test myself with? What would make it more useful for revision?' },
          { text: 'Rewrite my notes to be neater.', why: 'Neat is not the goal, and it replaces his work.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the conclusion.',
        template: 'Both paper and screen can [[1]]. Pick the one you will actually [[2]].',
        blanks: [['work'], ['use']],
        distractors: ['fail', 'buy'],
      },
      {
        kind: 'tapBuild',
        prompt: "Build the lesson's main point.",
        tiles: ['Process,', "don't", 'transcribe'],
        distractors: ['always', 'copy'],
      },
      {
        kind: 'orderLines',
        prompt: 'Order the four questions from the lesson.',
        lines: ['Own words or copied?', 'Questions to test myself?', 'Can I find things?', 'Distractions closed?'],
      },
    ],
  },
  reflect: {
    prompt: 'Which myth did you believe? What will you change about how you take notes?',
    starters: ['I believed...', 'I will change...'],
  },
  deepen: {
    title: 'Ask the four questions',
    summary: 'Run the four questions on one page of your notes. Fix the weakest answer this week.',
  },
  notes: 'Mueller & Oppenheimer (2014), Psychological Science, "The pen is mightier than the keyboard"; Morehead, Dunlosky & Rawson (2019), Educational Psychology Review, direct replication found no reliable longhand advantage; Urry et al. (2021) similar. Verbatim transcription harms learning: consistent finding. Laptop multitasking distracts self and neighbours (Sana, Weston & Cepeda 2013).',
};

export default lesson;
