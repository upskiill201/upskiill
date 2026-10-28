import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 3 · Chapter 5 · Lesson 17 — story choice: Clinton's first big "no" as a PM, to a friend. */
const lesson: OriginalLesson = {
  key: 'l17',
  title: 'Saying no to a friend',
  summary: 'Month two as APM. The support lead, who helped Clinton more than anyone, asks for a big new feature: live chat with drivers. It\'s a good idea. It\'s not this quarter\'s priority. Clinton has to say no, to a friend.',
  minutes: 11,
  outcomes: ['Say no to a good idea from someone you like', 'Explain priorities with evidence', 'Offer what you can do now'],
  learn: [
    {
      kind: 'story',
      title: 'The request',
      beats: [
        { speaker: 'narrator', text: 'Month two, APM. The support lead pulls up a chair. "Live chat with drivers. It would save us hours. You of all people get it."' },
        { speaker: 'clinton', text: '(to himself) It\'s a good idea. It\'s not on the plan. And she\'s the reason I\'m here.' },
        { speaker: 'tey', text: 'Saying no to good ideas is a big part of product work, and the gap Clinton named in his interview. Doing it kindly, with reasons and an alternative, keeps the relationship.' },
      ],
      choice: {
        prompt: 'What should Clinton do?',
        options: [
          {
            text: 'Thank her, explain this quarter\'s priority with the data, offer a smaller fix now, and add live chat to the next planning review.',
            outcome: 'She\'s disappointed for a minute. Then: "A one-tap \'sync failed\' message for drivers would honestly cover half of it." They ship that in three weeks.',
            best: true,
          },
          {
            text: 'Say yes, because she\'s his friend.',
            outcome: 'Live chat pushes the quarter\'s main goal back by a month. Aïcha asks why. Clinton has no good answer.',
          },
          {
            text: 'Avoid her until she stops asking.',
            outcome: 'She feels ignored by someone she helped. The relationship cools, and support stops sharing ideas.',
          },
        ],
      },
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Saying no kindly: thank them, explain the priority with evidence, offer something now, and say when it will be reconsidered.',
    },
  ],
  apply: {
    scenario: 'The support lead\'s request.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why is saying no hard here?',
        options: [
          { text: 'It\'s a bad idea', why: 'It\'s a good idea; that\'s why it\'s hard.' },
          { text: 'It\'s a good idea from someone he likes and owes' },
          { text: 'It isn\'t hard', why: 'It\'s a friend.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Put Clinton\'s "no" in order.',
        lines: ['Thank her for the idea', 'Explain the quarter\'s priority with data', 'Offer a smaller fix now', 'Say when it will be reconsidered'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Kind no, or not?',
        groups: ['Kind no', 'Not kind'],
        items: [
          { text: 'Thank you, this would really help support', group: 0 },
          { text: 'Avoiding her', group: 1 },
          { text: 'Here\'s what we can do now', group: 0 },
          { text: 'Not my problem', group: 1 },
          { text: 'It\'s on the next planning review', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick Clinton\'s reply to the support lead.',
        from: 'clinton',
        message: 'What do I say to her?',
        options: [
          { text: '"Sure, we\'ll build it." (it\'s not the priority)', why: 'Kind no with an alternative.' },
          { text: '"No." (and walks off)', why: 'Explain and offer something.' },
          { text: '"Thank you, this would really help. This quarter we\'re focused on failed confirmations. Could a one-tap \'sync failed\' message help now? And live chat goes to next planning."' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that damages the relationship.',
        lines: ['Thank you for the idea.', 'Support always asks for too much.', 'Here\'s what we can do now.'],
        bug: 1,
        explanation: 'Dismissive. Respect the idea and the person.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each choice to its result.',
        pairs: [
          ['Kind no with alternative', 'A smaller fix shipped in three weeks'],
          ['Yes to a friend', 'Main goal delayed a month'],
          ['Avoid her', 'Support stops sharing ideas'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'What did the smaller fix cover?',
        options: [
          { text: 'About half of what live chat would have solved' },
          { text: 'Nothing', why: 'About half.' },
          { text: 'Everything', why: 'About half.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the rule.',
        template: 'Explain the [[1]]. Offer something [[2]].',
        blanks: [['priority'], ['now']],
        distractors: ['excuse', 'never', 'later'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many weeks did the smaller fix take? (a number)',
        answers: ['3', 'three'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Keeps the relationship, or not?',
        groups: ['Keeps it', 'Hurts it'],
        items: [
          { text: 'Reconsidering it next quarter', group: 0 },
          { text: 'Ignoring her messages', group: 1 },
          { text: 'Building the smaller fix together', group: 0 },
          { text: 'Blaming Aïcha', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'When did you last have to say no to someone you like? How could you have said it more kindly, or more clearly?',
    starters: ['I had to say no to...', 'I could have...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Write a four-part "kind no" you could use: thanks, priority, something now, when it will be reconsidered.',
  },
  notes: 'Builds on "Saying not now" (Ch2 l08) from the product side; Aïcha\'s "half my time is saying no" (Ch4 l08).',
};

export default lesson;
