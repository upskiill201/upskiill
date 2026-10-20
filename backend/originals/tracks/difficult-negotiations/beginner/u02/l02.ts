import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 2. Reading: extreme anchors and the flinch. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'Extreme anchors and the flinch',
  summary: '£28,000 and a sharp intake of breath. Both are designed to make £48,000 feel ridiculous. Grace sends Arjun the research on extreme first offers, and how to stop one from setting the deal.',
  minutes: 12,
  outcomes: [
    'Recognise an extreme anchor and a flinch',
    'Counter-anchor with your own number and reasons',
    'Refuse to negotiate from their number',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'Why extreme numbers work, and how to stop them',
      html: '<p>First offers pull the final deal towards them. That\'s anchoring, and it works even when the first number is extreme. In Galinsky and Mussweiler\'s research, first offers strongly predicted final prices.</p><p>The <strong>flinch</strong> is the anchor\'s partner: a gasp, a "wow", a long silence when you name your price. It\'s designed to make you doubt yourself and drop the price before they\'ve even countered.</p><p><strong>Three answers:</strong></p><ul><li><strong>Don\'t move after a flinch.</strong> Stay quiet or say, "It reflects 16 weeks of work for three people." Then stop.</li><li><strong>Counter-anchor quickly.</strong> Put your number and reasons back on the table, so theirs isn\'t the only one.</li><li><strong>Don\'t negotiate from their number.</strong> Don\'t say "£28,000 is too low, how about £40,000?". Say "Let\'s look at what the app needs to do, and what that costs."</li></ul><p>Galinsky also found that thinking about <em>your own</em> goal and the other side\'s <em>alternatives</em> weakens an anchor\'s pull. Harlow &amp; Finch\'s alternative: find another agency and miss the spring sale.</p>',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'After a flinch, don\'t move. After an extreme anchor, counter with your own number and reasons, and don\'t bargain from theirs.',
    },
  ],
  apply: {
    scenario: 'The anchor and the flinch.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What is the flinch designed to do?',
        options: [
          { text: 'Make you doubt your price and drop it before they counter' },
          { text: 'Show genuine shock', why: 'It may be real, but it works as a tactic either way.' },
          { text: 'End the negotiation', why: 'It\'s meant to move you, not end things.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Good answer to an extreme anchor, or not?',
        groups: ['Good', 'Not'],
        items: [
          { text: '"Let\'s look at what the app needs and what that costs."', group: 0 },
          { text: '"£28,000 is low. How about £40,000?"', group: 1 },
          { text: '"Our quote reflects 16 weeks for three people."', group: 0 },
          { text: '"OK, let\'s meet in the middle at £38,000."', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'joel',
        message: 'He gasped at £48,000! Should we drop it?',
        prompt: "Grace's best reply?",
        options: [
          { text: 'A gasp isn\'t a reason. Did he say what was wrong with the scope? No. So nothing has changed.' },
          { text: 'Yes, he\'s clearly shocked.', why: 'Shock is not information about the work.' },
          { text: 'Gasp back at him.', why: 'Stay calm.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the move to its answer.',
        pairs: [
          ['Flinch', 'Don\'t move; explain once'],
          ['Extreme anchor', 'Counter-anchor with reasons'],
          ['"Meet in the middle"', 'Talk about scope, not their number'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'The middle of £28,000 and £48,000, in pounds?',
        answers: ['38000', '38,000', '£38,000'],
        placeholder: 'A number',
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'Don\'t negotiate from [[1]] number. Talk about what the app [[2]].',
        blanks: [['their'], ['needs']],
        distractors: ['my', 'costs nothing'],
      },
      {
        kind: 'mcq',
        prompt: 'Why is "meeting in the middle" at £38,000 a problem here?',
        options: [
          { text: 'Their extreme anchor decides where the middle is' },
          { text: 'The middle is always unfair', why: 'It\'s unfair here because their start was extreme.' },
          { text: 'It isn\'t a problem', why: 'An extreme anchor drags the middle down.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which line in Arjun\'s plan negotiates from their number?',
        lines: [
          'Stay quiet if he flinches again.',
          'Explain the 16 weeks and three people once.',
          'Offer £33,000 as a step up from £28,000.',
          'Ask what the app must do for the spring sale.',
        ],
        bug: 2,
        fix: 'Talk about scope and price together.',
        explanation: '"A step up from £28,000" accepts their anchor.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Galinsky found thinking about the other side\'s what weakens an anchor? (one word)',
        answers: ['alternatives', 'alternative', 'BATNA'],
        placeholder: 'One word',
      },
      {
        kind: 'orderLines',
        prompt: 'Order the answer to an extreme anchor.',
        lines: ['Don\'t react to the number', 'Restate your number with reasons', 'Move the talk to scope', 'Remind yourself of their alternatives'],
      },
    ],
  },
  reflect: {
    prompt: 'When did a first number pull you somewhere you didn\'t want to go? What would counter-anchoring have sounded like?',
    starters: ['The first number was...', 'I could have said...'],
  },
  deepen: {
    title: 'Extreme offers have a cost',
    summary: 'Research also finds that very extreme offers can damage trust and make the other side less likely to want to deal with you again. Arjun can use that: stay reasonable while they look extreme.',
  },
  notes: 'Galinsky & Mussweiler (2001), JPSP 81(4): first offers predict outcomes; focusing on own target or the other side\'s alternatives reduced anchoring. Extreme offers and relationships: e.g. Schweinsberg, Ku, Wang & Pillutla (2012), JESP, on insultingly extreme offers causing impasse.',
};

export default lesson;
