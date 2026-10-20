import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 2 · Chapter 3 · Lesson 2 — how interviews work and what interviewers are checking. Reading. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'What interviewers are checking',
  summary: 'Clinton thinks an interview is a test with right answers. Miracle, who has run dozens, tells him what\'s actually happening on her side of the table, and why so many companies ask the same kinds of questions.',
  minutes: 12,
  outcomes: ['Describe common interview stages', 'Name the three things interviewers check', 'Explain behavioural questions'],
  learn: [
    {
      kind: 'reading',
      title: 'The other side of the table',
      html:
        '<p>Most hiring processes have a few <strong>stages</strong>. A short screening call (often with a recruiter like Brenda), one or more main interviews, sometimes a practical task (a coding exercise, a case study, a sample piece of work), and sometimes a final conversation with a senior person. Ask the recruiter what to expect; they usually tell you.</p>' +
        '<p>Whatever the stage, interviewers are mostly checking <strong>three things</strong>: <em>Can you do the job?</em> (skills and evidence), <em>Will you do it well?</em> (motivation, reliability, how you work with people), and <em>Will you work well here?</em> (how you\'d fit the team\'s way of working, not whether you\'re like them).</p>' +
        '<p>Many companies use <strong>behavioural questions</strong>: "Tell me about a time when you..." The idea is that how you handled real situations in the past is good evidence of how you\'ll handle similar ones. Research on hiring has found that <strong>structured interviews</strong>, where every candidate gets the same job-related questions and is scored the same way, are among the better ways to predict job performance. That\'s why you hear the same kinds of questions again and again.</p>' +
        '<p>The good news: that makes interviews <strong>predictable</strong>. You can\'t know the exact questions, but you can prepare real stories that answer most of them.</p>',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Can you do it? Will you do it well? Will you work well here? Every question is one of those three.',
    },
  ],
  apply: {
    scenario: 'Miracle explains interviews.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What does "Tell me about a time when..." test?',
        options: [
          { text: 'How you handled real situations, as evidence for the future' },
          { text: 'Your memory', why: 'It\'s about evidence, not memory.' },
          { text: 'Whether you can lie well', why: 'Never lie. Real stories.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each question to what it checks.',
        pairs: [
          ['Walk me through your tracker\'s code', 'Can you do the job?'],
          ['Tell me about a time you missed a deadline', 'Will you do it well?'],
          ['How do you like to get feedback?', 'Will you work well here?'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Common interview stage, or not?',
        groups: ['Common stage', 'Not a stage'],
        items: [
          { text: 'Screening call with a recruiter', group: 0 },
          { text: 'A practical coding task', group: 0 },
          { text: 'Paying an interview fee', group: 1 },
          { text: 'A final chat with a senior person', group: 0 },
          { text: 'Guessing the interviewer\'s star sign', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What is a structured interview?',
        options: [
          { text: 'Every candidate gets the same job-related questions, scored the same way' },
          { text: 'An interview in a tall building', why: 'Ha. Same questions, same scoring.' },
          { text: 'A random chat', why: 'The opposite: planned and consistent.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'I don\'t know what Njangi Pay\'s stages are. Is it rude to ask?',
        options: [
          { text: 'Not rude at all. I\'ll ask Brenda what the process looks like.' },
          { text: 'Yes, just guess.', why: 'Recruiters expect the question.' },
          { text: 'Ask the CEO directly.', why: 'Ask the recruiter.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the misunderstanding.',
        lines: ['Interviews are fairly predictable.', '"Fit" means being exactly like the team.', 'Behavioural questions use real past situations.'],
        bug: 1,
        explanation: 'Fit is about working well with their way of working, not being the same as them.',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Why is predictability good news?',
        options: [
          { text: 'You can prepare real stories for most questions' },
          { text: 'You can memorise exact answers', why: 'Not exact words: prepare stories.' },
          { text: 'You don\'t need to prepare', why: 'You can prepare well, so do.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Miracle\'s three checks.',
        template: 'Can you [[1]] it? Will you do it [[2]]? Will you work well [[3]]?',
        blanks: [['do'], ['well'], ['here']],
        distractors: ['fake', 'fast', 'alone'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many main things are interviewers checking? (a number)',
        answers: ['3', 'three'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Behavioural question, or not?',
        groups: ['Behavioural', 'Not behavioural'],
        items: [
          { text: 'Tell me about a time you disagreed with someone', group: 0 },
          { text: 'What\'s 12 times 12?', group: 1 },
          { text: 'Describe a time you had to learn fast', group: 0 },
          { text: 'Where did you study?', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Of the three checks, which do you find hardest to show in an interview? Why?',
    starters: ['The hardest is...', 'Because...'],
  },
  deepen: {
    title: 'Read more',
    summary: 'Search "structured interview" and read one explanation. Notice how the questions are planned in advance and tied to the job.',
  },
  notes: 'Structured interviews as among the better predictors of job performance: long-standing personnel-selection research (e.g., Schmidt & Hunter, 1998; Sackett et al., 2022, Journal of Applied Psychology, which found structured interviews among the strongest predictors). Kept qualitative: no validity coefficients in learner text.',
};

export default lesson;
