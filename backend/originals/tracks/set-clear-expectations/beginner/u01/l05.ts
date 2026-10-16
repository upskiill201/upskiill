import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 5 — Checkpoint. Reviews lessons 1–4. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: the tune in his head',
  summary: 'Day 2, evening. Arjun writes his definition of done on a sticky note and puts it on his monitor. Then he sees the word "obvious" in four of his old messages. Quick check before he rewrites the brief.',
  minutes: 11,
  milestone: 'CHECKPOINT',
  outcomes: ['Use curse-of-knowledge and definition-of-done tools without notes', 'Spot a brief that only works in your head'],
  learn: [
    {
      kind: 'story',
      title: 'Day 2, 9:40 p.m.',
      beats: [
        { speaker: 'arjun', text: '"Obviously mobile first." "Obviously UPI." "Obviously Hindi." "Obviously my design system." I wrote "obviously" four times. I never wrote any of it to them.' },
        { speaker: 'narrator', text: 'The sticky note on his monitor says: "Done = cheap Android, EN + HI, sizes, real cart, under 3 s, reviewed."' },
        { speaker: 'arjun', text: 'Tomorrow, I rewrite the brief. And this time I ask them to say it back.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint: Day 2.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why did "obviously" appear four times in Arjun\'s messages?',
        options: [
          { text: 'It\'s his favourite word', why: 'Funny, but it\'s the blind spot.' },
          { text: 'The curse of knowledge: it was obvious to him, not to them' },
          { text: 'They should have known', why: 'Nobody told them.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Put beating the curse in order.',
        lines: ['Write the brief', 'Add an example', 'Ask them to explain it back', 'Fill the gaps'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Clear done, or vague done?',
        groups: ['Clear', 'Vague'],
        items: [
          { text: 'Under 3 seconds on 4G', group: 0 },
          { text: 'Fast enough', group: 1 },
          { text: 'English and Hindi', group: 0 },
          { text: 'Looks professional', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'joel',
        message: 'Sorry, quick question. Should the cart need a login?',
        prompt: 'Arjun\'s best reply?',
        options: [
          { text: 'Obviously not.', why: 'The word that caused all this.' },
          { text: 'Didn\'t you read my notes?', why: 'He read all 40 pages. It wasn\'t there clearly.' },
          { text: 'Great question, thank you for asking. No login: guest checkout with UPI. I should have said.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Overestimating how well others can read your mind: the illusion of ___. (one word)',
        answers: ['transparency', 'Transparency'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'In Newton\'s study, tappers expected 50% of songs to be guessed. What happened?',
        options: [
          { text: 'Listeners guessed about 2.5%' },
          { text: 'Listeners guessed 50%', why: 'Far fewer.' },
          { text: 'Listeners guessed every song', why: 'Nowhere near.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Arjun\'s plan for tomorrow. Which line forgets this chapter?',
        lines: [
          'Rewrite the brief with what, why and done.',
          'Send it, and assume silence means they\'re happy.',
          'Add a screenshot of the product page.',
        ],
        bug: 1,
        fix: 'Ask each of them to say it back on a five-minute call.',
        explanation: 'Silence usually means guessing.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the idea to what it means.',
        pairs: [
          ['Curse of knowledge', 'Can\'t un-know what you know'],
          ['Definition of done', 'A shared finish checklist'],
          ['Role ambiguity', 'Not sure what\'s expected'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What does Gallup\'s first workplace question ask?',
        options: [
          { text: 'Whether you like your boss', why: 'Different question.' },
          { text: 'Whether you know what\'s expected of you at work' },
          { text: 'Whether you\'re paid enough', why: 'Not that one.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Chapter 1 so far.',
        template: 'Write it [[1]]. Show an [[2]]. Ask them to say it [[3]].',
        blanks: [['down'], ['example'], ['back']],
        distractors: ['louder', 'never'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Arjun\'s promise.',
        tiles: ['No', 'more', '"obviously".'],
        distractors: ['always'],
      },
    ],
  },
  reflect: {
    prompt: 'Search your last few messages for "obviously", "just", or "as usual". What was hidden behind each one?',
    starters: ['I wrote...', 'What I meant was...'],
  },
  deepen: {
    title: 'Ban "obviously"',
    summary: 'For one week, every time you\'re about to write "obviously" in a brief, write the obvious thing out instead.',
  },
  notes: 'Checkpoint: reviews lessons 1–4.',
};

export default lesson;
