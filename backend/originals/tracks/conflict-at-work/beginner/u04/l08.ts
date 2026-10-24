import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 8. Explain cards: when criticism is public. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'When criticism is public',
  summary: 'The worst part of Monday was the eight people watching. Priya shares what to do in the moment when you\'re criticised in public, and what to do afterwards.',
  minutes: 12,
  outcomes: [
    'Answer public criticism calmly in the moment',
    'Follow up privately about how it was said',
    'Protect your credibility without a public fight',
  ],
  learn: [
    {
      kind: 'text',
      html: '<p>Public criticism hits harder, because your identity trigger is in front of an audience. Priya\'s plan:</p><table><tr><th>When</th><th>What to do</th><th>Example</th></tr><tr><td>In the moment</td><td>Stay calm, acknowledge the question, promise a follow-up</td><td>"Fair question on sample size. I\'ll share the usage data this week."</td></tr><tr><td>In the moment, if it\'s factually wrong</td><td>Correct one fact, briefly, without heat</td><td>"Just to clarify, these are recordings of what patients did, not opinions."</td></tr><tr><td>Same day</td><td>Follow up on the content, in writing</td><td>The Tuesday-morning email</td></tr><tr><td>In person, later</td><td>Raise the delivery, softly</td><td>"Could we raise concerns about each other\'s work one-to-one first?"</td></tr><tr><td>With the group</td><td>Close the loop</td><td>Share the outcome at the next meeting</td></tr></table><p>Avoid: arguing back in front of everyone, going silent for the rest of the meeting, or venting about it in the team chat.</p>',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'In public: calm, acknowledge, promise a follow-up. Later: content in writing, delivery in person, outcome back to the group.',
    },
  ],
  apply: {
    scenario: 'Public criticism.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order Priya\'s plan.',
        lines: ['Stay calm in the moment', 'Follow up on content in writing', 'Raise delivery in person', 'Close the loop with the group'],
      },
      {
        kind: 'mcq',
        prompt: 'Why does public criticism hurt more?',
        options: [
          { text: 'It\'s louder', why: 'It\'s about the audience.' },
          { text: 'It doesn\'t', why: 'Audiences make it harder.' },
          { text: 'Your identity feels threatened in front of an audience' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the moment to the action.',
        pairs: [
          ['In the meeting', 'Acknowledge, promise a follow-up'],
          ['Same day', 'Content in writing'],
          ['Later, in person', 'Raise the delivery'],
          ['Next meeting', 'Share the outcome'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Good or poor response to public criticism?',
        groups: ['Good', 'Poor'],
        items: [
          { text: '"Fair question. I\'ll share data this week."', group: 0 },
          { text: 'Arguing back in front of everyone', group: 1 },
          { text: 'One calm factual correction', group: 0 },
          { text: 'Venting in the team chat', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'grace',
        message: 'How do I raise "don\'t criticise me in public" without sounding precious?',
        prompt: "Priya's best reply?",
        options: [
          { text: '"Never embarrass me again."', why: 'Sounds like a threat.' },
          { text: 'Make it a team norm, not a complaint: "Could we raise concerns about each other\'s work one-to-one first? It\'d help me get you better answers."' },
          { text: 'Don\'t raise it.', why: 'It\'s worth raising, softly.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'In the moment.',
        template: 'Stay [[1]], acknowledge, promise a [[2]].',
        blanks: [['calm'], ['follow-up', 'followup']],
        distractors: ['silent', 'fight'],
      },
      {
        kind: 'mcq',
        prompt: 'When is it right to correct a fact in the moment?',
        options: [
          { text: 'Always, at length', why: 'Brief and calm only.' },
          { text: 'Never', why: 'A short factual correction can help.' },
          { text: 'When it\'s factually wrong and one brief, calm correction will help' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Grace\'s plan would make things worse?',
        lines: [
          'In the meeting: "Fair question, I\'ll follow up."',
          'Tuesday: email the data.',
          'Post in the team chat: "Can\'t believe what Callum said."',
          'Thursday: raise the delivery in person.',
        ],
        bug: 2,
        fix: 'Delete it.',
        explanation: 'Venting publicly spreads the conflict.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many people watched Callum\'s comment?',
        answers: ['8', 'eight'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Content or delivery?',
        groups: ['Content', 'Delivery'],
        items: [
          { text: 'Is six sessions enough?', group: 0 },
          { text: 'Saying it in front of the team', group: 1 },
          { text: 'What the pilot data shows', group: 0 },
          { text: 'The word "just"', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Have you been criticised in public? Write what you\'d say in the moment, and what you\'d raise later.',
    starters: ['In the moment:...', 'Later:...'],
  },
  deepen: {
    title: 'Praise in public, criticise in private',
    summary: 'An old management rule, still good advice. When someone breaks it with you, you can model it back: respond calmly in public, and handle the rest privately.',
  },
  notes: 'Public vs private feedback: common management guidance; synthesis with Stone & Heen. Fictional plan.',
};

export default lesson;
