import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 6. Side by side: influence vs manipulation (Cialdini on ethical influence). */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'Influence, not manipulation',
  summary: 'A Sales manager, Mr Ouma, is impressed. He corners Remi: "Teach me your tricks. How do I get Finance to do what I want?" Remi realises his six weeks could be told two ways. Tey puts them side by side.',
  minutes: 11,
  outcomes: [
    'Tell ethical influence from manipulation',
    'Use one simple test before you try to persuade anyone',
    'Know why manipulation fails even when it "works"',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'The same six weeks, two ways',
      before: { label: 'Manipulation', text: 'Flatter Wanjiku so she drops her guard. Do Felix a favour so he "owes" you. Tell Pauline and Wanjiku different things before the meeting. Hint that Kamau will be angry if Finance says no.' },
      after: { label: 'Influence', text: 'Find Wanjiku\'s real interest and protect it. Help Felix with no strings. Tell everyone the same proposal. Lead with what Finance actually gets. Credit everyone honestly.' },
      notes: [
        'The tools look similar. The intent and honesty are opposite.',
        'Manipulation hides what you\'re doing. Influence would survive being seen.',
        'Manipulation can win once. Influence wins the next six projects too.',
      ],
    },
    {
      kind: 'text',
      html: "<p>Robert Cialdini, whose research on persuasion is used everywhere from sales to public health, draws a clear line. Ethical influence uses principles like reciprocity and consistency <strong>truthfully</strong> and where they genuinely fit. Manipulation fakes them: invented deadlines, fake scarcity, favours given only to create debt. He argues the dishonest version often backfires once people find out, and they usually do.</p><p>A simple test before you persuade anyone: <strong>would I be comfortable if they knew exactly what I was doing, and why?</strong> If yes, it's influence. If you'd need to hide it, it isn't.</p>",
    },
    {
      kind: 'check',
      question: 'What\'s the simple test for ethical influence?',
      options: ['Would I be comfortable if they knew exactly what I was doing?', 'Will it work?', 'Is it legal?'],
      answer: 0,
      explanation: 'Influence survives being seen. Manipulation needs to stay hidden.',
    },
  ],
  apply: {
    scenario: 'Mr Ouma wants "the tricks".',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Influence or manipulation?',
        groups: ['Influence', 'Manipulation'],
        items: [
          { text: 'Help with no strings', group: 0 },
          { text: 'A favour to create a debt', group: 1 },
          { text: 'The same proposal to everyone', group: 0 },
          { text: 'A fake deadline to rush them', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What does Cialdini say about dishonest persuasion?',
        options: [
          { text: 'It often backfires once people find out' },
          { text: 'It\'s the most effective kind', why: 'Short-term at best.' },
          { text: 'Nobody ever finds out', why: 'They usually do.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'remi',
        message: '"Teach me your tricks. How do I get Finance to do what I want?"',
        prompt: 'Remi\'s best answer to Mr Ouma?',
        options: [
          { text: 'Flatter them first, then ask.', why: 'That\'s the manipulation version.' },
          { text: 'Tell them Kamau wants it.', why: 'Borrowed authority. It cost Remi in Week 5.' },
          { text: 'No tricks, honestly. I asked Wanjiku what she was worried about, then built the plan around it. Want to know what Finance worries about?' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Influence would survive being ___; manipulation needs to stay hidden. (one word)',
        answers: ['seen', 'Seen', 'known', 'noticed'],
        placeholder: 'One word',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the honest tool to its fake version.',
        pairs: [
          ['Giving first, no strings', 'A favour to create a debt'],
          ['A real deadline', 'An invented deadline'],
          ['Specific, true credit', 'Flattery to lower guards'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why does influence beat manipulation over time?',
        options: [
          { text: 'It\'s faster', why: 'Often slower. It lasts.' },
          { text: 'It doesn\'t; they\'re the same', why: 'The intent and honesty are opposite.' },
          { text: 'Trust grows with influence; manipulation spends it once' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Mr Ouma\'s plan. Which line fails the test?',
        lines: [
          'Ask Finance what they\'re worried about.',
          'Tell them the discount offer ends today (it doesn\'t).',
          'Show them what Sales\' plan saves Finance.',
        ],
        bug: 1,
        fix: 'Tell them the real date the offer ends.',
        explanation: 'A fake deadline is manipulation, and they\'ll find out.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put ethical persuasion in order.',
        lines: ['Understand what they care about', 'Offer something real', 'Be honest about the ask', 'Check: would I be fine if they knew?'],
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'Use the principles [[1]], where they genuinely [[2]].',
        blanks: [['truthfully', 'honestly'], ['fit', 'apply']],
        distractors: ['secretly', 'fail'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Remi\'s answer.',
        tiles: ['No', 'tricks,', 'honestly.'],
        distractors: ['Secrets.'],
      },
    ],
  },
  reflect: {
    prompt: 'Think of a time someone tried to persuade you with a trick: a fake deadline, flattery, a favour with strings. How did you feel when you noticed?',
    starters: ['They tried...', 'When I noticed, I...'],
  },
  deepen: {
    title: 'The test',
    summary: 'Before your next attempt to persuade someone, ask yourself: "Would I be comfortable if they knew exactly what I\'m doing and why?" If not, change the approach.',
  },
  notes: 'Robert B. Cialdini, Influence (new and expanded ed., 2021) and Pre-Suasion (2016): ethical use of influence principles (truthful, naturally present) vs manipulation; long-term costs of deception. The "comfortable if they knew" test is a common ethics heuristic (publicity test). Mr Ouma is a narrated named extra.',
};

export default lesson;
