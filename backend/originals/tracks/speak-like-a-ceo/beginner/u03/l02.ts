import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 2. Step-by-step: find your one message. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'Find your one message',
  summary: 'Lucía spends an evening finding her message. Four steps take her from "chili-lime did well" to a sentence people will repeat.',
  minutes: 12,
  outcomes: [
    'Turn a topic into a message',
    'Test a message for the audience',
    'Write it in one sentence',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'Four steps to one message',
      steps: [
        { title: '1. Write the topic', body: '"The chili-lime launch." A topic is what the talk is about. It isn\'t a message yet.' },
        { title: '2. Ask "what about it?"', body: '"It was our best launch in three years." Better, but why should 300 people care?' },
        { title: '3. Ask "so what for them?"', body: 'Most of the audience aren\'t in marketing. What can they use? "It worked because we listened to the shop owners who sell our chips."' },
        { title: '4. Make it short enough to repeat', body: '"We listened, and it worked. Let\'s keep listening." If someone could repeat it at dinner, it\'s ready.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Topic, then "what about it?", then "so what for them?", then short enough to repeat.',
    },
  ],
  apply: {
    scenario: 'One message.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the four steps.',
        lines: ['Write the topic', 'Ask "what about it?"', 'Ask "so what for them?"', 'Make it short enough to repeat'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Topic or message?',
        groups: ['Topic', 'Message'],
        items: [
          { text: '"The chili-lime launch"', group: 0 },
          { text: '"We listened, and it worked."', group: 1 },
          { text: '"Q3 results"', group: 0 },
          { text: '"Small tests saved us money."', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why ask "so what for them?"',
        options: [
          { text: 'To make it longer', why: 'To make it useful to them.' },
          { text: 'To impress Carmen', why: 'To make it useful to them.' },
          { text: 'Most of the audience aren\'t in marketing' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the step to Lucía\'s answer.',
        pairs: [
          ['Topic', '"The chili-lime launch"'],
          ['What about it?', '"Our best launch in three years"'],
          ['So what for them?', '"It worked because we listened"'],
          ['Short to repeat', '"We listened. Let\'s keep listening."'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'tomas',
        message: 'Isn\'t "we listened" too simple for a big talk?',
        prompt: "Lucía\'s best reply?",
        options: [
          { text: 'You\'re right, make it complex.', why: 'Simple is memorable.' },
          { text: 'Simple is the point. 300 people will remember one simple line. The talk shows the evidence behind it.' },
          { text: 'Add three more messages.', why: 'One message.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'The test.',
        template: 'If someone could [[1]] it at [[2]], it\'s ready.',
        blanks: [['repeat'], ['dinner']],
        distractors: ['forget', 'midnight'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many people will hear the talk?',
        answers: ['300', 'three hundred'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Who did Nopal listen to?',
        options: [
          { text: 'Only the agency', why: 'The shop owners.' },
          { text: 'Nobody', why: 'The shop owners.' },
          { text: 'The shop owners who sell the chips' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Which of these is still a topic, not a message?',
        lines: [
          'We listened, and it worked.',
          'Small tests save big money.',
          'An overview of summer marketing activities.',
          'Shop owners know our buyers best.',
        ],
        bug: 2,
        fix: 'Shop owners helped us win the summer.',
        explanation: 'An "overview" doesn\'t say anything.',
      },
      {
        kind: 'sortGroups',
        prompt: 'Short enough to repeat, or too long?',
        groups: ['Repeatable', 'Too long'],
        items: [
          { text: '"We listened. Let\'s keep listening."', group: 0 },
          { text: '"Our integrated, insight-led approach to channel partners..."', group: 1 },
          { text: '"Test small, then go big."', group: 0 },
          { text: '"A summary of learnings across several workstreams..."', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Take the topic of your next talk or update. Run it through the four steps.',
    starters: ['Topic:...', 'Message:...'],
  },
  deepen: {
    title: 'Messages travel',
    summary: 'A good message gets repeated by people who weren\'t in the room. That\'s the real test of a big talk: what people say about it the next day.',
  },
  notes: 'Topic vs message: common presentation-coaching distinction. Fictional message: "We listened, and it worked. Let\'s keep listening."',
};

export default lesson;
