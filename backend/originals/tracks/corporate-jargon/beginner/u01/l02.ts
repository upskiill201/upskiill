import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 2 — free. Myth or Fact opener: real jargon vs made-up phrases, plus myths about jargon itself. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'Real jargon or made up?',
  summary: 'Zanele bets Remi lunch that he can\'t tell real office jargon from phrases she just invented. Some real ones are stranger than the fakes.',
  minutes: 11,
  outcomes: [
    'Tell real office phrases from made-up ones',
    'Decode five strange-but-real phrases',
    'Know the truth about who uses jargon, and why',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        { text: '"Boil the ocean" is real office jargon.', isFact: true, explain: 'Real. It means trying to do something so huge it can\'t be done: "Let\'s not boil the ocean; fix one country first."' },
        { text: '"Let\'s mango the pipeline" is real office jargon.', isFact: false, explain: 'Zanele made that one up. But "pipeline" is real: the list of work or deals coming up next.' },
        { text: '"Let\'s put a pin in it" is real office jargon.', isFact: true, explain: 'Real. It means "let\'s pause this and come back to it later", like pinning a note to a board.' },
        { text: '"Let\'s run it up the flagpole" is real office jargon.', isFact: true, explain: 'Real, if old-fashioned. It means "let\'s test the idea and see how people react".' },
        { text: '"Let\'s pour some tea on the roadmap" is real office jargon.', isFact: false, explain: 'Invented. A "roadmap" is real, though: a plan of what will happen and when.' },
        { text: '"Drink from the firehose" is real office jargon.', isFact: true, explain: 'Real. It means having to take in a huge amount of information very fast. Like Remi\'s first week.' },
      ],
    },
    {
      kind: 'story',
      title: 'Monday, lunchtime',
      beats: [
        { speaker: 'narrator', text: 'The Synergix canteen. Zanele, the other intern, from Johannesburg, puts down her plate of pilau. She set that quiz for Remi.' },
        { speaker: 'zanele', text: 'Okay, confess. How many did you get? I invented "mango the pipeline" this morning in the lift. Lunch is on you if you fell for it.' },
        { speaker: 'remi', text: 'Fine. But you tell me what "low-hanging fruit" means. Without saying "the fruit is low".' },
        { speaker: 'zanele', text: 'It means... the fruit is... at a height that is... Anyway! I speak fluent corporate.' },
        { speaker: 'tey', text: "She does speak it. She doesn't always understand it. That's more common than you'd think. Here's the trick for decoding any phrase." },
      ],
    },
    {
      kind: 'text',
      html: "<p>Lots of jargon is a <strong>picture</strong>. Once you see the picture, the meaning follows:</p><ul><li><strong>Boil the ocean:</strong> picture trying to heat a whole ocean. Impossible. So: too big a task.</li><li><strong>Put a pin in it:</strong> picture pinning a note to the wall for later. So: pause it.</li><li><strong>Drink from the firehose:</strong> picture trying to drink from a fire hose. So: too much information, too fast.</li></ul><p>When you hear a new phrase, ask yourself: <em>what's the picture?</em> You'll often guess the meaning before anyone explains it.</p>",
    },
    {
      kind: 'myth',
      statements: [
        { text: 'People use jargon mainly to confuse others.', isFact: false, explain: 'Usually it\'s habit and shorthand. People rarely notice they\'re doing it.' },
        { text: 'The most senior people always use the most jargon.', isFact: false, explain: 'Often the opposite. Many leaders speak very plainly. Keep an eye on Synergix\'s CEO.' },
        { text: 'The same phrase can mean slightly different things in different offices.', isFact: true, explain: 'True. If it matters, ask: "When you say X, do you mean...?"' },
      ],
    },
  ],
  apply: {
    scenario: 'Monday lunch. Lunch is on the line.',
    items: [
      {
        kind: 'mcq',
        prompt: '"Let\'s not boil the ocean." What does Brian want?',
        options: [
          { text: 'Keep the task small enough to actually finish' },
          { text: 'Save energy in the office', why: 'There\'s no real boiling. It\'s a picture of an impossible task.' },
          { text: 'Do everything at once', why: 'The opposite: boiling the ocean IS trying to do everything at once.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Real jargon, or did Zanele invent it?',
        groups: ['Real jargon', 'Made up'],
        items: [
          { text: 'Put a pin in it', group: 0 },
          { text: 'Mango the pipeline', group: 1 },
          { text: 'Drink from the firehose', group: 0 },
          { text: 'Pour tea on the roadmap', group: 1 },
          { text: 'Run it up the flagpole', group: 0 },
          { text: 'Microwave the deadline', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the phrase to its picture.',
        pairs: [
          ['Boil the ocean', 'Heating an entire sea'],
          ['Put a pin in it', 'A note pinned up for later'],
          ['Drink from the firehose', 'Far too much, far too fast'],
          ['Run it up the flagpole', 'Raising a flag to see who salutes'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'brian',
        message: 'Remi, welcome aboard. Week one is going to feel like drinking from the firehose, so shout if you need anything.',
        prompt: 'What is Brian telling Remi?',
        options: [
          { text: 'I don\'t drink at work, sorry.', why: 'Nobody is drinking anything. It means there\'ll be a lot to learn very quickly.' },
          { text: 'Should I bring my own water?', why: 'It\'s a picture: a huge flow of information, not water.' },
          { text: 'Thanks, Brian! I\'ll shout if it gets too much. Is there anything I should read first?' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: '"Let\'s put a ___ in it" means "let\'s pause this and come back later". (one word)',
        answers: ['pin'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Zanele says, "Let\'s run my idea up the flagpole." What does she want to do?',
        options: [
          { text: 'Fly a flag outside the office', why: 'It\'s a picture: raise it up and see who salutes. Nothing is actually raised.' },
          { text: 'Get her idea approved without discussion', why: 'The point is to test reactions, not skip them.' },
          { text: 'Show the idea to people and see how they react' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Tey\'s trick for any new phrase:',
        template: 'Ask yourself: what\'s the [[1]]? Then guess the [[2]].',
        blanks: [['picture'], ['meaning']],
        distractors: ['price', 'password'],
      },
      {
        kind: 'mcq',
        prompt: 'Which of these is TRUE about jargon?',
        options: [
          { text: 'Senior people always use the most jargon', why: 'Many senior people speak very plainly.' },
          { text: 'The same phrase can mean slightly different things in different offices' },
          { text: 'People mostly use it to confuse newcomers', why: 'It\'s usually habit, not a plan to confuse anyone.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Zanele explains three phrases. Tap the explanation that\'s wrong.',
        lines: [
          'Put a pin in it: pause it and come back later.',
          'Boil the ocean: work extra hard all week.',
          'Drink from the firehose: take in a lot of information quickly.',
        ],
        bug: 1,
        fix: 'Boil the ocean: try to do something so big it can\'t be done.',
        explanation: 'Boiling the ocean isn\'t about effort, it\'s about a task that\'s impossibly big.',
      },
      {
        kind: 'tapBuild',
        prompt: 'Remi wins the bet. Build what he says to Zanele.',
        tiles: ['Let\'s', 'put', 'a', 'pin', 'in', 'lunch.', 'You\'re', 'paying', 'tomorrow.'],
        distractors: ['boil', 'mango'],
      },
    ],
  },
  reflect: {
    prompt: 'Which phrase from today would be most useful at your work, school or home this week? Write a sentence where you\'d use it, or where you\'d expect to hear it.',
    starters: ['The phrase I\'ll listen for is...', 'I\'d expect to hear it when...'],
  },
  deepen: {
    title: 'Jargon detective',
    summary: 'Open the last long work email, school notice or company announcement you received. Find one phrase that\'s a "picture" and work out its meaning from the picture before you look it up.',
  },
  notes:
    'Meanings checked: "boil the ocean" (attempt an impossibly large task), "put a pin in it" (postpone), "run it up the flagpole" (test an idea\'s reception; dated US business idiom), "drink from a firehose" (overwhelmed by information). Sources: Merriam-Webster, Cambridge Dictionary, Collins. Fake phrases are invented for the game and explicitly labelled as such.',
};

export default lesson;
