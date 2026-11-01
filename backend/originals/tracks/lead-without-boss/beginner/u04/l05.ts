import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 5 — Checkpoint. Reviews lessons 1–4 plus Chapters 1–3. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: one Saturday',
  summary: 'Week 5, Wednesday. The Head of IT sighs, then says: "One change. One Saturday. Felix tests it. If anything breaks, you call me, not him." Felix and Remi walk out together, trying not to grin. Quick check.',
  minutes: 11,
  milestone: 'CHECKPOINT',
  outcomes: ['Use follow-up, escalation and voice tools without notes', 'Connect them to Chapters 1 to 3'],
  learn: [
    {
      kind: 'story',
      title: 'Week 5, Wednesday, 4:50 p.m.',
      beats: [
        { speaker: 'felix', text: 'He said yes. To a junior analyst. I\'ve been asking for exceptions for six years.' },
        { speaker: 'remi', text: 'He said yes to us. You were the one who knew it was only a setting and one field.' },
        { speaker: 'felix', text: '(pause) Okay. Saturday. Bring Zanele\'s snacks.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint: Week 5.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why did the joint escalation work?',
        options: [
          { text: 'Remi mentioned Kamau', why: 'He didn\'t need to.' },
          { text: 'Two teams, one small specific ask, no blame' },
          { text: 'The Head of IT likes Remi', why: 'They\'d never met.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Put a good escalation in order.',
        lines: ['Try at your level first', 'Tell the other person first', 'Bring the problem, options and one ask', 'Close the loop with everyone'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Helpful or harmful?',
        groups: ['Helpful', 'Harmful'],
        items: [
          { text: '"Is something in the way?"', group: 0 },
          { text: '"Just checking in AGAIN!!"', group: 1 },
          { text: '"Can I offer a concern?"', group: 0 },
          { text: '"IT is blocking us."', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'felix',
        message: 'He said yes. To a junior analyst.',
        prompt: 'Remi\'s best reply?',
        options: [
          { text: 'I\'m pretty persuasive.', why: 'Takes the credit.' },
          { text: 'Told you.', why: 'Not a team line.' },
          { text: 'He said yes to us. You knew it was only a setting and a field.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'A helpful follow-up asks what\'s in the ___. (one word)',
        answers: ['way', 'Way'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Why did Remi tell Felix before going to Brian?',
        options: [
          { text: 'No surprises, and Felix keeps his dignity' },
          { text: 'Felix is his boss', why: 'He isn\'t.' },
          { text: 'It\'s the law', why: 'It\'s respect, not law.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Remi\'s message to the team. Which line breaks Chapter 3 or 4?',
        lines: [
          'Exception granted: one change, this Saturday, tested by Felix.',
          'I managed to talk the Head of IT round.',
          'We\'re at 11 days. Saturday could make it 9.',
        ],
        bug: 1,
        fix: 'Felix and I asked together, and he said yes.',
        explanation: 'Credit, again. Say "we", then name names.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the tool to what it means.',
        pairs: [
          ['Currencies', 'What people value'],
          ['Pre-wiring', 'No surprises in the room'],
          ['Joint escalation', 'Go up together'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why did Remi offer a concern instead of staying quiet?',
        options: [
          { text: 'To show off', why: 'It was about the customer.' },
          { text: '10 days might not keep Mama Mboga, and the goal was five' },
          { text: 'He wasn\'t nervous', why: 'He was very nervous. He did it anyway.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Chapter 4 so far.',
        template: 'Follow up, don\'t [[1]]. Escalate the [[2]], not the person. Disagree with the [[3]].',
        blanks: [['nag'], ['problem'], ['idea']],
        distractors: ['wait', 'boss'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Remi\'s reply.',
        tiles: ['He', 'said', 'yes', 'to', 'us.'],
        distractors: ['me.'],
      },
    ],
  },
  reflect: {
    prompt: 'Which Chapter 4 skill is hardest for you: following up, escalating, or disagreeing upwards? Why?',
    starters: ['The hardest for me is...', 'Because...'],
  },
  deepen: {
    title: 'Say "us"',
    summary: 'When someone congratulates you on shared work this week, answer with "us" and one name. It costs nothing and builds a lot.',
  },
  notes: 'Checkpoint: reviews lessons 1–4 plus Chapters 1–3.',
};

export default lesson;
