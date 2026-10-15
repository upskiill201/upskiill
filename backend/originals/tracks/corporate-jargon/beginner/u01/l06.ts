import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 6 — first paid lesson. Tap to explore: Brian's whiteboard of priority words. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'Quick wins and low-hanging fruit',
  summary: 'Brian\'s whiteboard is covered in priority words: quick wins, must-haves, the back burner, a moonshot. Tap each one and find out what really comes first.',
  minutes: 12,
  outcomes: [
    'Decode the words offices use to say what matters most',
    'Tell urgent work from work that can wait',
    'Ask what comes first, in plain words',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Brian\'s whiteboard, Wednesday afternoon',
      text: 'PLAN FOR Q4. Top priority: fix late deliveries. Must-have: new supplier contracts signed. Nice-to-have: a new logo for the delivery vans. Quick wins: clean supplier list (done, thanks Remi), update the FAQ page. Back burner: the customer app. Moonshot: drone deliveries by 2030?!',
      hotspots: [
        { phrase: 'Q4', note: 'The fourth quarter of the year: October to December. A year has four quarters, Q1 to Q4. (Some companies start their year in a different month, so ask if it matters.)' },
        { phrase: 'Top priority', note: 'The most important thing. If you only do one thing, do this. Also heard as "P1" or "priority number one".' },
        { phrase: 'Must-have', note: 'Something that has to happen. Without it, the plan fails.' },
        { phrase: 'Nice-to-have', note: 'Good if there\'s time and money, but the plan works without it. The first thing to drop when things get busy.' },
        { phrase: 'Quick wins', note: 'Easy tasks with a useful result. A close cousin of "low-hanging fruit".' },
        { phrase: 'Back burner', note: 'Paused, on purpose, until later. Picture a cooker: the pot at the back simmers while you cook at the front.' },
        { phrase: 'Moonshot', note: 'A hugely ambitious idea that probably won\'t happen soon, but would be amazing if it did.' },
      ],
    },
    {
      kind: 'story',
      beats: [
        { speaker: 'zanele', text: 'Drones! I\'m going to work on the moonshot. Big ideas get noticed.' },
        { speaker: 'remi', text: 'It says "back burner" right next to the app. And "top priority" is late deliveries.' },
        { speaker: 'tey', text: "Remi's right. A moonshot is exciting, but on this whiteboard the top priority and the must-have come first. Being useful gets you noticed faster than being exciting." },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'When everything sounds important, ask: "What\'s the top priority this week?" It\'s the most useful question an intern can ask.',
    },
  ],
  apply: {
    scenario: 'Brian\'s whiteboard. Wednesday afternoon.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What does "Q4" mean on the whiteboard?',
        options: [
          { text: 'Question 4', why: 'In business, Q plus a number usually means a quarter of the year.' },
          { text: 'The last three months of the company\'s year' },
          { text: 'The fourth floor', why: 'It\'s a time period, not a place.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Do it now, or can it wait?',
        groups: ['Do it now', 'It can wait'],
        items: [
          { text: 'Top priority', group: 0 },
          { text: 'Back burner', group: 1 },
          { text: 'Must-have', group: 0 },
          { text: 'Nice-to-have', group: 1 },
          { text: 'Moonshot', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the priority words.',
        pairs: [
          ['Must-have', 'The plan fails without it'],
          ['Nice-to-have', 'Good, but optional'],
          ['Back burner', 'Paused until later'],
          ['Moonshot', 'A huge, long-shot idea'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'zanele',
        message: 'I\'m going to spend this week designing the drone delivery plan. Brian will LOVE it.',
        prompt: 'What should Remi tell her?',
        options: [
          { text: 'Great, I\'ll help!', why: 'A moonshot can wait. The board says late deliveries come first.' },
          { text: 'Drones are a nice-to-have.', why: 'Close, but the board calls drones a moonshot, which is even further away than a nice-to-have.' },
          { text: 'It\'s a cool idea, but the board says late deliveries are top priority. Maybe do that first and pitch drones after?' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Something that\'s paused on purpose is on the back ... (one word)',
        answers: ['burner'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Brian says the new van logo is a "nice-to-have". The budget gets cut. What happens to the logo?',
        options: [
          { text: 'It\'s probably dropped first' },
          { text: 'It becomes top priority', why: 'When money gets tight, nice-to-haves are the first to go.' },
          { text: 'It becomes a must-have', why: 'A must-have is something the plan can\'t work without. A logo isn\'t.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Remi plans his week.',
        template: 'First the top [[1]], then the quick [[2]]. The customer app stays on the back [[3]].',
        blanks: [['priority'], ['wins'], ['burner']],
        distractors: ['moonshot', 'needle'],
      },
      {
        kind: 'findBug',
        prompt: 'Zanele explains the board. Tap the mistake.',
        lines: [
          'Top priority: the most important thing right now.',
          'Quick wins: easy jobs with a useful result.',
          'Moonshot: something we must finish by Friday.',
        ],
        bug: 2,
        fix: 'Moonshot: a huge, ambitious idea for the future.',
        explanation: 'A moonshot is a long-term dream, the opposite of a Friday deadline.',
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the most useful question an intern can ask.',
        tiles: ['What\'s', 'the', 'top', 'priority', 'this', 'week?'],
        distractors: ['moonshot', 'offline'],
      },
      {
        kind: 'mcq',
        prompt: 'Brian gives Remi three tasks and says they\'re "all top priority". What\'s the best reply?',
        options: [
          { text: 'Do them in any order', why: 'If they can\'t all be done, Remi needs to know which matters most.' },
          { text: '"Happy to do all three. If I can only finish one by Friday, which should it be?"' },
          { text: '"That\'s impossible."', why: 'It might be, but a question that helps Brian choose works better.' },
        ],
        answer: 1,
        explanation: 'If everything is top priority, nothing is. Asking "which one first?" is polite and very useful.',
      },
    ],
  },
  reflect: {
    prompt: 'Look at your own week. What\'s your top priority, what\'s a quick win, and what can go on the back burner?',
    starters: ['My top priority is...', 'A quick win is...', 'On the back burner: ...'],
  },
  deepen: {
    title: 'The whiteboard test',
    summary: 'Write your to-do list as Brian\'s whiteboard: top priority, must-have, nice-to-have, quick wins, back burner. You\'ll see what to do first.',
  },
  notes:
    'Q1–Q4 = calendar or fiscal quarters (fiscal years vary by company/country — flagged in the hotspot). "Back burner" (Cambridge: on hold, low priority). "Moonshot" (Merriam-Webster: an extremely ambitious project). "Must-have/nice-to-have" (Cambridge).',
};

export default lesson;
