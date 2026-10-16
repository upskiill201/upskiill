import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 5 — Checkpoint. Reviews lessons 1–4 plus Chapters 1–3. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: one Saturday each',
  summary: 'Week 7, Monday. The new rota is on the wall: one Saturday each a month, built together. Clinic messages after 8 p.m. go to an on-call phone. Friday stand-up now ends with shout-outs. Halima gave her first one, to Bisi. Quick check.',
  minutes: 11,
  milestone: 'CHECKPOINT',
  outcomes: ['Use fairness, recognition and workload tools without notes', 'Connect them to Chapters 1 to 3'],
  learn: [
    {
      kind: 'story',
      title: 'Week 7, Monday, 9:10 a.m.',
      beats: [
        { speaker: 'halima', text: 'I have a shout-out. Bisi, for teaching me the Ogun trick. I used it twice.' },
        { speaker: 'bisi', text: '(clearly delighted, pretending not to be) Ah, stop. Okay, don\'t stop.' },
        { speaker: 'emmanuel', text: 'And I\'m on Saturday the 20th. First weekend shift of my life. Pray for me.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint: Week 7.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why does the new rota feel fair, even to Emmanuel on his Saturday?',
        options: [
          { text: 'He likes Saturdays', why: '"Pray for me." He doesn\'t.' },
          { text: 'The process was fair: built together, same rule for everyone' },
          { text: 'He was paid more', why: 'It\'s the process.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Put good recognition in order.',
        lines: ['Notice what they did', 'Say it specifically', 'Say it soon', 'Say it their way'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Which Chapter 4 tool is it?',
        groups: ['Fairness', 'Recognition', 'Workload'],
        items: [
          { text: 'One Saturday each a month', group: 0 },
          { text: 'Halima\'s shout-out to Bisi', group: 1 },
          { text: 'No messages after 8 p.m.', group: 2 },
          { text: 'Rota built together', group: 0 },
          { text: 'Emmanuel\'s Dr Bello fix, named', group: 1 },
          { text: 'Max 15 clinics a week', group: 2 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'bisi',
        message: 'Ah, stop. Okay, don\'t stop.',
        prompt: 'Miracle\'s best reply?',
        options: [
          { text: 'Okay, let\'s move on.', why: 'Let the moment land.' },
          { text: 'Don\'t let it go to your head.', why: 'A toxin dressed as a joke.' },
          { text: 'Never stopping. And Folake heard about your 19 clinics from me on Friday.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Fair isn\'t the same as ___. (one word)',
        answers: ['equal', 'Equal'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'What mainly causes burnout?',
        options: [
          { text: 'Too many demands and too few resources in the job' },
          { text: 'Not enough resilience', why: 'That\'s the myth.' },
          { text: 'Liking your job too much', why: 'Not the research view.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Miracle\'s weekly checklist. Which line breaks Chapter 4?',
        lines: [
          'Check who\'s carrying the most clinics.',
          'Friday: one "great job, everyone" to save time.',
          'Ask one person how they like to be thanked.',
        ],
        bug: 1,
        fix: 'Friday: name what each person did, then shout-outs.',
        explanation: 'Identical praise for different weeks is the unfairness this chapter started with.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the tool to what it means.',
        pairs: [
          ['Task significance', 'Seeing who you help'],
          ['Procedural fairness', 'A fair process'],
          ['Job resources', 'What protects people'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why let peers give shout-outs, not just Miracle?',
        options: [
          { text: 'Miracle is lazy', why: 'She still recognises everyone.' },
          { text: 'Recognition from colleagues matters, and it builds a culture, not a habit of one person' },
          { text: 'It\'s required', why: 'It\'s chosen because it works.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Chapter 4 so far.',
        template: 'Fair, not [[1]]. Specific, soon, their [[2]]. Fix the [[3]], not the coping.',
        blanks: [['equal'], ['way'], ['workload', 'job']],
        distractors: ['loud', 'person'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Halima\'s first shout-out.',
        tiles: ['Bisi,', 'for', 'the', 'Ogun', 'trick.'],
        distractors: ['nothing'],
      },
    ],
  },
  reflect: {
    prompt: 'Who in your team, class or family deserves a shout-out this week? What exactly would you thank them for?',
    starters: ['I\'d thank...', 'For...'],
  },
  deepen: {
    title: 'Start shout-outs',
    summary: 'End your next team meeting with two minutes where anyone can thank anyone for something specific. Go first to show how.',
  },
  notes: 'Checkpoint: reviews lessons 1–4 plus Chapters 1–3.',
};

export default lesson;
