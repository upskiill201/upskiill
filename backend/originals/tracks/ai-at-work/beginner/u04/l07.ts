import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 4 · Lesson 7 — bias in AI answers. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'Bias in AI answers',
  summary: 'AI learned from human writing, including its unfair patterns. Learn to spot bias in AI drafts before it reaches real people.',
  minutes: 13,
  outcomes: [
    'Explain where bias in AI answers comes from',
    'Spot biased wording in a draft',
    'Ask for, and check, a fairer version',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'The AI\'s first draft: "customer personas for Ghana"',
      text: 'Persona 1: Kwame, 35, a businessman who handles the family finances. Persona 2: Ama, 28, a market trader who needs help understanding technology. Persona 3: Kofi, 40, a tech-savvy manager in Accra. All three live in Accra and speak English.',
      hotspots: [
        { phrase: 'a businessman who handles the family finances', note: 'A stereotype: assumes men manage money. Ask what your real data says.' },
        { phrase: 'needs help understanding technology', note: 'Only the woman is described as needing help. A pattern from the training data, not your users.' },
        { phrase: 'a tech-savvy manager', note: 'Another man as the confident expert. Notice who gets which role.' },
        { phrase: 'All three live in Accra', note: 'Leaves out other regions. Bias is also about who is missing.' },
        { phrase: 'speak English', note: 'Many users may prefer Twi, Ga, Ewe or others. Check your users.' },
      ],
    },
    {
      kind: 'reading',
      title: 'Where bias comes from',
      html:
        '<p>AI tools learn from huge amounts of human writing. If that writing often pairs certain jobs, roles or abilities with certain groups, the AI repeats the pattern.</p>' +
        '<p>A well-known example: in 2018, Reuters reported that Amazon stopped using an experimental AI recruiting tool after it learned to downgrade CVs containing the word "women\'s", because it was trained on mostly male past hires.</p>' +
        '<p><strong>Check any draft about people</strong> for: who gets which role, who is missing, and whether a description would sound odd if you swapped the group.</p>',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'The swap test: swap the gender, age or region in a sentence. If it suddenly sounds odd, the original was biased.',
    },
  ],
  apply: {
    scenario: 'Ada is reviewing AI-written personas for Lucía\'s launch.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Where does bias in AI answers mostly come from?',
        options: [
          { text: 'Patterns in the human writing it learned from' },
          { text: 'The AI\'s own opinions', why: 'It has no opinions; it repeats patterns.' },
          { text: 'Random errors only', why: 'Bias is systematic, not random.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Biased wording, or neutral?',
        groups: ['Biased', 'Neutral'],
        items: [
          { text: '"She needs help understanding technology"', group: 0 },
          { text: '"A market trader who sells fabric"', group: 1 },
          { text: '"A businessman who handles the family finances"', group: 0 },
          { text: '"A manager who uses three banking apps"', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'In which year did Reuters report on Amazon\'s biased recruiting tool?',
        answers: ['2018'],
        placeholder: 'A year',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the check to the question it asks.',
        pairs: [
          ['Roles', 'Who gets which job or ability?'],
          ['Missing people', 'Who isn\'t here at all?'],
          ['Swap test', 'Would it sound odd swapped?'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'These personas look fine to me. Can we use them in the deck?',
        prompt: 'What should Ada say?',
        options: [
          { text: 'Nearly. Only the woman "needs help with technology" and everyone is in Accra. Let\'s base them on our real user data.' },
          { text: 'Yes, the AI made them, so they\'re objective.', why: 'AI can repeat stereotypes.' },
          { text: 'No, never use personas.', why: 'Personas are fine when based on real users.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the swap test.',
        template: 'Swap the [[1]], age or region. If it sounds [[2]], the original was biased.',
        blanks: [['gender'], ['odd']],
        distractors: ['font', 'better'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line fails the swap test?',
        lines: [
          'Kofi, 40, uses mobile money daily',
          'Ama, 28, sells fabric at Makola market',
          'Ama is surprisingly good with numbers for a woman',
          'Esi, 52, pays school fees by phone',
        ],
        bug: 2,
        fix: 'Ama tracks her stock in a spreadsheet.',
        explanation: '"Surprisingly good for a man" would sound odd. So does this.',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which request gets fairer personas?',
        options: [
          { text: 'Make three customer personas.', why: 'Leaves the AI to fill gaps with stereotypes.' },
          { text: 'Make three personas based on this summary of our real users. Vary age, gender, region and language as in the data. Avoid stereotypes about ability.' },
          { text: 'Make personas of typical Ghanaians.', why: '"Typical" invites stereotypes.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Order Ada\'s bias check.',
        lines: ['Read who gets which role', 'Look for who is missing', 'Do the swap test', 'Rewrite using real data'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Who might be missing from "all live in Accra and speak English"?',
        groups: ['Possibly missing', 'Already included'],
        items: [
          { text: 'Users in Kumasi or Tamale', group: 0 },
          { text: 'People who prefer Twi or Ewe', group: 0 },
          { text: 'English speakers in Accra', group: 1 },
          { text: 'Older users', group: 0 },
        ],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Ada\'s rule for drafts about people.',
        tiles: ['Base', 'it', 'on', 'real', 'data'],
        distractors: ['guesses'],
      },
      {
        kind: 'mcq',
        prompt: 'Is a draft unbiased because a machine wrote it?',
        options: [
          { text: 'No. It can repeat human bias at scale.' },
          { text: 'Yes, machines are neutral.', why: 'It learned from human writing.' },
          { text: 'Only if it\'s long.', why: 'Length is irrelevant.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Where in your work does AI write about people: customers, candidates, users? What would the swap test show?',
    starters: ['AI writes about...', 'The swap test might show...'],
  },
  deepen: { title: 'Try it today', summary: 'Ask an AI tool to describe "a nurse", "an engineer" and "a CEO". Note who it imagines, then run the swap test.' },
  notes: 'Reuters (Dastin, Oct 2018): Amazon scrapped an experimental recruiting tool that penalised CVs including "women\'s". Personas are fictional.',
};

export default lesson;
