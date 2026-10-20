import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 2 · Chapter 5 · Lesson 9 — a demanding ask vs. a collaborative one. Before / After. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Ask together, not against',
  summary: 'Two ways to ask for the same 330,000 francs. One makes Brenda the enemy. The other makes her a partner trying to solve a problem with him. Same number, very different call.',
  minutes: 11,
  outcomes: ['Frame a negotiation as solving a problem together', 'Avoid threats and pressure', 'Give the other side room to help'],
  learn: [
    {
      kind: 'compare',
      title: 'Two ways to ask',
      before: { label: 'Against', text: '"300,000 is too low. I know my worth. I need 330,000, or I\'ll have to go elsewhere."\n\nIt\'s a demand and a threat. Brenda now has to defend the company. Even if she agrees, it starts the job badly.' },
      after: { label: 'Together', text: '"I really want to make this work. Based on my offline experience and what I\'ve seen for similar roles, I was hoping for around 330,000. Is there any flexibility, or another way we could get closer, like a review after probation?"\n\nSame number. But now Brenda is helping him find a solution, and she has options to offer.' },
      notes: [
        '"I want to make this work" puts you on the same side.',
        'Ask "Is there any flexibility?" instead of "I need".',
        'Offer an alternative, so they have a way to say yes.',
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Same side of the table. "Is there any flexibility?" Offer another way to get closer.',
    },
  ],
  apply: {
    scenario: 'Clinton chooses how to frame his ask.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why does "or I\'ll go elsewhere" hurt?',
        options: [
          { text: 'It\'s a threat, so Brenda has to defend the company' },
          { text: 'It\'s too polite', why: 'The opposite.' },
          { text: 'It doesn\'t', why: 'Threats start the job badly.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Together or against?',
        groups: ['Together', 'Against'],
        items: [
          { text: 'I really want to make this work', group: 0 },
          { text: 'I know my worth', group: 1 },
          { text: 'Is there any flexibility?', group: 0 },
          { text: 'Or I walk', group: 1 },
          { text: 'Or another way to get closer?', group: 0 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Put the "together" ask in order.',
        lines: ['I really want to make this work', 'My reason', 'The number I hoped for', 'Is there any flexibility, or another way?'],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that turns Brenda into an opponent.',
        lines: ['I really want to make this work.', 'Your offer is frankly insulting.', 'Is there any flexibility?'],
        bug: 1,
        explanation: 'An insult. Stay on the same side.',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best "together" line.',
        from: 'clinton',
        message: 'How do I give Brenda a way to say yes, even if salary is tight?',
        options: [
          { text: '"Or is there another way we could get closer, like a review after probation?"' },
          { text: '"Just find the money."', why: 'Offer options instead.' },
          { text: '"Never mind then."', why: 'Offer an alternative.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each "against" line to a "together" one.',
        pairs: [
          ['I need 330,000', 'I was hoping for around 330,000'],
          ['Or I\'ll go elsewhere', 'I really want to make this work'],
          ['Take it or leave it', 'Is there any flexibility?'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'What does offering an alternative do?',
        options: [
          { text: 'Gives them a way to say yes' },
          { text: 'Shows weakness', why: 'It shows flexibility and makes agreement easier.' },
          { text: 'Nothing', why: 'It creates options.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the tip.',
        template: 'Same [[1]] of the table. Is there any [[2]]?',
        blanks: [['side'], ['flexibility']],
        distractors: ['end', 'money', 'problem'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Complete Clinton\'s opener: "I really want to make this ___." (one word)',
        answers: ['work'],
        placeholder: 'One word',
      },
      {
        kind: 'sortGroups',
        prompt: 'Good alternative to ask for, or not?',
        groups: ['Good', 'Not good'],
        items: [
          { text: 'Review after probation', group: 0 },
          { text: 'A training budget', group: 0 },
          { text: 'Your manager\'s job', group: 1 },
          { text: 'A later start date for exams', group: 0 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Think of a time you asked someone for something. Did you ask "together" or "against"? How did it go?',
    starters: ['I asked...', 'Next time I\'d say...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Rewrite one "I need..." request in your life as "I really want to make this work. Is there any flexibility?"',
  },
  notes: 'Collaborative framing reflects interest-based negotiation (e.g., Fisher & Ury, Getting to Yes, 1981).',
};

export default lesson;
