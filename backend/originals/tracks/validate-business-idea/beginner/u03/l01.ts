import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 1. Story: David's question. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'David\'s question',
  summary: 'Clinton has a slide: "20,000 students. If just 10% use WashDay, I\'m rich!" David, the best at maths in the group, asks one question that wipes the smile off his face.',
  minutes: 11,
  outcomes: [
    'See why a big headline number can mislead',
    'Know the three questions behind any market size',
    'Start counting the people you can actually reach',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Ten percent of everyone',
      beats: [
        { speaker: 'clinton', text: 'Look: about 20,000 students. If just 10% use WashDay, that\'s 2,000 customers!' },
        { speaker: 'david', text: 'Where did 10% come from?' },
        { speaker: 'clinton', text: '...It sounded small. Small is safe, right?' },
        { speaker: 'david', text: 'Most of those students live at home or nowhere near Molyko. How many live in hostels you can reach on a bike? How many of those have the problem? And how often would they pay?' },
        { speaker: 'narrator', text: 'Clinton has no idea. So on Saturday, the two of them walk every street within fifteen minutes of campus with a notebook, counting hostels and asking caretakers how many rooms each one has.' },
        { speaker: 'tey', text: 'That\'s market sizing done properly: not a percentage of a big number, but a count of real people you could actually serve, built up from the bottom.' },
      ],
      choice: {
        prompt: 'How should Clinton work out how many customers he could have?',
        options: [
          { text: 'Count the hostel students he can reach, then use his interviews to estimate who has the problem and pays.', outcome: 'Right. Every number comes from something he saw or counted.', best: true },
          { text: 'Keep the 10% of 20,000: it sounds modest.', outcome: '10% of everyone is a guess wearing a number. Nobody knows where it came from.' },
          { text: 'Use 50% to be ambitious.', outcome: 'A bigger guess is still a guess.' },
        ],
      },
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Three questions behind every market size: how many people can I reach, how many have the problem, and how often would they pay?',
    },
  ],
  apply: {
    scenario: 'How many, really?',
    items: [
      {
        kind: 'mcq',
        prompt: 'What\'s wrong with "if just 10% of 20,000 students use it"?',
        options: [
          { text: 'The 10% is a guess, and most of the 20,000 can\'t be reached or don\'t have the problem' },
          { text: 'Nothing: 10% is small and safe', why: 'Small doesn\'t mean evidence-based.' },
          { text: 'It should be 1%', why: 'A different guess is still a guess.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Clinton\'s slide: 10% of 20,000 students. How many customers is that?',
        answers: ['2000', '2,000'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Counted or guessed?',
        groups: ['Counted', 'Guessed'],
        items: [
          { text: '40 hostels within 15 minutes of campus', group: 0 },
          { text: '"10% will use it"', group: 1 },
          { text: '9 of 15 interviewees raised laundry', group: 0 },
          { text: '"Everyone hates laundry"', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match David\'s question to what it narrows down.',
        pairs: [
          ['How many can I reach?', 'Hostels near campus'],
          ['How many have the problem?', 'Students who wash by hand'],
          ['How often would they pay?', 'Orders per month'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'clinton',
        message: '20,000 is the real number of students, so my slide is fine.',
        prompt: "David's best reply?",
        options: [
          { text: 'The 20,000 might be real. The 10% isn\'t. And most of the 20,000 will never be your customers. Let\'s count the ones who could be.' },
          { text: 'True, ship the slide.', why: 'The percentage is invented.' },
          { text: 'Use 100% then.', why: 'That makes the guess worse.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The three questions.',
        template: 'How many can I [[1]], how many have the [[2]], and how often would they pay?',
        blanks: [['reach'], ['problem']],
        distractors: ['impress', 'app'],
      },
      {
        kind: 'mcq',
        prompt: 'Why walk the streets and count hostels?',
        options: [
          { text: 'It turns "students" into a number of real people he could actually serve' },
          { text: 'For exercise', why: 'It\'s for real numbers.' },
          { text: 'To advertise', why: 'They\'re counting, not selling, yet.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Order a believable market estimate.',
        lines: ['Count the people you can reach', 'Estimate how many have the problem', 'Estimate how many would pay', 'Multiply by how often and the price'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line in Clinton\'s plan is still a guess?',
        lines: [
          'Count hostels within 15 minutes of campus.',
          'Ask caretakers how many rooms each has.',
          'Assume 10% of all students will sign up.',
          'Use interview notes to estimate who has the problem.',
        ],
        bug: 2,
        fix: 'Use counted students and interview shares instead.',
        explanation: '10% of everyone isn\'t based on anything he saw.',
      },
      {
        kind: 'sortGroups',
        prompt: 'Likely customer or not?',
        groups: ['Likely customer', 'Not likely'],
        items: [
          { text: 'A first-year in a Molyko hostel, washing by hand', group: 0 },
          { text: 'A student living at home with a washing machine', group: 1 },
          { text: 'A student paying Mama Rose during exams', group: 0 },
          { text: 'A student in another town', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'For your idea: how many people could you actually reach in the next month? How would you count them?',
    starters: ['I could reach...', 'I\'d count them by...'],
  },
  deepen: {
    title: 'The 1% trap',
    summary: '"If we get just 1% of a huge market" is one of the most common mistakes in business plans. It sounds modest but skips the hard question: why would those people choose you?',
  },
  notes: 'Clinton\'s slide numbers (20,000 students, 10%) are his own guess for the story, not an official University of Buea figure. The hostel count (40 hostels within 15 minutes) is fictional and used throughout Chapter 3.',
};

export default lesson;
