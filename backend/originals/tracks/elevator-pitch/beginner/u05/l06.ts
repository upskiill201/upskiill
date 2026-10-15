import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 6. Before/After: fading out vs a strong close. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'Fading out vs a strong close',
  summary: 'Speaker 6 finishes: "...so, yeah, um, I think that\'s everything? Thanks?" The applause is uncertain. Ada watches, and checks her own last ten seconds one final time.',
  minutes: 11,
  outcomes: [
    'Recognise a fading ending',
    'Finish with your ask, one strong line, and silence',
    'Make the end the part people repeat',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Two endings',
      before: {
        label: 'Fading out',
        text: '"...so, yeah, um, I think that\'s everything? Basically that\'s my app. Thanks? Sorry, I think I went a bit over."',
      },
      after: {
        label: 'Strong close',
        text: '"If you\'ve grown a product from one office to many, find me after the show. (pause) No more fights about who\'s paid." (stops, smiles, waits)',
      },
      notes: [
        'The ask comes just before the end, not after it.',
        'One closing line people can repeat.',
        'Then silence. The audience knows to clap because you\'ve clearly finished.',
      ],
    },
    {
      kind: 'text',
      html: "<p><strong>Why endings matter.</strong> People often remember the end of an experience particularly well. In a pitch, the last line is what's left in the room as the next speaker walks on. A fading ending (\"so yeah, that's it\") gives them nothing to keep.</p><p><strong>The strong close, in three parts:</strong></p><ol><li><strong>The ask</strong> (Chapter 5, lesson 2)</li><li><strong>One closing line</strong>: a rhyme, a callback to your hook, or your one sentence</li><li><strong>Silence.</strong> Stop, smile, wait. Don't fill it.</li></ol><p><strong>A callback ending</strong> connects to your opening: Ada opened with \"What could possibly go wrong?\" She could close with \"Now? Nothing goes wrong.\"</p>",
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Ask. One closing line. Then stop and smile. Never "so yeah, that\'s it".',
    },
  ],
  apply: {
    scenario: 'Speaker 6\'s ending.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What was wrong with Speaker 6\'s ending?',
        options: [
          { text: 'It faded out with fillers, apologies and no clear last line' },
          { text: 'It was too strong', why: 'The opposite.' },
          { text: 'It had a rhyme', why: 'It had "so yeah".' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Put a strong close in order.',
        lines: ['The ask', 'A pause', 'One closing line', 'Stop and smile'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Fading out, or strong close?',
        groups: ['Fading out', 'Strong close'],
        items: [
          { text: '"So yeah, that\'s basically it."', group: 0 },
          { text: '"No more fights about who\'s paid."', group: 1 },
          { text: '"Thanks? Sorry I went over."', group: 0 },
          { text: '(stops, smiles, waits)', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'After my last line, the silence will feel awful. Can I say "Thank you" at least?',
        prompt: 'What does Arjun say?',
        options: [
          { text: 'Fill the silence with more facts.', why: 'That buries your best line.' },
          { text: 'Never say thank you.', why: 'A short thank-you is fine.' },
          { text: 'A simple "Thank you" after a pause is fine. Just don\'t add "so yeah" or "sorry". Then stop.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'After your closing line: stop, smile and ___. (one word)',
        answers: ['wait', 'pause'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'What is a "callback" ending?',
        options: [
          { text: 'Asking judges to call you', why: 'Different kind of callback.' },
          { text: 'Repeating the whole pitch', why: 'Just a link to the start.' },
          { text: 'An ending that connects back to your opening hook' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Ada\'s final ten seconds. Which line should go?',
        lines: [
          'If you\'ve grown a product from one office to many, find me after the show.',
          'No more fights about who\'s paid.',
          'So, yeah, um, that\'s basically everything, I think.',
        ],
        bug: 2,
        fix: '(stop, smile, wait)',
        explanation: 'The rhyme is the ending. Anything after it fades it out.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the closing-line type to Ada\'s example.',
        pairs: [
          ['Rhyme', '"No more fights about who\'s paid."'],
          ['Callback', '"Now? Nothing goes wrong."'],
          ['One sentence', '"Savings groups, tracked, so nobody argues."'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Ada\'s close.',
        template: 'Find me after the [[1]]. (pause) No more [[2]] about who\'s [[3]].',
        blanks: [['show'], ['fights'], ['paid']],
        distractors: ['yeah', 'sorry'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Ada\'s callback ending.',
        tiles: ['Now?', 'Nothing', 'goes', 'wrong.'],
        distractors: ['yeah'],
      },
    ],
  },
  reflect: {
    prompt: 'Write your last ten seconds: your ask, a pause, one closing line. Say it out loud, then stay silent for three seconds.',
    starters: ['Ask: ...', 'Closing line: ...'],
  },
  deepen: {
    title: 'Practise the silence',
    summary: 'Rehearse your closing line and then hold three seconds of silence with a smile. It feels strange at first. It\'s what makes an audience clap.',
  },
  notes: 'Endings weigh heavily in memory (cf. peak-end research, Kahneman et al.); stated as "often". Strong-close advice (ask, final line, silence) is standard pitch coaching.',
};

export default lesson;
