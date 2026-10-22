import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 3. Explain cards: what interviewers look for. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'What interviewers look for',
  summary: 'Remi imagines interviewers checking a secret list of "right answers". Ada shows him the real list: a handful of things almost every interviewer wants to find out.',
  minutes: 12,
  outcomes: [
    'Know the main things interviewers assess',
    'Match questions to what they\'re really checking',
    'Prepare evidence for each',
  ],
  learn: [
    {
      kind: 'text',
      html: '<p>Most interviewers, whatever the job, are trying to answer five questions about you:</p><table><tr><th>They want to know</th><th>Questions that test it</th></tr><tr><td><strong>Can you do the job?</strong> Skills and knowledge</td><td>"Walk me through your project." Technical tasks.</td></tr><tr><td><strong>How do you work?</strong> Habits, problem-solving</td><td>"Tell me about a time you were stuck."</td></tr><tr><td><strong>Can you work with others?</strong></td><td>"Tell me about a disagreement in a team."</td></tr><tr><td><strong>Do you really want this?</strong> Motivation</td><td>"Why us? Why this role?"</td></tr><tr><td><strong>Will you learn and grow?</strong></td><td>"What\'s something you got wrong, and what did you change?"</td></tr></table><p>Most questions are one of these in disguise. When a question surprises you, ask yourself: <strong>which of the five is this really about?</strong> Then answer that.</p>',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Can you do it, how do you work, can you work with others, do you want it, will you grow? Most questions test one of these.',
    },
  ],
  apply: {
    scenario: 'The five questions.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match the interview question to what it\'s really checking.',
        pairs: [
          ['"Walk me through your project."', 'Can you do the job?'],
          ['"Tell me about a time you were stuck."', 'How do you work?'],
          ['"Tell me about a team disagreement."', 'Can you work with others?'],
          ['"Why us?"', 'Do you really want this?'],
          ['"What did you get wrong?"', 'Will you learn and grow?'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'A question surprises you. What should you ask yourself first?',
        options: [
          { text: '"What answer do they want me to say?"', why: 'There\'s no script; find what\'s being checked.' },
          { text: '"Which of the five is this really about?"' },
          { text: '"How do I avoid this?"', why: 'Answer what\'s being tested.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which thing is this question testing?',
        groups: ['Do the job', 'Work with others', 'Want it'],
        items: [
          { text: '"Explain how you\'d fix this bug."', group: 0 },
          { text: '"How do you handle a teammate who doesn\'t deliver?"', group: 1 },
          { text: '"What interests you about Synergix?"', group: 2 },
          { text: '"Which tools have you used?"', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'remi',
        message: 'So there\'s no secret list of right answers?',
        prompt: "Ada's best reply?",
        options: [
          { text: 'Yes, memorise the right answers.', why: 'Honest evidence beats memorised scripts.' },
          { text: 'It\'s random.', why: 'Good interviews are structured.' },
          { text: 'No. They\'re trying to find out five things. Give them true evidence for each, and you\'ve done your job.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many things are most interviewers trying to find out?',
        answers: ['5', 'five'],
        placeholder: 'A number',
      },
      {
        kind: 'fillBlank',
        prompt: 'The disguise.',
        template: 'Most questions are one of the [[1]] in [[2]].',
        blanks: [['five'], ['disguise']],
        distractors: ['ten', 'secret'],
      },
      {
        kind: 'mcq',
        prompt: '"What would your friends say is your best quality?" is mostly testing...',
        options: [
          { text: 'Your technical skills', why: 'It\'s about you as a person to work with.' },
          { text: 'How you work and get on with others' },
          { text: 'Your salary expectations', why: 'Not related.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Remi\'s prep plan misses the point?',
        lines: [
          'Prepare evidence that I can code.',
          'Prepare a story about a team disagreement.',
          'Prepare to say I\'d take any job.',
          'Prepare a mistake I learned from.',
        ],
        bug: 2,
        fix: 'Prepare why I want this role specifically.',
        explanation: '"Any job" shows no motivation for this one.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order how to handle a surprising question.',
        lines: ['Pause', 'Ask which of the five it tests', 'Pick true evidence', 'Answer briefly'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Evidence for "can you do it?" or "will you grow?"',
        groups: ['Can do it', 'Will grow'],
        items: [
          { text: 'A working app he built', group: 0 },
          { text: 'A failed project he learned from', group: 1 },
          { text: 'A coding competition result', group: 0 },
          { text: 'Feedback he acted on', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'For each of the five questions, write one piece of true evidence about yourself.',
    starters: ['I can do the job because...', 'I work with others well when...'],
  },
  deepen: {
    title: 'Competencies',
    summary: 'Large employers often list "competencies" (like teamwork or problem-solving) in the job ad and score answers against them. Read the ad: it tells you what they\'ll check.',
  },
  notes: 'Five-question framing is a teaching synthesis of common competency-based interviewing practice.',
};

export default lesson;
