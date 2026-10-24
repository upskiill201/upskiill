import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 8. Explain cards: scripts that don't sound awkward. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'Scripts that don\'t sound awkward',
  summary: 'Ada worries she\'ll sound rehearsed, or rude. Lucía shares the short lines she uses: for asking, for "too much", for buying time, and for a no. Plain words, no apologies.',
  minutes: 12,
  outcomes: [
    'Use short, natural lines for common moments',
    'Swap apologetic phrases for clear ones',
    'Ask by message as well as face to face',
  ],
  learn: [
    {
      kind: 'text',
      html: '<p>Lucía\'s lines. Short enough to remember, plain enough not to sound rehearsed:</p><table><tr><th>Moment</th><th>Say</th><th>Instead of</th></tr><tr><td>Opening</td><td>"I\'d like to talk about..."</td><td>"Sorry to bother you, but..."</td></tr><tr><td>The ask</td><td>"I\'d like to propose ₦X, because..."</td><td>"Would it maybe be possible to..."</td></tr><tr><td>"That\'s too much"</td><td>"What part feels too much?"</td><td>"OK, how about less?"</td></tr><tr><td>Not ready</td><td>"Let me think and come back to you by Friday."</td><td>"Er... fine."</td></tr><tr><td>Saying no</td><td>"That doesn\'t work for me. Here\'s what could..."</td><td>"I\'m so sorry, I just can\'t..."</td></tr></table><p>By message, the same rules apply, plus one: <strong>put the ask in the first two lines.</strong> Busy people read the start.</p><p>Hedging words ("maybe", "just", "sorry", "a bit") make an ask sound unsure. One "please" is polite; four "sorry"s are not.</p>',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Plain, short and polite. Drop "just", "maybe" and "sorry" from your asks.',
    },
  ],
  apply: {
    scenario: 'Lucía\'s lines.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match the moment to Lucía\'s line.',
        pairs: [
          ['Opening', '"I\'d like to talk about..."'],
          ['"Too much"', '"What part feels too much?"'],
          ['Not ready', '"Let me come back to you by Friday."'],
          ['Saying no', '"That doesn\'t work for me. Here\'s what could..."'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Clear or hedging?',
        groups: ['Clear', 'Hedging'],
        items: [
          { text: '"I\'d like to propose ₦150,000."', group: 0 },
          { text: '"Would it maybe be possible to just..."', group: 1 },
          { text: '"Let me come back to you by Friday."', group: 0 },
          { text: '"Sorry, sorry, I know..."', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Mrs Okon says "That\'s too much." What\'s Ada\'s best first line?',
        options: [
          { text: '"OK, ₦80,000 then."', why: 'An instant discount.' },
          { text: '"It\'s not too much."', why: 'Arguing learns nothing.' },
          { text: '"What part feels too much?"' },
        ],
        answer: 2,
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'Won\'t scripts make me sound like a robot?',
        prompt: "Lucía's best reply?",
        options: [
          { text: 'Learn the shape, not the exact words. Short lines you\'ve practised come out sounding like you.' },
          { text: 'Yes, never use them.', why: 'Short practised lines help under pressure.' },
          { text: 'Read them from your phone.', why: 'Learn them; don\'t read them.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Messages.',
        template: 'Put the [[1]] in the first two [[2]].',
        blanks: [['ask'], ['lines', 'sentences']],
        distractors: ['apology', 'pages'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line in Ada\'s quote message hedges?',
        lines: [
          'Hello Mrs Okon, here\'s my quote for the logo.',
          'It\'s ₦150,000 to ₦180,000, depending on revisions.',
          'Sorry if that\'s maybe a bit much, I just thought...',
          'Happy to talk it through this week.',
        ],
        bug: 2,
        fix: 'Delete it.',
        explanation: 'Three hedges and an apology undo a clear quote.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'In a message, the ask should go in the first how many lines?',
        answers: ['2', 'two'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why does "Let me come back to you by Friday" beat "Er... fine"?',
        options: [
          { text: 'It\'s more polite to say fine', why: '"Fine" can become a yes.' },
          { text: 'They\'re the same', why: 'One agrees; one doesn\'t.' },
          { text: 'It buys time without agreeing to anything, and promises a real answer' },
        ],
        answer: 2,
      },
      {
        kind: 'orderLines',
        prompt: 'Order a quote message.',
        lines: ['Greet them', 'State the price', 'Say what\'s included', 'Offer to talk'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Which moment is this line for?',
        groups: ['Saying no', 'Buying time'],
        items: [
          { text: '"That doesn\'t work for me."', group: 0 },
          { text: '"Let me think and come back to you."', group: 1 },
          { text: '"Here\'s what could work instead."', group: 0 },
          { text: '"Can I reply by Friday?"', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Read your last important message. Count the hedges ("just", "maybe", "sorry"). Rewrite it without them.',
    starters: ['I used...', 'Rewritten:...'],
  },
  deepen: {
    title: 'Hedging and confidence',
    summary: 'Linguists call words like "just", "maybe" and "sort of" hedges. They can soften a request, but too many make the speaker sound unsure. Keep the politeness, lose the hedges.',
  },
  notes: 'Scripts are a teaching synthesis. Hedging as a linguistic softener: Lakoff (1973) and later sociolinguistic research.',
};

export default lesson;
