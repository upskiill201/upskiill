import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 10. Unit Challenge: size it, map it (Bomaka). */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Challenge: size it, map it',
  summary: 'A friend in Bomaka, another student area, asks Clinton to bring WashDay there too. Before saying yes, he and David size Bomaka bottom-up and map who students use today. Everything from Chapter 3.',
  minutes: 14,
  milestone: 'UNIT_CHALLENGE',
  outcomes: ['Size a new market and map its competitors', 'Use everything from Chapter 3 together'],
  learn: [
    {
      kind: 'story',
      title: 'What about Bomaka?',
      beats: [
        { speaker: 'narrator', text: 'A message from Clinton\'s friend in Bomaka: "Bring WashDay here! Everyone needs it!"' },
        { speaker: 'david', text: 'Everyone? Let\'s count. I\'ll take the notebook.' },
        { speaker: 'narrator', text: 'Their Saturday count: 25 hostels, about 40 rooms each. Clinton has 10 conversations there: 6 raise laundry unprompted and 4 have paid for help. Payers do it about twice a month. There\'s no Mama Rose in Bomaka, but there\'s a dry-cleaner in town, 20 minutes away by taxi.' },
        { speaker: 'tey', text: 'That\'s Chapter 3: count who you can reach, size it bottom-up, separate what\'s winnable, and map everything customers do instead. Chapter 4: finally, a test with real money.' },
      ],
    },
  ],
  apply: {
    scenario: 'Chapter 3 challenge: size it, map it.',
    items: [
      {
        kind: 'typeAnswer',
        prompt: '25 hostels × 40 rooms. How many students can be reached in Bomaka?',
        answers: ['1000', '1,000'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: '6 of 10 conversations raised laundry. What share has the problem?',
        options: [
          { text: '60%' },
          { text: '6%', why: '6 of 10 is 60%.' },
          { text: '40%', why: 'That\'s the share who paid.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: '4 of 10 have paid for help (40%). With 1,000 reachable students, how many likely customers?',
        answers: ['400'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: '400 customers, twice a month, at 1,500 FCFA. What\'s Bomaka\'s reachable market per month?',
        options: [
          { text: '600,000 FCFA', why: 'Twice a month: 400 × 2 × 1,500.' },
          { text: '2,400,000 FCFA', why: 'That\'s the Molyko figure.' },
          { text: '1,200,000 FCFA' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Competitor in Bomaka, or not?',
        groups: ['Competitor', 'Not'],
        items: [
          { text: 'Hand-washing', group: 0 },
          { text: 'The dry-cleaner in town', group: 0 },
          { text: 'Mama Rose (not in Bomaka)', group: 1 },
          { text: 'Buying extra clothes', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'clinton',
        message: 'Bomaka adds 1.2 million a month! I\'ll start there next week too.',
        prompt: "David's best reply?",
        options: [
          { text: 'Yes, double the market, double the money.', why: 'Capacity and the payment test come first.' },
          { text: 'Your winnable market is set by one bike. Two areas means fewer bags in each. And nobody has paid you yet. Test in Molyko first.' },
          { text: 'Never go to Bomaka.', why: 'Later, maybe; not before the first test.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the Bomaka number to its source.',
        pairs: [
          ['25 hostels', 'Walking and counting'],
          ['60% have the problem', '6 of 10 conversations'],
          ['40% have paid', '4 of 10 conversations'],
          ['Twice a month', 'What payers said'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Clinton\'s Bomaka plan uses the wrong size?',
        lines: [
          'Reachable: about 400 likely customers.',
          'Reachable market: about 1.2 million FCFA a month.',
          'Next month I\'ll earn 1.2 million FCFA there.',
          'Main competitor: hand-washing.',
        ],
        bug: 2,
        fix: 'Next month: plan from what one bike can carry (winnable).',
        explanation: 'Reachable isn\'t winnable; capacity limits what he can earn.',
      },
      {
        kind: 'fillBlank',
        prompt: 'The Bomaka sum.',
        template: '[[1]] customers × 2 a month × 1,500 FCFA = [[2]] FCFA.',
        blanks: [['400'], ['1,200,000', '1200000']],
        distractors: ['1,000', '600,000'],
      },
      {
        kind: 'orderLines',
        prompt: 'Order the Bomaka sizing.',
        lines: ['Count hostels and rooms: 1,000 students', 'Apply the share who have paid: 400', 'Multiply by twice a month', 'Multiply by the price: 1.2 million FCFA'],
      },
      {
        kind: 'mcq',
        prompt: 'What is the biggest competitor in Bomaka?',
        options: [
          { text: 'Hand-washing: free and already a habit' },
          { text: 'Mama Rose', why: 'She isn\'t in Bomaka.' },
          { text: 'The dry-cleaner', why: '20 minutes away by taxi; few students use it.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'What is the job to be done, in two words: clean, dry...?',
        answers: ['clothes', 'clean dry clothes'],
        placeholder: 'One word',
      },
    ],
  },
  reflect: {
    prompt: 'Size a second market for your idea (another area, another group). Is it worth it now, or after your first test?',
    starters: ['The second market is...', 'I\'d go there after...'],
  },
  notes: 'Chapter 3 challenge (fictional): Bomaka 25 hostels × 40 rooms = 1,000; 6/10 raised laundry (60%); 4/10 paid (40%) = 400; 400 × 2 × 1,500 = 1,200,000 FCFA/month reachable. Bomaka is a real neighbourhood of Buea; the counts are invented.',
};

export default lesson;
