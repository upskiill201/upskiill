import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 2 · Chapter 1 · Lesson 2 — free. The strength of weak ties: Granovetter 1973, Rajkumar et al. 2022. Reading. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'The people you barely know',
  summary: 'Clinton assumes his best friends will help him most. Researchers have studied this for fifty years, including a huge experiment on LinkedIn. The answer surprises almost everyone.',
  minutes: 12,
  outcomes: ['Explain the "strength of weak ties"', 'Describe what the 2022 LinkedIn experiment found', 'Decide who to reach out to first'],
  learn: [
    {
      kind: 'reading',
      title: 'Weak ties',
      html:
        '<p>In 1973, the sociologist <strong>Mark Granovetter</strong> published a paper called <em>The Strength of Weak Ties</em>. He asked people how they\'d found their jobs, and noticed something odd: they often heard about them not from close friends, but from <strong>acquaintances</strong>, people they knew only a little.</p>' +
        '<p>The reason is simple. Your close friends mostly know the same people and hear the same news as you. Acquaintances move in different circles, so they hear about things you\'d never hear about.</p>' +
        '<p>In 2022, researchers tested this at enormous scale. In a study published in the journal <strong>Science</strong>, a team led by Karthik Rajkumar ran experiments on LinkedIn\'s "People You May Know" feature for more than <strong>20 million people</strong> over five years. They found that <strong>moderately weak ties</strong>, people you share a few connections with but don\'t know well, led to the most job moves. Very close ties helped less. The effect was strongest in digital industries like tech.</p>' +
        '<p>For Clinton, that means the meet-up speaker he met once, the developer he connected with last week, and Mrs Ewane\'s former students may matter more for his job search than his best friend David.</p>',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Don\'t only ask your closest friends. The people you know a little are often the ones who hear about different opportunities.',
    },
  ],
  apply: {
    scenario: 'Clinton reads about weak ties.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Who wrote "The Strength of Weak Ties" in 1973?',
        options: [
          { text: 'A LinkedIn engineer', why: 'LinkedIn didn\'t exist in 1973. It was sociologist Mark Granovetter.' },
          { text: 'Mark Granovetter' },
          { text: 'Miracle', why: 'Ha. Mark Granovetter, a sociologist.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        prompt: 'Why do acquaintances often help more with jobs than close friends?',
        options: [
          { text: 'They\'re nicer', why: 'Not nicer: they just know different people.' },
          { text: 'Close friends don\'t want to help', why: 'Friends want to help, but they hear the same news as you.' },
          { text: 'They move in different circles, so they hear different news' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each study to what it found.',
        pairs: [
          ['Granovetter, 1973', 'People often found jobs through acquaintances'],
          ['Rajkumar et al., Science, 2022', 'Moderately weak ties led to the most job moves'],
          ['Same 2022 study', 'Effect strongest in digital industries'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Close tie or weak tie?',
        groups: ['Close tie', 'Weak tie'],
        items: [
          { text: 'David, his best friend', group: 0 },
          { text: 'A speaker he met once at the meet-up', group: 1 },
          { text: 'His mum', group: 0 },
          { text: 'A Njangi Pay developer he connected with last week', group: 1 },
          { text: 'A former student of Mrs Ewane\'s', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'How many people were in the 2022 LinkedIn experiments?',
        options: [
          { text: 'More than 20 million' },
          { text: 'About 200', why: 'Far more: over 20 million, over five years.' },
          { text: 'About 2,000', why: 'Much bigger: over 20 million.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'david',
        message: 'I\'d help you if I could, but I only know medical people!',
        options: [
          { text: 'Then nobody can help me.', why: 'Weak ties in tech can.' },
          { text: 'Introduce me to all your doctors.', why: 'Kind, but not his field. Weak ties in fintech matter more.' },
          { text: 'That\'s exactly why the research says to reach out to people I know a little too, in tech.' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that misreads the research.',
        lines: ['Acquaintances often hear about different opportunities.', 'The weakest possible ties, total strangers, are always best.', 'Moderately weak ties led to the most job moves.'],
        bug: 1,
        explanation: 'The 2022 study found moderately weak ties worked best, not complete strangers.',
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the finding.',
        template: '[[1]] weak ties led to the most job [[2]].',
        blanks: [['Moderately'], ['moves', 'changes']],
        distractors: ['Very', 'parties', 'offers'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'The 2022 study was published in which journal? (one word)',
        answers: ['science'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Who should Clinton message first?',
        options: [
          { text: 'Only his best friends', why: 'They matter, but weak ties hear different news.' },
          { text: 'Tchami, the fintech developer who spoke at his meet-up last term' },
          { text: 'A random CEO with no connection to him', why: 'Too weak. Start with people he has some link to.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'List three people you know only a little who work in, or near, the field you want. When did you last speak to each?',
    starters: ['1. ___, last spoke...', '2. ___, last spoke...'],
  },
  deepen: {
    title: 'Read the source',
    summary: 'Search "A causal test of the strength of weak ties" and read the summary. Notice the phrase "moderately weak ties".',
  },
  notes: 'Granovetter, M. S. (1973). The Strength of Weak Ties. American Journal of Sociology 78(6). Rajkumar, K., Saint-Jacques, G., Bojinov, I., Brynjolfsson, E., & Aral, S. (2022). A causal test of the strength of weak ties. Science 377(6612): LinkedIn PYMK experiments, >20 million people, 5 years; inverted-U, moderately weak ties most beneficial for job mobility; stronger effect in more digital industries. Checked 2026-10-20 (MIT IDE summary).',
};

export default lesson;
