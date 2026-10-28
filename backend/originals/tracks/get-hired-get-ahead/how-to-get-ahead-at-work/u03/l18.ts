import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 3 · Chapter 3 · Lesson 18 — Clinton's promotion case, line by line. Tap to explore. */
const lesson: OriginalLesson = {
  key: 'l18',
  title: 'Clinton\'s case',
  summary: 'The night before 1 March, Clinton reads his one-page case one last time. Ngozi has already said she\'ll take it into the promotion meeting as it is. Tap each line.',
  minutes: 11,
  outcomes: ['Recognise a strong promotion case', 'See how evidence maps to criteria', 'Spot what makes it easy to argue for'],
  learn: [
    {
      kind: 'explore',
      title: 'Tap each line of the case',
      text: 'Ask: move from Graduate Developer to Developer.\nLeads work with others: led the retry-service rebuild with Kemi; shipped on time, failed retries down 60%.\nDesign and trade-offs: wrote the retry design doc; Paul: "Clear trade-offs, well argued."\nBeyond the team: fixed the Monday payout report with finance; no broken Mondays since.\nNext: lead the sync-service split; mentor the next graduate hire.',
      hotspots: [
        { phrase: 'Ask: move from Graduate Developer to Developer.', note: 'The ask in one line, at the top. Nobody has to guess what he wants.' },
        { phrase: 'shipped on time, failed retries down 60%', note: 'One of the two December gaps, closed, with a number.' },
        { phrase: 'Paul: "Clear trade-offs, well argued."', note: 'The other gap, closed, with a quote from a respected senior. Ngozi can repeat this in the meeting.' },
        { phrase: 'no broken Mondays since', note: 'Impact beyond his team. Promotion meetings often look for this.' },
        { phrase: 'mentor the next graduate hire', note: 'What he\'ll do at the new level. It shows he\'s thinking about the team, not just the title.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Ask at the top. Each criterion with evidence and a number. A quote from a senior. Impact beyond the team. What\'s next.',
    },
  ],
  apply: {
    scenario: 'The case, the night before.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put Clinton\'s case in order.',
        lines: ['The ask', 'Leads work with others', 'Design and trade-offs', 'Beyond the team', 'What\'s next'],
      },
      {
        kind: 'mcq',
        prompt: 'Why include Paul\'s quote?',
        options: [
          { text: 'To flatter Paul', why: 'It\'s evidence Ngozi can use.' },
          { text: 'Ngozi can repeat a respected senior\'s words in the meeting' },
          { text: 'It\'s filler', why: 'It\'s strong evidence.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Gap closed, or extra value?',
        groups: ['Gap closed', 'Extra value'],
        items: [
          { text: 'Led the retry rebuild with Kemi', group: 0 },
          { text: 'Payout report fixed with finance', group: 1 },
          { text: 'Wrote the retry design doc', group: 0 },
          { text: 'Onboarding doc for new starters', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that would weaken this case.',
        lines: ['Failed retries down 60%.', 'Also, Amadou got promoted, so it\'s my turn.', 'Paul: "Clear trade-offs."'],
        bug: 1,
        explanation: 'Comparisons weaken a case. Evidence strengthens it.',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'Should I add a long paragraph about how hard I\'ve worked?',
        options: [
          { text: 'Yes, three paragraphs.', why: 'Evidence over effort.' },
          { text: 'Replace the evidence with it.', why: 'Evidence is the case.' },
          { text: 'No: the evidence shows it. Keep it to one page.' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each line to its number or quote.',
        pairs: [
          ['Retry rebuild', 'Failed retries down 60%'],
          ['Design doc', '"Clear trade-offs, well argued."'],
          ['Payout fix', 'No broken Mondays since'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'What makes a case easy for a manager to argue for?',
        options: [
          { text: 'Evidence mapped to criteria, with numbers and quotes' },
          { text: 'Lots of adjectives', why: 'Evidence.' },
          { text: 'Pages of history', why: 'One page of evidence.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the tip.',
        template: 'Ask at the [[1]]. Each criterion with [[2]].',
        blanks: [['top'], ['evidence']],
        distractors: ['end', 'feelings', 'excuses'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'By what percent did failed retries fall? (a number)',
        answers: ['60', 'sixty'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Belongs in the case, or not?',
        groups: ['Belongs', 'Doesn\'t'],
        items: [
          { text: 'A senior\'s quote', group: 0 },
          { text: 'A complaint about the process', group: 1 },
          { text: 'What he\'ll do next', group: 0 },
          { text: 'A comparison with Amadou', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Read your own draft case (or start one). Which line is strongest? Which needs a number or a quote?',
    starters: ['Strongest:', 'Needs a number:'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Add one quote from someone senior to your impact record this month. Ask for it if you need to: "Would you be happy for me to quote your feedback?"',
  },
  notes: 'Numbers are story details.',
};

export default lesson;
