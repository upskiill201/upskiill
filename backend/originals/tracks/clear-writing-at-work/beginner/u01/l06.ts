import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 6. Chat with Tey: why we over-write. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'Why we over-write',
  summary: 'Zanele knows short is better. So why does every draft come out at 900 words? Tey helps her name the three reasons most people over-write, and what to do about each.',
  minutes: 12,
  outcomes: [
    'Recognise why you over-write',
    'Separate thinking drafts from sending drafts',
    'Write confidently in a second or third language',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Three common reasons people over-write. One: to show effort. Long feels like "I worked hard".', replies: ['That\'s me.'] },
        { tey: 'Two: fear. Every extra sentence is a shield against "you didn\'t mention X". Three: we write to think. The first draft is you working out what you mean.', replies: ['So what do I do?'] },
        { tey: 'Use two drafts. Draft one is for you: write everything. Draft two is for them: pull out the point and cut the rest. Most people send draft one.', replies: ['And writing in my third language?'] },
        { tey: 'That\'s an advantage here. Short, common words and short sentences are easier to write well in any language, and easier for everyone to read, including Emeka in Lagos.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Draft one is for you. Draft two is for them. Never send draft one.',
    },
  ],
  apply: {
    scenario: 'Why we over-write.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match the reason for over-writing to the fix.',
        pairs: [
          ['To show effort', 'Let the result show the effort'],
          ['Fear of missing something', 'Put extras in the attachment'],
          ['Writing to think', 'Use a second draft for the reader'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What is "draft one" for?',
        options: [
          { text: 'You, to work out what you mean' },
          { text: 'Sending straight away', why: 'That\'s the mistake.' },
          { text: 'Your manager to fix', why: 'You fix it in draft two.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Draft one or draft two?',
        groups: ['Draft one', 'Draft two'],
        items: [
          { text: 'Everything you know, in any order', group: 0 },
          { text: 'The point first, short', group: 1 },
          { text: 'Thinking out loud on the page', group: 0 },
          { text: 'Ready to send', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'zanele',
        message: 'In my third language, short sentences feel too simple. Like a child wrote them.',
        prompt: "Tey's best reply?",
        options: [
          { text: 'Simple isn\'t childish. Mr Kamau writes in short sentences. Clear is what senior people sound like.' },
          { text: 'Then use longer words.', why: 'That makes it harder to read.' },
          { text: 'Ask someone else to write it.', why: 'She can write it clearly.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The two drafts.',
        template: 'Draft one is for [[1]]. Draft two is for [[2]].',
        blanks: [['you', 'me'], ['them', 'the reader']],
        distractors: ['nobody', 'HR'],
      },
      {
        kind: 'mcq',
        prompt: 'Why is short, plain writing helpful for Emeka in Lagos?',
        options: [
          { text: 'Plain words are easier for everyone to read, in any language or accent' },
          { text: 'He can\'t read long words', why: 'It\'s easier for everyone.' },
          { text: 'It isn\'t', why: 'Plain helps all readers.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Zanele\'s writing plan is the old habit?',
        lines: [
          'Write draft one with everything.',
          'Find the point.',
          'Send draft one so nothing is missed.',
          'Cut and send draft two.',
        ],
        bug: 2,
        fix: 'Delete it.',
        explanation: 'Draft one is for her, not the reader.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many common reasons for over-writing does Tey name?',
        answers: ['3', 'three'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Over-writing reason, or good reason to add a line?',
        groups: ['Over-writing', 'Good reason'],
        items: [
          { text: '"To look like I worked hard"', group: 0 },
          { text: '"He needs this to decide"', group: 1 },
          { text: '"Just in case someone asks"', group: 0 },
          { text: '"It\'s the main risk"', group: 1 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Order the two-draft method.',
        lines: ['Write draft one for yourself', 'Find the one point', 'Write draft two for the reader', 'Move extras to an attachment', 'Send draft two'],
      },
    ],
  },
  reflect: {
    prompt: 'Which reason for over-writing is yours: effort, fear or thinking? What will you do about it?',
    starters: ['Mine is...', 'I\'ll...'],
  },
  deepen: {
    title: 'Writing to think',
    summary: 'Many writers say they don\'t know what they think until they\'ve written it. That\'s fine for draft one. The skill is to rewrite it for someone else.',
  },
  notes: 'Over-writing causes and two-draft method: common writing-instruction synthesis. Zanele\'s third language (isiZulu, then Afrikaans, then English) from CAST.md.',
};

export default lesson;
