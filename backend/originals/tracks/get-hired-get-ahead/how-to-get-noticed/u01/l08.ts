import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 1 · Chapter 1 · Lesson 8 — proof, not claims: evidence and the STAR method (used again in CVs and interviews). */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'Proof, not claims',
  summary: 'Anyone can write "good at problem-solving". Miracle shows Clinton the four-part story recruiters trust, the one he\'ll use on his CV, in his cover letter, and in every interview: STAR.',
  minutes: 12,
  outcomes: ['Turn a skill into proof with a short story', 'Use the four parts of STAR', 'Add a number or result to make it stick'],
  learn: [
    {
      kind: 'steps',
      title: 'STAR: a skill, proved in four parts',
      steps: [
        { title: 'S: Situation', body: 'Where were you, and what was going on? One sentence. "Our tech meet-up had six regular members and no sponsor."' },
        { title: 'T: Task', body: 'What did you need to do? "I wanted to grow it so speakers would take us seriously."' },
        { title: 'A: Action', body: 'What did YOU do? This is the longest part, and it says "I", not "we". "I started posting a weekly update in the faculty group, invited one local developer to speak each month, and asked every member to bring one friend."' },
        { title: 'R: Result', body: 'What changed? Add a number if you can. "In a year we grew from 6 to 40 regular members, and a Douala start-up sponsored our snacks."' },
      ],
    },
    {
      kind: 'text',
      html: '<p><strong>Why STAR works:</strong> it turns "I\'m good at problem-solving" into something a recruiter can picture and believe. It\'s also exactly how many interviewers are trained to score answers, so you\'ll use it again in Chapter 8.</p>',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'No number? Use a real change: "the group chat stopped flooding", "the customer came back next week", "the coach asked me to do it again next season".',
    },
  ],
  apply: {
    scenario: 'Clinton builds his first STAR stories.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put STAR in order.',
        lines: ['Situation', 'Task', 'Action', 'Result'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each line of Clinton\'s story to its STAR part.',
        pairs: [
          ['The meet-up had six members and no sponsor', 'Situation'],
          ['I wanted speakers to take us seriously', 'Task'],
          ['I posted weekly updates and invited speakers', 'Action'],
          ['We grew to 40 members and got a sponsor', 'Result'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Which part of STAR should be the longest?',
        options: [
          { text: 'Situation', why: 'One sentence is enough to set the scene.' },
          { text: 'Action' },
          { text: 'Task', why: 'Keep it short. The Action is where you show what you did.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the sentence that weakens the Action.',
        lines: ['The meet-up had six regular members.', 'We sort of did some posting and things got better.', 'In a year we grew to 40 members.'],
        bug: 1,
        fix: 'I posted a weekly update in the faculty group and invited one speaker a month.',
        explanation: '"We sort of did some posting" hides what Clinton did. Say "I", and say exactly what.',
      },
      {
        kind: 'sortGroups',
        prompt: 'Proof or claim?',
        groups: ['Proof', 'Claim'],
        items: [
          { text: 'Grew the meet-up from 6 to 40 members in a year', group: 0 },
          { text: 'Excellent leader', group: 1 },
          { text: 'Turned a six-game losing run into four wins in five', group: 0 },
          { text: 'Great problem-solver', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'miracle',
        message: 'Your Action says "we" six times. Who\'s "we"?',
        options: [
          { text: 'The team. But you\'re right: I\'ll say what I did, and credit the others honestly.' },
          { text: 'Everyone. It was a group effort.', why: 'Maybe, but the recruiter is hiring you. Say what YOUR part was.' },
          { text: 'I\'ll take credit for all of it.', why: 'Taking credit for others\' work is a lie. Say what you did, honestly.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete STAR.',
        template: 'Situation, [[1]], Action, [[2]].',
        blanks: [['Task'], ['Result']],
        distractors: ['Talent', 'Reason', 'Review'],
      },
      {
        kind: 'mcq',
        prompt: 'Clinton has no number for the phone-stall story. What can his Result be?',
        options: [
          { text: 'Leave the Result out', why: 'A story without a result is a story without an ending.' },
          { text: 'Invent a number', why: 'Never invent. Use a real change instead.' },
          { text: '"The angry customer came back the next week and brought his brother."' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'In STAR, the R stands for ___.',
        answers: ['result', 'results'],
        placeholder: 'One word',
      },
      {
        kind: 'orderLines',
        prompt: 'Put Clinton\'s phone-stall story in STAR order.',
        lines: ['A customer shouted that his repair cost too much.', 'I needed to calm him down without dropping the price.', 'I showed him the broken part and explained what it cost and why.', 'He calmed down, paid, and came back the next week.'],
      },
    ],
  },
  reflect: {
    prompt: 'Pick one skill from your list and write its STAR story in four short sentences. What\'s your Result?',
    starters: ['Situation: ...', 'Task: ...', 'Action: I...', 'Result: ...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Write two STAR stories for your two strongest skills. Keep them: you\'ll turn them into CV bullets in Chapter 3 and interview answers in Chapter 8.',
  },
  notes: 'STAR (Situation, Task, Action, Result) is the standard structure for behavioural interview answers and achievement statements (used widely by employers and university careers services for behavioural interviews). Introduced here per the outline so it\'s familiar by Chapter 8 (the folded-in Acing Job Interviews content).',
};

export default lesson;
