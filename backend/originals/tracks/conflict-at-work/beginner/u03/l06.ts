import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 6. Step-by-step: checking what they meant. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'Checking what they meant',
  summary: 'Grace turns the lessons into five steps she can use any time a message or comment feels off. Nurses do a version of this every shift: "Let me check I\'ve understood."',
  minutes: 12,
  outcomes: [
    'Check meaning before reacting',
    'Paraphrase to confirm understanding',
    'Ask without sounding accusing',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'Five steps to check meaning',
      steps: [
        { title: '1. Pause', body: 'Don\'t reply while the feeling is hot. A few minutes is usually enough.' },
        { title: '2. Separate the words from the story', body: 'Words: "Fine." Story: "He\'s angry with me." Only the words are certain.' },
        { title: '3. Ask a light question', body: '"Thanks! Is now a bad time?" or "Just checking I read that right: are you OK with the plan?"' },
        { title: '4. Paraphrase what you heard', body: 'In a conversation: "So what you\'re saying is the change came too late for you to plan. Is that right?"' },
        { title: '5. Confirm and agree what\'s next', body: '"Great, so we\'ll look at step 3 on Monday." Close the loop so nobody leaves with a different story.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Pause, separate words from story, ask lightly, paraphrase, confirm what\'s next.',
    },
  ],
  apply: {
    scenario: 'Checking meaning.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the five steps.',
        lines: ['Pause', 'Separate the words from the story', 'Ask a light question', 'Paraphrase what you heard', 'Confirm and agree what\'s next'],
      },
      {
        kind: 'sortGroups',
        prompt: 'A light check, or an accusation?',
        groups: ['Light check', 'Accusation'],
        items: [
          { text: '"Is now a bad time?"', group: 0 },
          { text: '"Why are you being so cold?"', group: 1 },
          { text: '"Just checking I read that right."', group: 0 },
          { text: '"What\'s your problem?"', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What does paraphrasing do?',
        options: [
          { text: 'Shows you listened and lets them correct you' },
          { text: 'Repeats their words to annoy them', why: 'It\'s in your own words, to check.' },
          { text: 'Ends the conversation', why: 'It keeps it accurate.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the step to the line.',
        pairs: [
          ['Ask lightly', '"Is now a bad time?"'],
          ['Paraphrase', '"So what you\'re saying is..."'],
          ['Confirm', '"So we\'ll look at it Monday."'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'femi',
        message: 'The research keeps changing and I can\'t plan.',
        prompt: "Grace's best paraphrase?",
        options: [
          { text: '"So the changes are coming too late for you to plan the build. Is that right?"' },
          { text: '"So you think research is pointless."', why: 'That\'s a story, not what he said.' },
          { text: '"Research has to change sometimes."', why: 'That argues before checking.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Paraphrasing.',
        template: '"So what you\'re [[1]] is... Is that [[2]]?"',
        blanks: [['saying'], ['right']],
        distractors: ['hiding', 'fair'],
      },
      {
        kind: 'mcq',
        prompt: 'Why "confirm and agree what\'s next"?',
        options: [
          { text: 'So nobody leaves with a different version of what was agreed' },
          { text: 'To have the last word', why: 'It\'s about a shared understanding.' },
          { text: 'It\'s not needed', why: 'Misunderstandings start at the end of talks too.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which step in Grace\'s check is in the wrong place?',
        lines: [
          'Pause for a few minutes.',
          'Reply with my conclusion: "You\'re clearly upset with me."',
          'Ask a light question.',
          'Confirm what\'s next.',
        ],
        bug: 1,
        fix: 'Separate the words from the story.',
        explanation: 'She jumped to a conclusion instead of checking.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many steps are there for checking meaning?',
        answers: ['5', 'five'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Paraphrase, or a new opinion?',
        groups: ['Paraphrase', 'New opinion'],
        items: [
          { text: '"So the deadline feels impossible?"', group: 0 },
          { text: '"Deadlines are always tight here."', group: 1 },
          { text: '"So you need the findings by Friday?"', group: 0 },
          { text: '"I think Friday is fine."', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Next time a message feels off, use the five steps. Write the light question you\'d send.',
    starters: ['My light question:...'],
  },
  deepen: {
    title: 'Teach-back',
    summary: 'In healthcare, "teach-back" means asking patients to explain instructions in their own words, to check understanding. Paraphrasing at work is the same idea, in reverse.',
  },
  notes: 'Paraphrasing and active listening: Rogers & Farson, "Active Listening" (1957). Teach-back in healthcare: e.g. Schillinger et al. (2003), Archives of Internal Medicine 163(1).',
};

export default lesson;
