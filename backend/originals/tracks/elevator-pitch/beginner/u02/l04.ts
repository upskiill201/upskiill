import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 4. Before/After: job title vs the problem you solve. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Job title vs the problem you solve',
  summary: 'Arjun replays Ada\'s three mixer answers, then shows her what three other finalists said. Same kinds of jobs. Very different conversations.',
  minutes: 11,
  outcomes: [
    'Swap a job title for the problem you solve',
    'Make your intro specific enough to remember',
    'Keep it true, without exaggerating',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Ada at the mixer vs Ada now',
      before: {
        label: 'Job title',
        text: '"I\'m just a junior designer. At a fintech. It\'s not very exciting."',
      },
      after: {
        label: 'Problem solved',
        text: '"I make money apps simple enough that people actually use them. I even built one that ended the arguments in my office\'s savings group."',
      },
      notes: [
        'A title says what you ARE. A problem says what you DO for people.',
        '"Ended the arguments" is specific and memorable.',
        'Every word is true. Nothing is exaggerated.',
      ],
    },
    {
      kind: 'text',
      html: "<p><strong>Three more examples from the mixer:</strong></p><ul><li>\"I'm an accountant\" → \"I help small businesses stop panicking at tax time.\"</li><li>\"I'm a software engineer\" → \"I make sure hospital booking systems don't crash on Monday mornings.\"</li><li>\"I'm a student\" → \"I'm studying engineering, and I'm building a solar charger for my village's market stalls.\"</li></ul><p><strong>Then let them ask.</strong> After \"I help small businesses stop panicking at tax time\", the obvious question is \"How?\", and now you're in a conversation.</p>",
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Say the problem you solve, not your title. Make it specific, keep it true, and let them ask "How?"',
    },
  ],
  apply: {
    scenario: 'Arjun\'s mixer replay.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What\'s the difference between a title and a problem solved?',
        options: [
          { text: 'Titles are more honest', why: 'Both can be honest. One is more interesting.' },
          { text: 'A title says what you are; a problem solved says what you do for people' },
          { text: 'There\'s no difference', why: 'There\'s a big one.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the title to its "problem solved" version.',
        pairs: [
          ['Accountant', 'I help small businesses stop panicking at tax time'],
          ['Software engineer', 'I keep hospital bookings from crashing'],
          ['Student', 'I\'m building a solar charger for market stalls'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Title, or problem solved?',
        groups: ['Title', 'Problem solved'],
        items: [
          { text: 'I\'m a junior designer', group: 0 },
          { text: 'I make money apps people actually use', group: 1 },
          { text: 'I\'m an HR officer', group: 0 },
          { text: 'I help new staff feel at home in their first week', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'Is "I make money apps people actually use" exaggerating? I\'m only junior.',
        prompt: 'What does Arjun say?',
        options: [
          { text: 'Yes, say "I run a fintech" instead.', why: 'That WOULD be exaggerating.' },
          { text: 'Add "junior" to every sentence.', why: 'That\'s the "just" problem again.' },
          { text: 'It\'s true: you design them, and you built one people use. Specific and true isn\'t exaggerating.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'After a good "problem solved" line, the obvious next question is "___?" (one word)',
        answers: ['how', 'How'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Which intro is most memorable?',
        options: [
          { text: '"I make sure hospital booking systems don\'t crash on Monday mornings."' },
          { text: '"I work in tech."', why: 'Too broad.' },
          { text: '"I\'m a software engineer level 2."', why: 'A rank, not a problem.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'A finalist\'s intro. Which line goes too far?',
        lines: [
          'I help farmers sell directly to restaurants.',
          'Forty farmers use it so far.',
          'Basically I\'m revolutionising all of African agriculture.',
        ],
        bug: 2,
        fix: 'They earn about a third more per crate.',
        explanation: 'Specific and true beats a giant claim nobody can believe.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put Ada\'s new intro in order.',
        lines: ['I make money apps simple enough that people use them.', 'I built one that ended the arguments in my office\'s savings group.', 'What about you?'],
      },
      {
        kind: 'fillBlank',
        prompt: 'An accountant\'s intro.',
        template: 'I help small [[1]] stop [[2]] at [[3]] time.',
        blanks: [['businesses', 'shops'], ['panicking', 'worrying'], ['tax']],
        distractors: ['accountant', 'level'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Ada\'s first line.',
        tiles: ['I', 'make', 'money', 'apps', 'people', 'actually', 'use.'],
        distractors: ['just'],
      },
    ],
  },
  reflect: {
    prompt: 'Write your job title, or what you study. Then rewrite it as the problem you solve for people.',
    starters: ['My title: ...', 'The problem I solve: ...'],
  },
  deepen: {
    title: 'Ask a colleague',
    summary: 'Ask a colleague, classmate or friend: "What do you think I\'m best at helping people with?" Their answer is often a better intro than your title.',
  },
  notes: 'Problem-solved framing vs job titles is standard networking and personal-branding advice. All examples are fictional.',
};

export default lesson;
