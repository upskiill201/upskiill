import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 8. Reading: why companies use structured interviews. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'Why interviews have a structure',
  summary: 'Remi wonders why every interviewer seems to ask the same kind of questions. Ada sends him the research: structured interviews are among the best ways employers have to predict job performance.',
  minutes: 12,
  outcomes: [
    'Know what a structured interview is',
    'Understand why employers use them',
    'Prepare for the way you\'ll be scored',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'Planned questions, planned scores',
      html: '<p>A <strong>structured interview</strong> asks every candidate the same planned questions, and scores the answers against the same criteria, often on a rating scale.</p><p>For decades, research has looked at how well different hiring methods predict how people will perform in the job. In a famous 1998 review, Frank Schmidt and John Hunter found structured interviews were among the strongest predictors. In 2022, Paul Sackett and colleagues re-ran the numbers with better corrections, and <strong>structured interviews came out at the top of the list</strong>, ahead of ability tests.</p><p>What this means for Remi:</p><ul><li><strong>Questions are often planned in advance</strong> and linked to skills in the job ad.</li><li><strong>Answers are often scored</strong>, for example 1 to 5, against what a strong answer includes: a real example, your own actions, a result.</li><li><strong>Rambling costs points.</strong> If your answer doesn\'t show the evidence, the interviewer can\'t score it.</li></ul><p>Not every interview is fully structured. But preparing as if it is, with real examples, clear actions and results, helps in all of them.</p>',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Structured interviews ask planned questions and score answers. Give the evidence they can score: example, your actions, result.',
    },
  ],
  apply: {
    scenario: 'Structured interviews.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What is a structured interview?',
        options: [
          { text: 'Same planned questions for everyone, scored against the same criteria' },
          { text: 'A chat with no plan', why: 'That\'s unstructured.' },
          { text: 'A written test', why: 'It\'s an interview with a plan.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'In which year did Sackett and colleagues publish their updated review?',
        answers: ['2022', '2021'],
        placeholder: 'A year',
      },
      {
        kind: 'sortGroups',
        prompt: 'Scores well in a structured interview, or poorly?',
        groups: ['Scores well', 'Scores poorly'],
        items: [
          { text: 'A real example with a result', group: 0 },
          { text: '"I\'m a hard worker" with no example', group: 1 },
          { text: 'Clear description of your own actions', group: 0 },
          { text: 'A four-minute life story', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the researchers to the finding.',
        pairs: [
          ['Schmidt and Hunter (1998)', 'Structured interviews are strong predictors'],
          ['Sackett and colleagues (2022)', 'Structured interviews top the updated list'],
          ['Both', 'How you hire affects who succeeds'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'remi',
        message: 'So they\'re literally scoring me? That\'s scary.',
        prompt: "Ada's best reply?",
        options: [
          { text: 'Yes, be scared.', why: 'Knowing helps you prepare.' },
          { text: 'It\'s fairer than a gut feeling. And it tells you what to bring: an example, what you did, and what happened.' },
          { text: 'They never score anything.', why: 'Many do.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'What to give them.',
        template: 'An [[1]], your [[2]], and a result.',
        blanks: [['example'], ['actions']],
        distractors: ['excuse', 'opinion'],
      },
      {
        kind: 'mcq',
        prompt: 'Why does rambling cost points in a structured interview?',
        options: [
          { text: 'Interviewers dislike long words', why: 'It\'s about missing evidence.' },
          { text: 'It doesn\'t', why: 'Scores need clear evidence.' },
          { text: 'If the evidence isn\'t clear, the interviewer can\'t score it' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Which line in Remi\'s notes misreads the research?',
        lines: [
          'Questions are often planned in advance.',
          'Answers are often scored.',
          'So charm matters more than examples.',
          'Give a real example and a result.',
        ],
        bug: 2,
        fix: 'So clear examples matter most.',
        explanation: 'Scoring rewards evidence, not charm.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'A common rating scale goes from 1 to what?',
        answers: ['5', 'five'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order a scoreable answer.',
        lines: ['A real example', 'Your own actions', 'The result', 'What you learned'],
      },
    ],
  },
  reflect: {
    prompt: 'Pick a skill from a job ad you like. What real example, action and result could you give for it?',
    starters: ['Skill:...', 'Example:...', 'Result:...'],
  },
  deepen: {
    title: 'Why structure is fairer',
    summary: 'Structured interviews reduce the role of first impressions and personal bias, because every candidate gets the same questions and the same scoring.',
  },
  notes: 'Schmidt & Hunter (1998), Psychological Bulletin 124(2); Sackett, Zhang, Berry & Lievens (2022), "Revisiting meta-analytic estimates of validity in personnel selection", Journal of Applied Psychology 107(11) (online 2021): structured interviews highest mean operational validity (~.42).',
};

export default lesson;
