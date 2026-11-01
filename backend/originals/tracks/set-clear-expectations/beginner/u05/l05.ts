import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 5 — Checkpoint. Reviews lessons 1–4 plus Chapters 1–4. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: launch day',
  summary: 'Day 30, 2 p.m. 600 orders. Two sizes of red kurta have sold out. Not one failed payment. Joel flagged a slow page at 11:20 and it was fixed by 11:40. Quick check before the evening rush.',
  minutes: 11,
  milestone: 'CHECKPOINT',
  outcomes: ['Use diagnosis, conversation and recognition tools without notes', 'Connect them to Chapters 1 to 4'],
  learn: [
    {
      kind: 'story',
      title: 'Day 30, 2:00 p.m.',
      beats: [
        { speaker: 'joel', text: '11:20: "Stuck, looking: the search page is slow." 11:40: fixed. I didn\'t wait four hours this time.' },
        { speaker: 'kavya', text: 'And I didn\'t start a single thing that wasn\'t on the list. Even when Rohit asked. Well, he asked Arjun.' },
        { speaker: 'arjun', text: 'Six hundred orders. I\'ve fixed nothing today. You two have fixed everything.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint: launch day.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why did Joel flag the slow page in 20 minutes this time?',
        options: [
          { text: 'He was told off', why: 'He wasn\'t. That\'s why it worked.' },
          { text: 'They agreed a specific next time, and Arjun made flagging feel safe' },
          { text: 'Luck', why: 'It was the agreement.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Put the diagnosis questions in order.',
        lines: ['Was it clear?', 'Could they do it?', 'Could they do it here?', 'Was doing it punished?', 'Did it matter?'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Which Chapter 5 tool?',
        groups: ['Diagnosis', 'Conversation', 'Recognition'],
        items: [
          { text: '"Could they do it if their life depended on it?"', group: 0 },
          { text: 'Expectation, gap, impact, ask', group: 1 },
          { text: '"Every page passed the Android test."', group: 2 },
          { text: 'Can\'t, or won\'t?', group: 0 },
          { text: 'Agree a specific next time', group: 1 },
          { text: 'Tell the client by name', group: 2 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'joel',
        message: 'Stuck, looking: the search page is slow.',
        prompt: 'Arjun\'s best reply?',
        options: [
          { text: 'Why is it slow??', why: 'He just said he\'s looking.' },
          { text: 'Fix it quickly please.', why: 'Pressure, right after he did the brave thing.' },
          { text: 'Thank you for flagging it straight away. Want me on a call, or are you okay looking for 20 minutes?' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'The fix follows the ___. (one word)',
        answers: ['cause', 'Cause'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'What was the real cause of the Hindi email bug?',
        options: [
          { text: 'A missing setting, and speaking up felt risky' },
          { text: 'Joel didn\'t care', why: 'He cared a lot.' },
          { text: 'Joel couldn\'t code', why: 'He could. He lacked access.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Arjun\'s message to Mr Rao at 2 p.m. Which line breaks Chapter 5?',
        lines: [
          '600 orders, no failed payments.',
          'There was a Hindi email problem last night, Joel\'s fault, now fixed.',
          'Joel spotted and fixed a slow page in 20 minutes today.',
        ],
        bug: 1,
        fix: 'Two red kurta sizes sold out: restock?',
        explanation: 'Blaming Joel to the client, for a cause that wasn\'t his, undoes everything.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the tool to what it means.',
        pairs: [
          ['Definition of done', 'Finished means these boxes'],
          ['Psychological contract', 'The unwritten deal'],
          ['Can\'t vs won\'t', 'Diagnose before you fix'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why did Arjun "fix nothing" today?',
        options: [
          { text: 'He was lazy', why: 'He was watching, supporting and recognising.' },
          { text: 'Clear expectations meant the team could own and fix things themselves' },
          { text: 'Nothing broke', why: 'Things broke. Joel and Kavya fixed them.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Chapter 5 so far.',
        template: 'Diagnose, don\'t [[1]]. Have the [[2]] conversation. Make met as visible as [[3]].',
        blanks: [['blame', 'judge'], ['expectations'], ['missed']],
        distractors: ['angry', 'hidden'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Joel\'s flag.',
        tiles: ['Stuck,', 'looking.'],
        distractors: ['Fine.'],
      },
    ],
  },
  reflect: {
    prompt: 'When things go well in a group you lead or belong to, how much is because expectations were clear? What could you make clearer next time?',
    starters: ['It went well because...', 'Next time I\'d clarify...'],
  },
  deepen: {
    title: 'Two words',
    summary: 'Agree a two-word flag with someone you work with, like "stuck, looking". It makes speaking up easy when it matters most.',
  },
  notes: 'Checkpoint: reviews lessons 1–4 plus Chapters 1–4.',
};

export default lesson;
