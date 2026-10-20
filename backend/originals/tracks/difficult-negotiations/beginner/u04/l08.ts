import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 8. Explain cards: how to walk away well. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'How to walk away well',
  summary: 'Arjun has decided: if Friday stays at £35,000, he\'ll decline. Grace helps him write a walk-away that\'s honest, polite, and leaves the door wide open.',
  minutes: 12,
  outcomes: [
    'Decline a deal without burning the bridge',
    'Leave a clear path to come back',
    'Avoid the common walk-away mistakes',
  ],
  learn: [
    {
      kind: 'text',
      html: '<p>A good walk-away has five parts. Arjun\'s draft for Friday:</p><table><tr><th>Part</th><th>Arjun\'s words</th></tr><tr><td>Thanks</td><td>"Thank you for the time you and Ms Okafor-Lane have put into this."</td></tr><tr><td>The decision, clearly</td><td>"At £35,000 we can\'t take on phase one, so we\'ll have to decline."</td></tr><tr><td>The honest reason</td><td>"It doesn\'t cover the team and the till integration for 12 weeks."</td></tr><tr><td>The open door</td><td>"If a price around £40,000 becomes possible, or the scope changes, we\'d love to talk again."</td></tr><tr><td>Goodwill</td><td>"Either way, good luck with the spring launch."</td></tr></table><p><strong>Mistakes to avoid:</strong> walking away angrily, walking away as a bluff you\'d reverse, blaming them, or going silent. Each one closes a door you might want open.</p>',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Walk away with thanks, a clear decision, an honest reason, an open door, and goodwill.',
    },
  ],
  apply: {
    scenario: 'The walk-away email.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the five parts of a walk-away.',
        lines: ['Thanks', 'The decision, clearly', 'The honest reason', 'The open door', 'Goodwill'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the part to Arjun\'s words.',
        pairs: [
          ['Decision', '"We\'ll have to decline."'],
          ['Reason', '"It doesn\'t cover the team for 12 weeks."'],
          ['Open door', '"If around £40,000 becomes possible..."'],
          ['Goodwill', '"Good luck with the spring launch."'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Good walk-away, or a mistake?',
        groups: ['Good', 'Mistake'],
        items: [
          { text: 'A polite, clear decline', group: 0 },
          { text: 'Going silent', group: 1 },
          { text: 'Leaving a path back', group: 0 },
          { text: '"You\'ll regret this."', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why include an open door?',
        options: [
          { text: 'It gives them an easy way to come back with a better offer' },
          { text: 'To look weak', why: 'It\'s strength with courtesy.' },
          { text: 'It isn\'t needed', why: 'Doors you close are hard to reopen.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'kavya',
        message: 'Can we at least tell him his offer was insulting?',
        prompt: "Grace's best reply?",
        options: [
          { text: 'You can feel it. Don\'t write it. The reason is the numbers, and that\'s enough.' },
          { text: 'Yes, be honest.', why: 'Honest about the numbers, not about insults.' },
          { text: 'Write it in capitals.', why: 'Burns the bridge.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The open door.',
        template: '"If a price around £40,000 becomes [[1]], we\'d love to talk [[2]]."',
        blanks: [['possible'], ['again']],
        distractors: ['illegal', 'never'],
      },
      {
        kind: 'mcq',
        prompt: 'Why is a "bluff walk-away" a mistake?',
        options: [
          { text: 'If they don\'t come back and you reverse it, you lose all credibility' },
          { text: 'It always works', why: 'If called, you\'re stuck.' },
          { text: 'It\'s polite', why: 'It\'s risky, not polite.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which line of the walk-away email closes the door?',
        lines: [
          'Thank you for your time.',
          'At £35,000 we\'ll have to decline.',
          'Please don\'t contact us again about this.',
          'Good luck with the spring launch.',
        ],
        bug: 2,
        fix: 'If things change, we\'d love to talk again.',
        explanation: 'It removes the open door.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'In the open door, about what price does Arjun mention, in pounds?',
        answers: ['40000', '40,000', '£40,000'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Which part of the walk-away is this?',
        groups: ['Reason', 'Open door'],
        items: [
          { text: '"It doesn\'t cover the team."', group: 0 },
          { text: '"If the scope changes, let\'s talk."', group: 1 },
          { text: '"The till work alone is six weeks."', group: 0 },
          { text: '"Our door is open."', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Write a five-part walk-away for a deal or request you need to decline.',
    starters: ['Thank you for...', 'If ... changes, ...'],
  },
  deepen: {
    title: 'The power to walk',
    summary: 'Negotiators often say the most powerful word is "no", but only when you mean it. A calm, real walk-away tells the other side your limit is real.',
  },
  notes: 'Walk-away structure is a teaching synthesis (Getting to Yes; Malhotra, Negotiating the Impossible). Fictional email.',
};

export default lesson;
