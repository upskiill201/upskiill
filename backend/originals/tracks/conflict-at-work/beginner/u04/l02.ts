import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 2. Reading: your three triggers. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'Your three triggers',
  summary: 'Why did "just opinions" hurt so much? Priya sends Grace a chapter from Thanks for the Feedback: three different things in us that criticism can trigger, and why it helps to know which one fired.',
  minutes: 12,
  outcomes: [
    'Name the three feedback triggers',
    'Recognise which trigger is firing in you',
    'Use that to respond more calmly',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'Truth, relationship, identity',
      html: '<p>In <em>Thanks for the Feedback</em> (2014), Douglas Stone and Sheila Heen describe three triggers that make criticism hard to hear:</p><ul><li><strong>Truth trigger:</strong> "That\'s wrong." The content seems inaccurate. Grace: "It\'s not just opinions; I watched them fail."</li><li><strong>Relationship trigger:</strong> "Who are you to say that?" It\'s about the person giving it, or how they gave it. Grace: "He\'s been here a week, and he said it in front of everyone."</li><li><strong>Identity trigger:</strong> "This means I\'m not good enough." It shakes how you see yourself. Grace: "Maybe I\'m not a real researcher. Maybe I\'m just a nurse."</li></ul><p>All three fired at once for Grace. That\'s why she felt like fighting and hiding at the same time.</p><p>Naming the trigger helps. Then you can deal with each separately: <strong>check the truth</strong> (is any of it right?), <strong>address the relationship</strong> later and privately (how it was said), and <strong>steady your identity</strong> (one comment doesn\'t erase 18 years).</p>',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Truth, relationship, identity. Name the trigger, then deal with each separately.',
    },
  ],
  apply: {
    scenario: 'Grace\'s triggers.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Which trigger is this thought?',
        groups: ['Truth', 'Relationship', 'Identity'],
        items: [
          { text: '"It\'s not just opinions; I watched them fail."', group: 0 },
          { text: '"He\'s been here a week."', group: 1 },
          { text: '"Maybe I\'m not a real researcher."', group: 2 },
          { text: '"He said it in front of everyone."', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Who wrote Thanks for the Feedback?',
        options: [
          { text: 'Douglas Stone and Sheila Heen' },
          { text: 'Fisher and Ury', why: 'They wrote Getting to Yes.' },
          { text: 'Thomas and Kilmann', why: 'They created the conflict-modes model.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the trigger to how to deal with it.',
        pairs: [
          ['Truth', 'Check if any of it is right'],
          ['Relationship', 'Address how it was said, privately'],
          ['Identity', 'Steady your sense of yourself'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'grace',
        message: 'Maybe he\'s right. Maybe I\'m just a nurse pretending.',
        prompt: "Priya's best reply?",
        options: [
          { text: 'That\'s your identity trigger talking. One comment about sample size doesn\'t erase your skill. Let\'s check the truth part separately.' },
          { text: 'Yes, maybe.', why: 'It feeds the identity trigger.' },
          { text: 'Ignore everything he said.', why: 'There may be a fair point to check.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The three triggers.',
        template: 'Truth, [[1]], [[2]].',
        blanks: [['relationship'], ['identity']],
        distractors: ['money', 'weather'],
      },
      {
        kind: 'mcq',
        prompt: 'Why did Grace want to fight and hide at the same time?',
        options: [
          { text: 'All three triggers fired at once' },
          { text: 'She was tired', why: 'Several triggers pulled different ways.' },
          { text: 'She agreed with him', why: 'Partly, which made it harder.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'In which year was Thanks for the Feedback published?',
        answers: ['2014'],
        placeholder: 'A year',
      },
      {
        kind: 'findBug',
        prompt: 'Which line mixes up the triggers?',
        lines: [
          'Truth: is six enough? I\'ll check.',
          'Relationship: he said it in public. I\'ll raise that privately.',
          'Identity: he\'s new, so his point must be wrong.',
          'Identity: one comment doesn\'t erase 18 years.',
        ],
        bug: 2,
        fix: 'Relationship: he\'s new, but his point might still be right.',
        explanation: 'That\'s a relationship trigger used to dismiss the truth question.',
      },
      {
        kind: 'sortGroups',
        prompt: 'Dealing with the trigger well, or badly?',
        groups: ['Well', 'Badly'],
        items: [
          { text: 'Checking the sample-size point', group: 0 },
          { text: 'Deciding he\'s an idiot so nothing counts', group: 1 },
          { text: 'Raising the public delivery later, privately', group: 0 },
          { text: 'Quitting research', group: 1 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Order how to handle a triggered moment.',
        lines: ['Notice the sting', 'Name the trigger', 'Check the truth', 'Address the relationship privately', 'Steady your identity'],
      },
    ],
  },
  reflect: {
    prompt: 'Think of criticism you struggled with. Which trigger fired: truth, relationship or identity?',
    starters: ['The trigger was...', 'Because...'],
  },
  deepen: {
    title: 'Switchtracking',
    summary: 'Stone and Heen warn about "switchtracking": answering a truth point with a relationship complaint ("Who are you to say that?"). Then two conversations happen at once, and neither gets solved.',
  },
  notes: 'Stone & Heen, Thanks for the Feedback: The Science and Art of Receiving Feedback Well (2014): truth, relationship and identity triggers; switchtracking.',
};

export default lesson;
