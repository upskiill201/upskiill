import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 4. Myth or Fact: questions and rhymes (McGlone & Tofighbakhsh 2000 rhyme-as-reason; question pitch). */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Questions and rhymes',
  summary: 'Ada wants to end her pitch with a rhyme. Arjun thinks rhymes are cheesy. Ada thinks questions are lazy. Tey settles it with research.',
  minutes: 11,
  outcomes: [
    'Know what research says about rhymes and memory',
    'Use a question to get listeners thinking',
    'Avoid the traps: cheesy rhymes, fake questions',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        { text: 'Rhymes are just decoration; they don\'t change how people judge a message.', isFact: false, explain: 'Myth. In a 2000 study, people rated rhyming sayings ("Woes unite foes") as more accurate than the same idea without a rhyme ("Woes unite enemies"). Researchers call it the rhyme-as-reason effect.' },
        { text: 'Rhymes tend to be easier to process and remember.', isFact: true, explain: 'Fact. One explanation for the effect is that rhymes are easy for the brain to process, and easy often feels true. That\'s why so many slogans rhyme.' },
        { text: 'The rhyme effect always works, no matter what.', isFact: false, explain: 'Myth. When people in a follow-up were told to judge only the meaning, the rhyme advantage largely disappeared. A rhyme helps a good message land; it can\'t rescue a bad one.' },
        { text: 'A good question can make people persuade themselves.', isFact: true, explain: 'Fact. A question like "Have you ever been in a group where someone swore they\'d paid?" makes listeners remember their own example, which is often more convincing than yours.' },
        { text: 'Any question works as an opener.', isFact: false, explain: 'Myth. "Did you know money is important?" is a fake question. Good questions connect to something your listener has actually experienced.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'A rhyme can make a true line stick. A good question lets them find their own reason. Use one of each, not ten.',
    },
  ],
  apply: {
    scenario: 'Myth or fact: rhymes and questions.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What did the 2000 rhyme study find?',
        options: [
          { text: 'Rhymes made people trust messages less', why: 'The opposite.' },
          { text: 'People rated rhyming sayings as more accurate than non-rhyming ones with the same meaning' },
          { text: 'Rhymes made no difference', why: 'They made a measurable difference.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Myth', 'Fact'],
        items: [
          { text: 'Rhymes are only decoration', group: 0 },
          { text: 'Rhymes are easier to process', group: 1 },
          { text: 'Any question works as an opener', group: 0 },
          { text: 'Questions can make people persuade themselves', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'Can I make my WHOLE pitch rhyme? Like a song?',
        prompt: 'What does Tey say?',
        options: [
          { text: 'Yes, rap it.', why: 'Fun at a party. Risky on stage.' },
          { text: 'Never rhyme.', why: 'One good rhyme helps.' },
          { text: 'One rhyming line people can repeat is powerful. A whole rhyming pitch sounds like a jingle.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'The effect where rhymes seem more true: rhyme-as-___. (one word)',
        answers: ['reason'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Which is a GOOD question opener for Ada?',
        options: [
          { text: '"Have you ever been in a group where someone swore they\'d already paid?"' },
          { text: '"Did you know money is important?"', why: 'A fake question with an obvious answer.' },
          { text: '"Do you like apps?"', why: 'Too vague to connect to anything.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Put a question opener in order.',
        lines: ['Ask a question they\'ve lived', 'Pause so they can remember their own example', 'Then give your answer'],
      },
      {
        kind: 'findBug',
        prompt: 'Ada\'s closing lines. Which one should go?',
        lines: [
          'No more fights about who\'s paid.',
          'Every naira, every trade.',
          'Buy my app today, hooray, hip hip hooray, it\'s here to stay!',
        ],
        bug: 2,
        fix: 'Delete it. One rhyme is enough.',
        explanation: 'One rhyme sticks. A pile of rhymes sounds like a jingle.',
      },
      {
        kind: 'mcq',
        prompt: 'Why did the rhyme advantage shrink when people were told to judge only meaning?',
        options: [
          { text: 'Rhymes stopped rhyming', why: 'They still rhymed.' },
          { text: 'Rhyme helps a message feel true, but careful thinking looks past it' },
          { text: 'People didn\'t understand the sayings', why: 'They understood.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Review: match the pitch type.',
        pairs: [
          ['"Peace."', 'One-word pitch'],
          ['"Once upon a time..."', 'Pixar pitch'],
          ['"No more fights about who\'s paid"', 'Rhyming pitch'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Ada\'s rhyme.',
        template: 'No more [[1]] about who\'s [[2]]. Every naira, every [[3]].',
        blanks: [['fights', 'arguments'], ['paid'], ['trade']],
        distractors: ['database', 'saved'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Ada\'s question opener.',
        tiles: ['Has', 'anyone', 'here', 'ever', 'sworn', 'they', 'already', 'paid?'],
        distractors: ['database'],
      },
    ],
  },
  reflect: {
    prompt: 'Write one rhyming line and one question opener for your pitch. Which feels more like you?',
    starters: ['Rhyme: ...', 'Question: ...'],
  },
  deepen: {
    title: 'Find the rhyme',
    summary: 'Use a free rhyming dictionary to find one rhyming line that sums up your pitch. Say it to a friend a day later and see if they remember it.',
  },
  notes: 'McGlone & Tofighbakhsh (2000), Psychological Science 11(5): rhyming aphorisms judged more accurate ("Woes unite foes" vs "Woes unite enemies"); effect reduced when participants were cautioned to judge meaning only. Processing-fluency explanation stated as "one explanation". Question pitch: Pink (2012).',
};

export default lesson;
