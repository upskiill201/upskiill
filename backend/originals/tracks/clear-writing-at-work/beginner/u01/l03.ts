import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 3. Step-by-step: cutting to what matters. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'Cut it down',
  summary: 'Zanele\'s 900 words need to become about 120. Mrs Achieng shows her five cuts that remove most of the words and none of the meaning.',
  minutes: 12,
  outcomes: [
    'Cut a message by most of its length',
    'Keep the point and lose the padding',
    'Know what to move into an attachment',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'Five cuts',
      steps: [
        { title: '1. Cut the warm-up', body: '"I hope this email finds you well. It has been a busy week." Delete. Start with the point.' },
        { title: '2. Cut the history', body: 'Two paragraphs on how the pilot started. Mr Kamau approved it; he knows. One phrase at most: "Saturday pilot, week 1:".' },
        { title: '3. Cut the method', body: 'How she cleaned the data. Interesting to her; move it to the attachment.' },
        { title: '4. Cut duplicate points', body: 'She said "the pilot is going well" three times in different words. Once is enough, with the number.' },
        { title: '5. Cut filler words', body: '"In order to" becomes "to". "At this point in time" becomes "now". "It is important to note that" disappears.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Cut the warm-up, the history, the method, the repeats and the filler. Keep the point; attach the detail.',
    },
  ],
  apply: {
    scenario: 'Five cuts.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the five cuts.',
        lines: ['Cut the warm-up', 'Cut the history', 'Cut the method', 'Cut duplicate points', 'Cut filler words'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the filler to the short version.',
        pairs: [
          ['"In order to"', '"To"'],
          ['"At this point in time"', '"Now"'],
          ['"Due to the fact that"', '"Because"'],
          ['"It is important to note that"', '(delete it)'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Keep in the email, or move to the attachment?',
        groups: ['Keep', 'Attach'],
        items: [
          { text: 'Week 1 late rate: 23%', group: 0 },
          { text: 'How she cleaned the data', group: 1 },
          { text: 'What she needs from him', group: 0 },
          { text: 'The full table of every route', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Zanele cuts 900 words to about 120. About how many words did she remove?',
        answers: ['780'],
        placeholder: 'A number',
      },
      {
        kind: 'chatReply',
        from: 'zanele',
        message: 'But the method is the best part. It took me days!',
        prompt: "Mrs Achieng's best reply?",
        options: [
          { text: 'Put it first.', why: 'He wants the result first.' },
          { text: 'Then attach it for anyone who wants it. Mr Kamau wants the result. Your work is why the result is true.' },
          { text: 'Delete it forever.', why: 'Attach it.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'Keep the [[1]]; [[2]] the detail.',
        blanks: [['point'], ['attach']],
        distractors: ['greeting', 'hide'],
      },
      {
        kind: 'mcq',
        prompt: 'Why cut the history of the pilot?',
        options: [
          { text: 'History is never useful', why: 'It\'s just not new to him.' },
          { text: 'To hide something', why: 'It\'s about relevance.' },
          { text: 'Mr Kamau approved it; he already knows' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Which line still needs cutting?',
        lines: [
          'Saturday pilot, week 1: late deliveries fell from 34% to 23%.',
          'At this point in time, it is important to note that this is early data.',
          'No action needed from you yet.',
          'Full numbers attached.',
        ],
        bug: 1,
        fix: 'This is early data.',
        explanation: 'Twelve words of filler for four of meaning.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many times did Zanele say "the pilot is going well" in different words?',
        answers: ['3', 'three'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Filler or meaning?',
        groups: ['Filler', 'Meaning'],
        items: [
          { text: '"I hope this finds you well"', group: 0 },
          { text: '"Late deliveries fell to 23%"', group: 1 },
          { text: '"As previously mentioned"', group: 0 },
          { text: '"Saturday crews cost KES 120,000 a month"', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Take a long message you wrote recently. Apply the five cuts. How many words did you remove?',
    starters: ['Before:... words', 'After:... words'],
  },
  deepen: {
    title: 'Cutting is kind',
    summary: 'Every word you cut is time you give back to your reader. Cutting is the most useful editing skill, and the one most people skip.',
  },
  notes: 'Cutting techniques: plain-language guidance (e.g. Plain English Campaign; Rogers & Lasky-Fink). Fictional: Saturday crews KES 120,000/month per depot.',
};

export default lesson;
