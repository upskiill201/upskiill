import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 4. Step-by-step: stay interviews (Finnegan). */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Ask why they stay',
  summary: 'Most companies ask people why they\'re leaving, on their last day, when it\'s too late. Tey suggests the opposite: ask why they stay, now, while there\'s still time to act. Miracle tries it with Bisi first.',
  minutes: 12,
  outcomes: [
    'Run a stay interview in five steps',
    'Ask the questions that reveal what keeps people',
    'Act on one answer quickly',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'A stay interview in five steps',
      steps: [
        { title: '1. Say why you\'re asking', body: '"I want to understand what keeps you here, and what might make you leave, so I can do more of the first and less of the second." Richard Finnegan, who popularised stay interviews, recommends saying the purpose plainly.' },
        { title: '2. Ask why they stay', body: '"What keeps you working here?" Then wait. Bisi, after a long pause: "Honestly? The clinics. Some of those nurses call me \'Aunty Bisi\'."' },
        { title: '3. Ask what might make them leave', body: '"What might tempt you to leave?" It\'s a brave question. Asked kindly, people answer. Bisi: "Being ignored. Three managers, and none of them asked me anything."' },
        { title: '4. Ask what they\'d change', body: '"If you ran this team, what\'s one thing you\'d change?" Bisi: "I\'d let us visit clinics. We\'ve never seen one."' },
        { title: '5. Agree one action, and do it', body: '"I\'ll ask Folake about clinic visits by Friday." A stay interview with no action is worse than none: it proves nobody listens.' },
      ],
    },
    {
      kind: 'compare',
      title: 'Exit interview vs stay interview',
      before: { label: 'Exit interview', text: 'Bisi\'s last day: "Why are you leaving?" "Nobody ever asked me anything." (Too late.)' },
      after: { label: 'Stay interview', text: 'Week 1: "What keeps you here, and what might make you leave?" "The clinics keep me. Being ignored might not." (Time to act.)' },
      notes: ['Same answers, months apart.', 'One is a post-mortem. The other is a chance.', 'Asking at all already answers "being ignored".'],
    },
  ],
  apply: {
    scenario: 'Miracle\'s stay interview with Bisi.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the five steps in order.',
        lines: ['Say why you\'re asking', 'Ask why they stay', 'Ask what might make them leave', 'Ask what they\'d change', 'Agree one action, and do it'],
      },
      {
        kind: 'mcq',
        prompt: 'Why is a stay interview better than an exit interview?',
        options: [
          { text: 'It\'s shorter', why: 'It\'s about timing.' },
          { text: 'You hear the same things while there\'s still time to act' },
          { text: 'People lie in exit interviews', why: 'Maybe, but timing is the big difference.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Good stay-interview question, or not?',
        groups: ['Good question', 'Not a good one'],
        items: [
          { text: '"What keeps you working here?"', group: 0 },
          { text: '"You\'re not thinking of leaving, are you?"', group: 1 },
          { text: '"What might tempt you to leave?"', group: 0 },
          { text: '"Are you happy? Great."', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'bisi',
        message: 'Honestly? Being ignored. Three managers, none of them asked me anything.',
        prompt: 'Miracle\'s best reply?',
        options: [
          { text: 'I\'m sure they tried their best.', why: 'Defends the past instead of listening.' },
          { text: 'That won\'t happen with me.', why: 'Show it, don\'t promise it.' },
          { text: 'Thank you for telling me. I\'m asking now, and I\'ll keep asking. What\'s one thing you\'d change first?' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'A stay interview with no ___ is worse than none. (one word)',
        answers: ['action', 'Action'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'What keeps Bisi at Afiya?',
        options: [
          { text: 'The clinics and the nurses who call her "Aunty Bisi"' },
          { text: 'The pay', why: 'She didn\'t mention it.' },
          { text: 'The headsets', why: 'Those are what frustrate her.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Miracle\'s notes after the interview. Which line breaks step 5?',
        lines: [
          'Keeps her: the clinics.',
          'Might make her leave: being ignored.',
          'Action: think about clinic visits sometime.',
        ],
        bug: 2,
        fix: 'Action: ask Folake about clinic visits by Friday.',
        explanation: '"Sometime" proves, again, that nobody listens.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the question to Bisi\'s answer.',
        pairs: [
          ['Why do you stay?', 'The clinics'],
          ['What might make you leave?', 'Being ignored'],
          ['What would you change?', 'Visit a clinic'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'Ask why they [[1]] before they decide to [[2]].',
        blanks: [['stay'], ['leave', 'go']],
        distractors: ['complain', 'start'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the key question.',
        tiles: ['What', 'keeps', 'you', 'working', 'here?'],
        distractors: ['stops'],
      },
    ],
  },
  reflect: {
    prompt: 'Answer the stay-interview questions for yourself: what keeps you where you are, and what might make you leave?',
    starters: ['What keeps me is...', 'What might make me leave is...'],
  },
  deepen: {
    title: 'One stay interview',
    summary: 'If you lead anyone, ask one person the three stay-interview questions this week. Agree one action, and do it before they ask about it.',
  },
  notes: 'Richard P. Finnegan, The Power of Stay Interviews for Engagement and Retention (2012; 2nd ed. 2018): structured questions about why employees stay and what might cause them to leave, followed by action plans. Fictional details.',
};

export default lesson;
