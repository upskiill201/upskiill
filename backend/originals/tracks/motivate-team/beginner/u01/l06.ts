import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 6. Side by side: the end of Week 1, speech and pizza vs "you said, we did". */
const lesson: OriginalLesson = {
  key: 'l06',
  title: '"You said, we did"',
  summary: 'Friday afternoon, end of Week 1. Miracle wants to close the week well. She could do what managers usually do: pizza and a speech. Or something smaller that the team would actually remember. Two versions.',
  minutes: 11,
  outcomes: [
    'Close the loop on what people told you',
    'Show action instead of promising it',
    'Build trust in small, visible steps',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Friday, end of Week 1',
      before: { label: 'Speech and pizza', text: '"Great first week, team! I really believe in us. The rollout is going to be amazing. Pizza\'s here!" (Bisi, quietly: "Same speech. Different pizza.")' },
      after: { label: 'You said, we did', text: '"You told me three things this week. Headsets: fixed today. Ticket system: IT fixes it Wednesday. Never seeing a clinic: I\'ve asked Folake for visits, answer Monday. Pizza\'s here too, as a thank-you for being honest."' },
      notes: [
        'The speech asks for belief. The list earns it.',
        'Each item connects to something they said.',
        'Pizza is fine, as a thank-you. It\'s just not the fix.',
      ],
    },
    {
      kind: 'text',
      html: "<p>Teams that have been let down learn to ignore promises. What gets through is evidence: <strong>you said X, we did Y</strong>. It works because it answers the question every disappointed team is silently asking: \"Will this one actually listen?\" Small, visible actions, linked to what people told you, build trust faster than any vision. And honesty about what's not done yet (\"answer Monday\") counts as action too.</p>",
    },
    {
      kind: 'check',
      question: 'Why does "you said, we did" work better than a speech?',
      options: ['It shows evidence of listening instead of asking for belief', 'It\'s shorter', 'It has pizza'],
      answer: 0,
      explanation: 'Let-down teams believe actions, not promises.',
    },
  ],
  apply: {
    scenario: 'Friday, end of Week 1.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Speech, or "you said, we did"?',
        groups: ['Speech', 'You said, we did'],
        items: [
          { text: '"I really believe in us."', group: 0 },
          { text: '"Headsets: fixed today."', group: 1 },
          { text: '"It\'s going to be amazing."', group: 0 },
          { text: '"Clinic visits: answer Monday."', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What silent question is a let-down team asking?',
        options: [
          { text: '"Will this one actually listen?"' },
          { text: '"When is lunch?"', why: 'Maybe, but not the important one.' },
          { text: '"How much does she earn?"', why: 'Not the question.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'bisi',
        message: 'Same speech, different pizza, I expect?',
        prompt: 'Miracle\'s best reply?',
        options: [
          { text: 'It\'s a good speech, actually.', why: 'Proves her point.' },
          { text: 'Why are you so negative?', why: 'She\'s been let down twice. Show her.' },
          { text: 'No speech. Just a list of what you told me and what\'s happened. Then pizza.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'The speech asks for belief. The list ___ it. (one word)',
        answers: ['earns', 'Earns', 'builds'],
        placeholder: 'One word',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match "you said" to "we did".',
        pairs: [
          ['Broken headsets', 'Fixed today'],
          ['Crashing ticket system', 'IT fixes it Wednesday'],
          ['Never seeing a clinic', 'Asked Folake; answer Monday'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why include "answer Monday" for something not done yet?',
        options: [
          { text: 'To make the list longer', why: 'It\'s about honesty and follow-through.' },
          { text: 'It shouldn\'t be included', why: 'Leaving it out looks like forgetting.' },
          { text: 'Honesty about progress counts as action, and sets a clear next step' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Miracle\'s draft. Which line slips back into a speech?',
        lines: [
          'You told me three things this week.',
          'Together, we\'re going to make this the best team at Afiya!',
          'Headsets: fixed today.',
        ],
        bug: 1,
        fix: 'Ticket system: IT fixes it Wednesday.',
        explanation: 'Big promises are what the last two managers said.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put "you said, we did" in order.',
        lines: ['Say what they told you', 'Say what\'s been done', 'Say what\'s next, and when', 'Thank them for being honest'],
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'You [[1]] X. We [[2]] Y.',
        blanks: [['said', 'told me'], ['did', 'fixed']],
        distractors: ['hoped', 'promised'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Miracle\'s first line.',
        tiles: ['You', 'told', 'me', 'three', 'things.'],
        distractors: ['I'],
      },
    ],
  },
  reflect: {
    prompt: 'Think of a leader who earned your trust. Was it a speech, or something they did after you told them something?',
    starters: ['They earned it by...', 'What I told them was...'],
  },
  deepen: {
    title: 'Send a "you said, we did"',
    summary: 'If people have told you problems recently, send them a three-line "you said, we did" message this week. Include one thing not done yet, with a date.',
  },
  notes: '"You said, we did" feedback loops: common practice in employee engagement and public services (closing the feedback loop). Trust through demonstrated reliability: Kouzes & Posner (credibility), Maister et al. (reliability). Fictional details.',
};

export default lesson;
