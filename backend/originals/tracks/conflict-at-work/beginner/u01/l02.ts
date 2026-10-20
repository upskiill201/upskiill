import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 2. Explain cards: five ways people handle conflict. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'Five ways people handle conflict',
  summary: 'Priya shares a model she learned on a management course: five ways people handle conflict. Each has its moment. Grace realises she uses only one of them at work.',
  minutes: 12,
  outcomes: [
    'Name the five conflict modes',
    'Know when each one fits',
    'Spot your own default',
  ],
  learn: [
    {
      kind: 'text',
      html: '<p>Kenneth Thomas and Ralph Kilmann described five ways people handle conflict, based on two questions: how much do I push for my own concerns, and how much do I care about theirs?</p><table><tr><th>Mode</th><th>What it looks like</th><th>When it fits</th></tr><tr><td><strong>Competing</strong></td><td>"We do it my way."</td><td>Emergencies, safety, clear rules</td></tr><tr><td><strong>Collaborating</strong></td><td>"Let\'s find a way that works for both of us."</td><td>Important issues and important relationships</td></tr><tr><td><strong>Compromising</strong></td><td>"Let\'s each give a bit."</td><td>Time is short and both sides are equal</td></tr><tr><td><strong>Avoiding</strong></td><td>"Let\'s not deal with this."</td><td>Trivial issues, or to cool down briefly</td></tr><tr><td><strong>Accommodating</strong></td><td>"OK, your way."</td><td>It matters more to them than to you</td></tr></table><p>On the ward, Grace competed when a patient was in danger and collaborated with families. At Kinwell she <strong>avoids</strong> almost everything. Avoiding is fine for small things, but step 3 isn\'t small: patients can\'t book.</p>',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Competing, collaborating, compromising, avoiding, accommodating. No mode is always right; using only one is the problem.',
    },
  ],
  apply: {
    scenario: 'Five modes.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match the mode to what it sounds like.',
        pairs: [
          ['Competing', '"We do it my way."'],
          ['Collaborating', '"Let\'s find a way for both of us."'],
          ['Compromising', '"Let\'s each give a bit."'],
          ['Avoiding', '"Let\'s not deal with this."'],
          ['Accommodating', '"OK, your way."'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Which mode does Grace use most at Kinwell?',
        options: [
          { text: 'Avoiding' },
          { text: 'Competing', why: 'That\'s how she handled emergencies on the ward.' },
          { text: 'Collaborating', why: 'That\'s what she needs to do more.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which mode fits best?',
        groups: ['Competing', 'Collaborating', 'Avoiding'],
        items: [
          { text: 'A fire alarm; everyone must leave now', group: 0 },
          { text: 'Fixing step 3 with Femi', group: 1 },
          { text: 'Which mugs go in which cupboard', group: 2 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'grace',
        message: 'So avoiding is wrong?',
        prompt: "Priya's best reply?",
        options: [
          { text: 'Not always. It\'s fine for small things or to cool down. Step 3 isn\'t small: patients can\'t book.' },
          { text: 'Yes, always wrong.', why: 'It fits trivial issues.' },
          { text: 'It\'s the best mode.', why: 'Not for important issues.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many conflict modes are in the Thomas-Kilmann model?',
        answers: ['5', 'five'],
        placeholder: 'A number',
      },
      {
        kind: 'fillBlank',
        prompt: 'The two questions behind the model.',
        template: 'How much do I push for my own [[1]], and how much do I care about [[2]]?',
        blanks: [['concerns', 'needs'], ['theirs']],
        distractors: ['salary', 'nothing'],
      },
      {
        kind: 'mcq',
        prompt: 'When does accommodating fit?',
        options: [
          { text: 'When the issue matters more to them than to you' },
          { text: 'Always, to be nice', why: 'Always accommodating builds resentment.' },
          { text: 'In emergencies', why: 'That\'s competing.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which line in Grace\'s notes misreads the model?',
        lines: [
          'Competing: right for safety emergencies.',
          'Collaborating: for important issues and relationships.',
          'Avoiding: the best choice for anything uncomfortable.',
          'Compromising: when time is short.',
        ],
        bug: 2,
        fix: 'Avoiding: for trivial issues or a short cool-down.',
        explanation: 'Discomfort isn\'t a reason to avoid an important issue.',
      },
      {
        kind: 'sortGroups',
        prompt: 'Which mode is this?',
        groups: ['Compromising', 'Accommodating'],
        items: [
          { text: '"You pick the meeting time; it doesn\'t matter to me."', group: 1 },
          { text: '"Launch a week late, with half the fix."', group: 0 },
          { text: '"Fine, use your colour scheme."', group: 1 },
          { text: '"We\'ll each cut one feature."', group: 0 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Order how Grace can use the model in a moment of conflict.',
        lines: ['Notice the conflict', 'Notice her default (avoiding)', 'Ask what this situation needs', 'Choose the mode that fits'],
      },
    ],
  },
  reflect: {
    prompt: 'Which mode do you use most at work? At home? Is there one you almost never use?',
    starters: ['At work I mostly...', 'I almost never...'],
  },
  deepen: {
    title: 'The Thomas-Kilmann model',
    summary: 'The Thomas-Kilmann Conflict Mode Instrument (1974) is widely used in workplaces. Its main lesson: people have defaults, and good conflict handlers choose the mode that fits.',
  },
  notes: 'Thomas & Kilmann (1974), Thomas-Kilmann Conflict Mode Instrument: five modes on assertiveness and cooperativeness dimensions. Collaborating is high on both; competing high assertiveness; accommodating high cooperativeness; avoiding low on both; compromising middle.',
};

export default lesson;
