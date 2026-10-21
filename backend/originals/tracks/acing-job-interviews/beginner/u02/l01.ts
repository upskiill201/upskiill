import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 1. Story: "What do you know about us?" */
const lesson: OriginalLesson = {
  key: 'l01',
  title: '"What do you know about us?"',
  summary: 'Monday night. Mtaa Labs interview tomorrow at 10. Ada asks one question: "What does Mtaa Labs actually do?" Remi realises he\'s never opened their app.',
  minutes: 11,
  outcomes: [
    'See why research changes an interview',
    'Know the questions research should answer',
    'Know what this chapter covers',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Monday, 9 p.m.',
      beats: [
        { speaker: 'ada', text: 'Quick test. What does Mtaa Labs do, who uses it, and why do you want to work there?' },
        { speaker: 'remi', text: 'They do... delivery tracking? For shops? And I want to work there because it\'s a startup.' },
        { speaker: 'ada', text: 'Every startup is a startup. Have you used the app? Read the job ad properly? Looked up who\'s interviewing you?' },
        { speaker: 'narrator', text: 'Remi opens the job ad for the first time since he applied. Half of it he doesn\'t remember reading.' },
        { speaker: 'tey', text: 'This chapter: research in an hour, a real answer to "why us?", decoding the ad, video set-up, and questions to ask.' },
      ],
      choice: {
        prompt: 'Remi has one evening. What\'s the best use of it?',
        options: [
          { text: 'An hour of focused research: the app, the job ad, the interviewer, then "why us?" and his questions', outcome: 'Right. One focused hour beats a night of worrying.', best: true },
          { text: 'Revise every coding topic from three years of university', outcome: 'Impossible in one night, and it skips the research.' },
          { text: 'Sleep early and wing it', outcome: 'Sleep matters, but so does knowing what they do.' },
        ],
      },
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Before any interview, know: what they do, who uses it, what the role needs, and why you want it.',
    },
  ],
  apply: {
    scenario: 'Monday night.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What\'s wrong with "I want to work there because it\'s a startup"?',
        options: [
          { text: 'It could be said about any startup; it shows no research' },
          { text: 'Startups don\'t like it', why: 'It\'s too generic for anyone.' },
          { text: 'Nothing', why: 'It\'s not specific to them.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Something research should tell Remi, or not needed?',
        groups: ['Should know', 'Not needed'],
        items: [
          { text: 'What their app does', group: 0 },
          { text: 'Who their customers are', group: 0 },
          { text: 'The CEO\'s favourite food', group: 1 },
          { text: 'What the role needs', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'remi',
        message: 'I only have tonight. Should I revise algorithms instead?',
        prompt: "Ada's best reply?",
        options: [
          { text: 'Do an hour of research first. Then review the two or three skills the ad lists. Then sleep.' },
          { text: 'Yes, revise everything all night.', why: 'Impossible, and you\'ll be exhausted.' },
          { text: 'Skip both.', why: 'One focused hour helps a lot.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the research question to where to find the answer.',
        pairs: [
          ['What do they do?', 'Use the app and read the website'],
          ['What does the role need?', 'Read the job ad closely'],
          ['Who\'s interviewing me?', 'Their public profile'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The tip.',
        template: 'Know what they [[1]], who [[2]] it, what the role needs, and why you want it.',
        blanks: [['do'], ['uses']],
        distractors: ['earn', 'hates'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'At what time is the Mtaa Labs interview? (e.g. 10 am)',
        answers: ['10', '10 am', '10am', '10 a.m.', '10:00'],
        placeholder: 'A time',
      },
      {
        kind: 'mcq',
        prompt: 'Why is "have you used the app?" a strong research question?',
        options: [
          { text: 'Using the product gives real things to talk about and shows interest' },
          { text: 'To find bugs to criticise', why: 'It\'s about understanding it.' },
          { text: 'It isn\'t useful', why: 'It\'s one of the best things to do.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which line in Remi\'s evening plan is a mistake?',
        lines: [
          'Download and use the Mtaa Labs app.',
          'Read the job ad line by line.',
          'Stay up until 4 a.m. revising everything.',
          'Write three questions to ask them.',
        ],
        bug: 2,
        fix: 'Sleep properly before the interview.',
        explanation: 'Exhaustion costs more than it gains.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order what this chapter covers.',
        lines: ['Research in an hour', '"Why us?"', 'Decoding the ad', 'Video set-up', 'Questions to ask'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Specific or generic reason to join?',
        groups: ['Specific', 'Generic'],
        items: [
          { text: '"Your app helps shop owners track deliveries"', group: 0 },
          { text: '"You\'re a great company"', group: 1 },
          { text: '"I want to build for small businesses"', group: 0 },
          { text: '"I need an internship"', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'For a company you want to work for, can you say what they do, who uses it, and why you want to join? Try it.',
    starters: ['They...', 'I want to join because...'],
  },
  deepen: {
    title: '"What do you know about us?"',
    summary: 'It\'s one of the most common interview questions, and one of the easiest to prepare. A specific answer instantly sets you apart from candidates who didn\'t look.',
  },
  notes: 'Fictional: Mtaa Labs (startup building delivery tracking for small shops), interview Tuesday 10 a.m.',
};

export default lesson;
