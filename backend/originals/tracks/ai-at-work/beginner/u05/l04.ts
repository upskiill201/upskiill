import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 5 · Lesson 4 — comparing options side by side. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Comparing options side by side',
  summary: 'Ghana isn\'t the only option. A comparison table makes the choice visible, as long as every cell is checked and the criteria are yours.',
  minutes: 13,
  outcomes: [
    'Ask AI for a comparison table with your criteria',
    'Spot cells that need checking',
    'Use a table to support, not make, the decision',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'The AI\'s first comparison table',
      text: 'Ghana: large mobile money use, English-speaking, licence needed, strong competitors. Kenya: very high mobile money use, English-speaking, dominant local leader, licence needed. Côte d\'Ivoire: growing market, French-speaking, regional licence options. Recommendation: Kenya is clearly best.',
      hotspots: [
        { phrase: 'large mobile money use', note: '"Large" compared to what? Ask for the number and its source.' },
        { phrase: 'dominant local leader', note: 'True for Kenya, but how does that affect a newcomer? A criterion you need to weigh, not a fact to ignore.' },
        { phrase: 'French-speaking', note: 'Matters for support and marketing costs. Is it one of your criteria?' },
        { phrase: 'regional licence options', note: 'Sounds useful, but verify with an official source.' },
        { phrase: 'Kenya is clearly best', note: 'The AI picked a winner without your criteria or weights. That\'s your decision, not its.' },
      ],
    },
    {
      kind: 'reading',
      title: 'A better comparison request',
      html:
        '<p>Give the AI <strong>your criteria</strong> and ask for a table, with a source or "unknown" in every cell:</p>' +
        '<p><em>"Compare Ghana, Kenya and Côte d\'Ivoire for a payments app pilot. Rows: mobile money use, licence time, main competitors, language, partner banks. Put the source or \'unknown\' in each cell. Don\'t recommend; I\'ll decide."</em></p>' +
        '<p>Then check the cells that would change your decision.</p>',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Your criteria, a source or "unknown" in every cell, and no recommendation from the AI. The table informs; you decide.',
    },
  ],
  apply: {
    scenario: 'Ada is comparing three possible markets.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What\'s wrong with "Kenya is clearly best" in the AI table?',
        options: [
          { text: 'Kenya is a bad market', why: 'The problem is who decided, and how.' },
          { text: 'It decided without Lucía\'s criteria or priorities' },
          { text: 'Nothing', why: 'The decision belongs to the team.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Good table cell, or needs work?',
        groups: ['Good', 'Needs work'],
        items: [
          { text: '"Licence time: 6-12 months (regulator site, 2024)"', group: 0 },
          { text: '"Mobile money use: large"', group: 1 },
          { text: '"Partner banks: unknown"', group: 0 },
          { text: '"Competitors: strong"', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which comparison request is best?',
        options: [
          { text: 'Which country is best for us?', why: 'Hands over the decision.' },
          { text: 'Compare Ghana, Kenya and Côte d\'Ivoire on these five criteria. Source or "unknown" in every cell. Don\'t recommend.' },
          { text: 'Make a nice table about Africa.', why: 'No criteria, too broad.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the rule.',
        template: 'Your [[1]], a source or "[[2]]" in every cell.',
        blanks: [['criteria'], ['unknown']],
        distractors: ['feelings', 'probably'],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Why does the table say "unknown" for partner banks? Looks unfinished.',
        prompt: 'Best reply?',
        options: [
          { text: 'I\'ll fill it with a guess.', why: 'A guess hides the gap.' },
          { text: 'I\'ll delete that row.', why: 'It may matter for the decision.' },
          { text: '"Unknown" is honest: it shows what we still need to find. Better than a guess that looks finished.' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the vague cell to a better version.',
        pairs: [
          ['"Large use"', 'A number with its source'],
          ['"Strong competitors"', 'Named competitors and what they offer'],
          ['"Licence needed"', 'Which licence and how long, from the regulator'],
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Order Ada\'s comparison process.',
        lines: ['Agree the criteria with Lucía', 'Ask AI for the table', 'Check the cells that matter most', 'Discuss and decide together'],
      },
      {
        kind: 'findBug',
        prompt: 'Which row in Ada\'s table is the weakest?',
        lines: [
          'Licence time: Ghana 6-12 months (regulator)',
          'Language: Ghana English; Côte d\'Ivoire French',
          'Customer happiness: Ghana 9/10',
          'Main competitor: Kenya, one dominant app (annual report)',
        ],
        bug: 2,
        fix: 'Remove it, or replace it with survey data that has a source.',
        explanation: '"9/10" has no source or method.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'What should go in a cell when the AI doesn\'t know? (one word, in quotes)',
        answers: ['unknown', '"unknown"'],
        placeholder: 'One word',
      },
      {
        kind: 'sortGroups',
        prompt: 'Your call, or the table\'s job?',
        groups: ['Ada and Lucía decide', 'The table shows'],
        items: [
          { text: 'Which criterion matters most', group: 0 },
          { text: 'Licence times in each country', group: 1 },
          { text: 'The final recommendation', group: 0 },
          { text: 'Which languages are spoken', group: 1 },
        ],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the end of Ada\'s request.',
        tiles: ['Don\'t', 'recommend;', 'I\'ll', 'decide'],
        distractors: ['please', 'you'],
      },
      {
        kind: 'mcq',
        prompt: 'Which cells should Ada check first?',
        options: [
          { text: 'The ones that would change the decision' },
          { text: 'All cells equally, from the top', why: 'Prioritise what matters.' },
          { text: 'None; the AI made it', why: 'Check the important ones.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Think of a choice you\'re facing. What would your criteria rows be?',
    starters: ['The options:', 'My criteria:'],
  },
  deepen: { title: 'Try it today', summary: 'Ask AI for a comparison table on a real choice, with "unknown" allowed. Count how many cells you need to check.' },
  notes: 'Market descriptions are simplified and illustrative, not current market data. Kenya\'s mobile money market is widely reported as dominated by M-Pesa.',
};

export default lesson;
