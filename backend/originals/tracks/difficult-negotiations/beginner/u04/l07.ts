import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 7. Myth or Fact: power myths. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'Power myths',
  summary: 'Joel believes the bigger side always wins. Kavya believes whoever walks out first loses. Grace has watched both beliefs fail. Fact or myth?',
  minutes: 11,
  outcomes: [
    'Drop common beliefs about negotiation power',
    'Know that bluffing about alternatives is risky',
    'See walking away as a normal, respectable choice',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'The bigger organisation always has more power.',
          isFact: false,
          explain: 'Myth. Power depends on alternatives and need. A huge company that needs an app by spring has a real weakness.',
        },
        {
          text: 'Bluffing about your alternatives is risky.',
          isFact: true,
          explain: 'Fact. If they call the bluff, you either back down and lose credibility, or walk away from a deal you wanted.',
        },
        {
          text: 'Whoever walks away first has lost.',
          isFact: false,
          explain: 'Myth. A calm, polite walk-away at your limit often brings the other side back with a better offer, and if not, you take your BATNA.',
        },
        {
          text: 'You can mention a real alternative calmly without it being a threat.',
          isFact: true,
          explain: 'Fact. "We have another project we could start, so we need the price to work for us" is honest context, not a threat.',
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Mention real alternatives calmly. Never bluff. Walking away at your limit is normal, not a defeat.',
    },
  ],
  apply: {
    scenario: 'Power myths.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Myth', 'Fact'],
        items: [
          { text: 'The bigger side always has more power', group: 0 },
          { text: 'Bluffing about alternatives is risky', group: 1 },
          { text: 'Walking away first means losing', group: 0 },
          { text: 'A real alternative can be mentioned calmly', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What happens if your bluff is called?',
        options: [
          { text: 'Nothing', why: 'You lose credibility either way.' },
          { text: 'You back down and lose credibility, or walk from a deal you wanted' },
          { text: 'They apologise', why: 'Unlikely; you\'re the one exposed.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the myth to the truth.',
        pairs: [
          ['"Bigger means stronger"', 'Alternatives and need decide power'],
          ['"Walking away loses"', 'Calm walk-aways often bring them back'],
          ['"Mentioning alternatives is a threat"', 'Calm, honest context isn\'t'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'kavya',
        message: 'Let\'s say Google wants to hire us. They\'ll panic.',
        prompt: "Grace's best reply?",
        options: [
          { text: 'And when they ask for details? Mention Kinwell, which is real. Bluffs fall apart.' },
          { text: 'Great idea.', why: 'An invented alternative is a dangerous bluff.' },
          { text: 'Say Apple too.', why: 'Worse.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'Mention [[1]] alternatives calmly. Never [[2]].',
        blanks: [['real'], ['bluff']],
        distractors: ['fake', 'listen'],
      },
      {
        kind: 'mcq',
        prompt: 'Which is honest context, not a threat?',
        options: [
          { text: '"Sign today or we\'re gone forever."', why: 'That\'s an ultimatum.' },
          { text: '"We have another project we could start, so we need the price to work for us."' },
          { text: '"Ten companies are begging for us."', why: 'Probably a bluff.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Arjun\'s call notes is a bluff?',
        lines: [
          'We have another project we could start.',
          'So the price needs to work for us.',
          'And Amazon is about to sign with us.',
          'We\'d still love to work with you.',
        ],
        bug: 2,
        fix: 'Delete it.',
        explanation: 'An invented alternative can be called.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many shops does Harlow & Finch have, the "giant" that still needs Arjun?',
        answers: ['60', 'sixty'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Calm context or threat?',
        groups: ['Calm context', 'Threat'],
        items: [
          { text: '"We have another offer, so price matters to us."', group: 0 },
          { text: '"Pay up or we\'ll tell everyone."', group: 1 },
          { text: '"Below this, our other project makes more sense."', group: 0 },
          { text: '"You\'ll regret this."', group: 1 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Order how to use a real alternative.',
        lines: ['Make sure it\'s real', 'Know its value', 'Mention it calmly as context', 'Be ready to take it'],
      },
    ],
  },
  reflect: {
    prompt: 'Have you ever bluffed in a negotiation, or been bluffed? What happened?',
    starters: ['I once...', 'What happened was...'],
  },
  deepen: {
    title: 'Credibility is power too',
    summary: 'Every true thing you say makes the next thing more believable. A negotiator known for never bluffing can say "this is my limit" and be believed.',
  },
  notes: 'Bluffing risks and calm disclosure of alternatives: Malhotra & Bazerman, Negotiation Genius (2007); Getting to Yes. Fictional examples.',
};

export default lesson;
