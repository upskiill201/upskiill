import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 3 · Chapter 2 · Lesson 2 — what "valuable" means at work. Reading. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'What "valuable" means',
  summary: 'Clinton asks Miracle what makes someone valuable on her team. She doesn\'t say "the smartest" or "the hardest working". She describes four things, and none of them is about hours.',
  minutes: 12,
  outcomes: ['Describe four kinds of value at work', 'See which you already offer', 'Pick one to grow'],
  learn: [
    {
      kind: 'reading',
      title: 'Four kinds of value',
      html:
        '<p>Ask experienced managers who they can\'t do without, and the answers tend to fall into four groups:</p>' +
        '<ul><li><strong>Impact on what matters.</strong> Their work moves the team\'s real goals: fewer failed payments, happier customers, money saved. Not just tasks completed.</li>' +
        '<li><strong>Reliability.</strong> They do what they said, when they said, and say early when they can\'t. Managers stop worrying about their work.</li>' +
        '<li><strong>Making others better.</strong> They write the doc everyone uses, review code kindly and well, help new people. The team is faster because they\'re there.</li>' +
        '<li><strong>Rare and useful skills.</strong> Skills that are hard to find and that the business needs, built up over time. The writer Cal Newport calls this "career capital" in his book <em>So Good They Can\'t Ignore You</em> (2012).</li></ul>' +
        '<p>Notice what\'s missing: hours worked, looking busy, being the loudest. Those can feel like value, but they rarely are.</p>' +
        '<p>Most people early in their careers start with <strong>reliability</strong> and <strong>making others better</strong>, because those don\'t need years of experience. Impact and rare skills grow from there.</p>',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Impact, reliability, making others better, rare skills. Start with the two you can do from day one.',
    },
  ],
  apply: {
    scenario: 'Miracle explains value.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Which kind of value?',
        groups: ['Reliability', 'Making others better'],
        items: [
          { text: 'Does what he said, when he said', group: 0 },
          { text: 'Writes the doc everyone uses', group: 1 },
          { text: 'Says early when he can\'t deliver', group: 0 },
          { text: 'Helps new people get started', group: 1 },
          { text: 'Reviews code kindly and well', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Which isn\'t one of the four kinds of value?',
        options: [
          { text: 'Reliability', why: 'That\'s one of the four.' },
          { text: 'Working the most hours' },
          { text: 'Making others better', why: 'That\'s one of the four.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each kind of value to an example.',
        pairs: [
          ['Impact', 'Failed confirmations down 20%'],
          ['Making others better', 'The onboarding notes doc'],
          ['Rare skills', 'Deep knowledge of offline sync'],
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'I\'m only three months in. Can I really be valuable yet?',
        options: [
          { text: 'No, wait five years.', why: 'Two kinds start on day one.' },
          { text: 'Only if I work 80 hours.', why: 'Hours aren\'t on the list.' },
          { text: 'Yes: reliability and making others better work from day one. Impact and rare skills grow.' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the thing that feels like value but usually isn\'t.',
        lines: ['Shipping a fix that cuts support calls.', 'Being the loudest in every meeting.', 'Writing a clear guide for the team.'],
        bug: 1,
        explanation: 'Loud isn\'t the same as valuable.',
      },
      {
        kind: 'mcq',
        prompt: 'What does Cal Newport call rare and valuable skills?',
        options: [
          { text: 'Career capital' },
          { text: 'Career luck', why: 'Career capital.' },
          { text: 'Soft power', why: 'Career capital.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which two kinds of value can Clinton offer right now?',
        options: [
          { text: 'Only rare skills', why: 'Those take time.' },
          { text: 'None yet', why: 'Two work from day one.' },
          { text: 'Reliability and making others better' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the four kinds.',
        template: 'Impact, [[1]], making others [[2]], rare skills.',
        blanks: [['reliability'], ['better']],
        distractors: ['hours', 'louder', 'busy'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'In what year was So Good They Can\'t Ignore You published? (a number)',
        answers: ['2012'],
        placeholder: 'A year',
      },
      {
        kind: 'sortGroups',
        prompt: 'Real value, or just feels like it?',
        groups: ['Real value', 'Just feels like it'],
        items: [
          { text: 'Fewer failed payments', group: 0 },
          { text: 'Looking busy', group: 1 },
          { text: 'Saying early when you\'re late', group: 0 },
          { text: 'Long hours', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Which of the four kinds of value do you already offer? Which one do you want to grow?',
    starters: ['I already offer...', 'I want to grow...'],
  },
  deepen: {
    title: 'Read more',
    summary: 'Look up "career capital" by Cal Newport. Write down one rare, useful skill you could build over the next year.',
  },
  notes: 'Newport, C. (2012). So Good They Can\'t Ignore You. Grand Central. The four-way grouping is a Teyro synthesis of common management advice, not a study.',
};

export default lesson;
