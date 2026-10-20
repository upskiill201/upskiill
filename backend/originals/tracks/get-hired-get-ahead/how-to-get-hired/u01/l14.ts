import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 2 · Chapter 1 · Lesson 14 — events when you know nobody. Step-by-step. */
const lesson: OriginalLesson = {
  key: 'l14',
  title: 'The room where you know nobody',
  summary: 'Clinton runs a 40-person meet-up, but at the Douala fintech evening he knows nobody. He stands by the snacks for 20 minutes, holding a juice. Then he remembers Miracle\'s four steps.',
  minutes: 12,
  outcomes: ['Prepare for an event in five minutes', 'Start a conversation with a stranger', 'Leave a conversation politely and follow up'],
  learn: [
    {
      kind: 'steps',
      title: 'Four steps for any event',
      steps: [
        { title: '1. Before: one goal, one line', body: 'Set a small goal: "Have three real conversations." Prepare one line about yourself: "I\'m Clinton, final-year CS at Buea. I built a savings-group tracker and I\'m trying to get into payments."' },
        { title: '2. Start: find someone alone', body: 'Look for someone standing on their own, or a group of two with an open circle. Ask about the event or the talk: "What did you think of the speaker?" Questions are easier than introductions.' },
        { title: '3. During: listen more than you talk', body: 'Ask about their work, then their opinion. Say your one line when they ask. Remember one detail: Etienne works on fraud checks and loves football.' },
        { title: '4. Leave and follow up', body: 'After ten minutes or so: "It\'s been great talking. I\'ll let you meet some more people. Can I connect with you on LinkedIn?" Within a day, connect with a note using the detail: "Great to meet you, Etienne. Hope your team wins on Sunday."' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Small goal, one line, find someone alone, ask a question, remember one detail, follow up within a day.',
    },
  ],
  apply: {
    scenario: 'Clinton at the Douala fintech evening.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the four steps in order.',
        lines: ['Before: one goal, one line', 'Start: find someone alone', 'During: listen more than you talk', 'Leave and follow up'],
      },
      {
        kind: 'mcq',
        prompt: 'Who\'s easiest to approach at an event?',
        options: [
          { text: 'Someone standing alone, or a pair with an open circle' },
          { text: 'A tight group of six laughing', why: 'Hard to join. Start with someone alone.' },
          { text: 'The main speaker, surrounded by people', why: 'Hardest to reach. Start easier.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Good opener, or awkward?',
        groups: ['Good', 'Awkward'],
        items: [
          { text: 'What did you think of the speaker?', group: 0 },
          { text: 'Can you give me a job?', group: 1 },
          { text: 'Is this your first time at this event?', group: 0 },
          { text: 'How much do you earn?', group: 1 },
          { text: 'What brings you here tonight?', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best line to leave the conversation.',
        from: 'clinton',
        message: 'I\'ve been talking to Etienne for ten minutes. How do I leave without being rude?',
        options: [
          { text: '"It\'s been great talking. I\'ll let you meet some more people. Can I connect with you on LinkedIn?"' },
          { text: 'Just walk away mid-sentence.', why: 'Rude. Close it warmly.' },
          { text: 'Stay with Etienne all night.', why: 'Kind, but you both came to meet people.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that breaks step 3.',
        lines: ['Asks Etienne what he works on.', 'Talks about his own tracker for nine of the ten minutes.', 'Remembers Etienne loves football.'],
        bug: 1,
        explanation: 'Listen more than you talk. Share your line when they ask.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each step to Clinton\'s action.',
        pairs: [
          ['Before', 'Goal: three real conversations'],
          ['During', 'Remembers Etienne works on fraud checks'],
          ['After', 'Connects with a note about Sunday\'s match'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'What\'s a good goal for Clinton\'s first event?',
        options: [
          { text: '"Have three real conversations."' },
          { text: '"Get a job offer tonight."', why: 'Too big for one evening.' },
          { text: '"Talk to all 120 people."', why: 'Impossible, and shallow. Three real ones.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the follow-up note.',
        template: 'Great to [[1]] you, Etienne. Hope your team [[2]] on Sunday.',
        blanks: [['meet'], ['wins']],
        distractors: ['hire', 'loses', 'pays'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many real conversations is Clinton\'s goal? (a number)',
        answers: ['3', 'three'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Good event habit, or not?',
        groups: ['Good habit', 'Not good'],
        items: [
          { text: 'Asking questions before talking about yourself', group: 0 },
          { text: 'Standing by the snacks all night', group: 1 },
          { text: 'Following up within a day', group: 0 },
          { text: 'Handing everyone your CV', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'What usually stops you from talking to strangers at events? Which of the four steps would help most?',
    starters: ['What stops me is...', 'The step that would help is...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Write your one-line introduction: who you are, one thing you\'ve done, what you\'re looking for. Say it out loud until it feels natural.',
  },
  notes: 'Event networking steps are common careers guidance. Etienne is a named extra (not a CastId), a fraud-checks developer Clinton meets at a Douala fintech evening (Tchami suggested him in l08). Where you live: business-card and greeting customs vary; check locally.',
};

export default lesson;
