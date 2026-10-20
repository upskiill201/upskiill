import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 2 · Chapter 5 · Lesson 4 — researching a fair salary. Step-by-step. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'What\'s fair?',
  summary: 'Clinton "hoped for 350,000". Miracle asks where that number came from. "Er... it felt right?" Before anyone negotiates, they need a number based on something real. Here\'s how to find one.',
  minutes: 12,
  outcomes: ['Research a realistic salary range', 'Use several sources, not one', 'Turn research into a range and a target'],
  learn: [
    {
      kind: 'steps',
      title: 'Find a fair range in four steps',
      steps: [
        { title: '1. Ask people, carefully', body: 'People rarely share their own salary, but many will answer: "What\'s a typical range for a graduate developer in Douala?" Clinton asks Tchami, Mr Tamba and two meet-up speakers.' },
        { title: '2. Check published sources', body: 'Salary surveys, job adverts that show pay ranges, recruiters\' reports, professional associations. Note the date and the country; old or foreign numbers can mislead.' },
        { title: '3. Adjust for the details', body: 'City, company size, the role, your skills and proof, and the whole offer. A permanent role with benefits and an early review may be worth more than its salary line.' },
        { title: '4. Write a range and a target', body: 'Clinton\'s research: graduate developers in Douala fintech are often offered roughly 280,000 to 340,000 francs. His target: 330,000, with a reason. His walk-away point: below Kmer\'s whole offer.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Ask people for typical ranges. Check dated, local sources. Adjust. Write a range, a target and a walk-away point.',
    },
  ],
  apply: {
    scenario: 'Clinton researches a fair salary.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the research steps in order.',
        lines: ['Ask people for typical ranges', 'Check published sources', 'Adjust for the details', 'Write a range and a target'],
      },
      {
        kind: 'mcq',
        prompt: 'Why ask "What\'s a typical range?" rather than "What do you earn?"',
        options: [
          { text: 'People answer it more comfortably, and it\'s more useful' },
          { text: 'It\'s sneakier', why: 'It\'s more comfortable and more useful.' },
          { text: 'No reason', why: 'Most people won\'t share their own pay.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Good salary source, or poor?',
        groups: ['Good', 'Poor'],
        items: [
          { text: 'A recent local salary survey', group: 0 },
          { text: 'A US salary site for Cameroon jobs', group: 1 },
          { text: 'Several people in the field', group: 0 },
          { text: 'A number that "felt right"', group: 1 },
          { text: 'Local adverts showing pay ranges', group: 0 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the misleading source.',
        lines: ['Tchami: typical range 280k–340k.', 'A 2015 survey from another country.', 'Two local adverts showing pay ranges.'],
        bug: 1,
        explanation: 'Old and foreign. Use recent, local numbers.',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best question to ask Tchami.',
        from: 'clinton',
        message: 'What should I ask Tchami about salary?',
        options: [
          { text: '"What\'s a typical range for a graduate developer at a Douala fintech?"' },
          { text: '"How much do YOU earn?"', why: 'Ask for a range instead.' },
          { text: 'Nothing, it\'s rude.', why: 'A range question is fine.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each term to its meaning.',
        pairs: [
          ['Range', 'What people are typically offered'],
          ['Target', 'What you\'ll ask for, with a reason'],
          ['Walk-away point', 'Below this, you\'d choose the other option'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'What\'s Clinton\'s walk-away point?',
        options: [
          { text: 'Below Kmer\'s whole offer' },
          { text: 'Anything under 1,000,000', why: 'Unrealistic. Based on his real alternative.' },
          { text: 'He doesn\'t need one', why: 'It helps him decide calmly.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the rule.',
        template: 'Write a [[1]], a target and a [[2]] point.',
        blanks: [['range'], ['walk-away']],
        distractors: ['wish', 'random', 'starting'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What target salary, in francs, did Clinton choose? (a number)',
        answers: ['330000', '330,000', '330 000'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Adjust up or down for this?',
        groups: ['Might go up', 'Might go down'],
        items: [
          { text: 'Strong proof of relevant skills', group: 0 },
          { text: 'A much smaller town', group: 1 },
          { text: 'A bigger, well-funded company', group: 0 },
          { text: 'A very junior role with lots of training', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'For a job you\'d like, where could you find a realistic salary range? Name two people and one source.',
    starters: ['People:', 'Source:'],
  },
  deepen: {
    title: 'Check locally',
    summary: 'Find two recent, local sources for pay in your field. Write a range, a target and your walk-away point.',
  },
  notes: 'The 280k–340k range is a story detail, not real market data. Some countries now require pay ranges in job adverts; check locally.',
};

export default lesson;
