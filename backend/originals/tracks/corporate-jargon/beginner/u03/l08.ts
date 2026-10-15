import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 8. Card deck: job titles — the C-suite, MD, VP, Head of, HR, PM, line manager, direct report. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'Job titles: CEO, CFO, COO, CTO, VP, HR',
  summary: 'Remi opens the Synergix org chart to find who approves his access request. It\'s a wall of three-letter titles. Who\'s the boss of whom?',
  minutes: 11,
  outcomes: [
    'Decode the "C-suite" titles: CEO, CFO, COO, CTO, CMO',
    'Know what MD, VP, Head of, HR and PM usually mean',
    'Decode "line manager" and "direct report"',
  ],
  learn: [
    {
      kind: 'text',
      html: "<p>Wednesday afternoon. Remi needs to know who can approve his access to the invoice system. Mrs Achieng sends him the org chart: a diagram of who reports to whom. It's mostly letters.</p>",
    },
    {
      kind: 'text',
      html: "<h3>The C-suite</h3><p>The most senior leaders, whose titles start with \"Chief\".</p><ul><li><strong>CEO:</strong> chief executive officer. Runs the whole company. Mr Kamau.</li><li><strong>CFO:</strong> chief financial officer. Runs the money.</li><li><strong>COO:</strong> chief operating officer. Runs day-to-day operations: deliveries, warehouses.</li><li><strong>CTO:</strong> chief technology officer. Runs technology.</li><li><strong>CMO:</strong> chief marketing officer. Runs marketing.</li></ul>",
    },
    {
      kind: 'text',
      html: "<h3>Other big titles</h3><ul><li><strong>MD:</strong> managing director. In many countries (including Kenya, Nigeria and the UK), the MD runs a company or a country office. Sometimes the same job as CEO.</li><li><strong>VP:</strong> vice president. A senior leader in charge of an area, common in American-style companies. (Not second-in-command of a country.)</li><li><strong>Head of...:</strong> leads a team or function. Brian is Head of Strategy & Operations.</li></ul>",
    },
    {
      kind: 'check',
      question: 'Who would Remi ask about a problem with the company\'s money?',
      options: ['The CTO', 'The CFO\'s team', 'The CMO'],
      answer: 1,
      explanation: 'CFO = chief FINANCIAL officer.',
    },
    {
      kind: 'text',
      html: "<h3>Everyday titles and relationships</h3><ul><li><strong>HR:</strong> human resources. Hiring, contracts, leave, pay questions.</li><li><strong>PM:</strong> project manager or product manager (two different jobs!). Ask which.</li><li><strong>Line manager:</strong> the person you report to directly. Remi's line manager is Brian.</li><li><strong>Direct report:</strong> someone who reports to you. Remi is Brian's direct report.</li></ul>",
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Titles vary hugely between companies. A "Director" can run 3 people or 3,000. If it matters, ask: "What does your team look after?"',
    },
  ],
  apply: {
    scenario: 'Wednesday afternoon. The Synergix org chart.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match the C-suite.',
        pairs: [
          ['CEO', 'Runs the whole company'],
          ['CFO', 'Runs the money'],
          ['COO', 'Runs day-to-day operations'],
          ['CTO', 'Runs technology'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Remi\'s invoice access is stuck. Which part of the business looks after the invoice SYSTEM?',
        options: [
          { text: 'HR', why: 'HR handles people matters, not systems.' },
          { text: 'Technology, under the CTO, and Felix\'s IT team' },
          { text: 'Marketing', why: 'Marketing isn\'t involved here.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Who to ask?',
        groups: ['HR', 'Your line manager'],
        items: [
          { text: 'How many leave days do I have?', group: 0 },
          { text: 'Which task should I do first?', group: 1 },
          { text: 'A question about my contract', group: 0 },
          { text: 'Can I skip the supplier sync?', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'zanele',
        message: 'The new person in Marketing is a PM. So she manages projects, right?',
        prompt: 'What does Remi say?',
        options: [
          { text: 'Could be project manager or product manager. They\'re different jobs. Worth asking her!' },
          { text: 'Yes, definitely.', why: 'PM can mean two different jobs.' },
          { text: 'PM means afternoon.', why: 'Ha. It does on a clock. Not on a job title.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Remi reports to Brian. So Brian is Remi\'s ___ manager. (one word)',
        answers: ['line'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'What is a VP in a company?',
        options: [
          { text: 'The vice president of the country', why: 'In a company, it\'s a senior leader.' },
          { text: 'A very important visitor', why: 'That\'s VIP.' },
          { text: 'A senior leader in charge of an area' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Remi\'s org chart notes. Which line is wrong?',
        lines: [
          'Mr Kamau: CEO.',
          'Brian: Head of Strategy & Operations; my line manager.',
          'Me: Brian\'s line manager.',
        ],
        bug: 2,
        fix: 'Me: Brian\'s direct report.',
        explanation: 'Remi reports TO Brian, so Remi is Brian\'s direct report.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Review.',
        pairs: [
          ['P&L', 'Profit and loss statement'],
          ['In the black', 'Making money'],
          ['OKR', 'A goal plus measurable results'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Decode the org chart line.',
        template: '"Wanjiku reports to the CFO" = Wanjiku\'s line manager runs the company\'s [[1]]. Wanjiku is the CFO\'s direct [[2]].',
        blanks: [['money', 'finances', 'finance'], ['report']],
        distractors: ['technology', 'manager'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the safe question when a title is unclear.',
        tiles: ['What', 'does', 'your', 'team', 'look', 'after?'],
        distractors: ['VP', 'CEO'],
      },
    ],
  },
  reflect: {
    prompt: 'Draw your own org chart: who is above you, beside you and below you, at work, school or in a group you\'re part of? Who is your "line manager"?',
    starters: ['My line manager (or closest equivalent) is...', 'Beside me are...'],
  },
  deepen: {
    title: 'Look up your own org chart',
    summary: 'Find out who your CEO (or head), your line manager and your HR contact are. Knowing who looks after what saves days of asking the wrong person.',
  },
  notes: 'C-suite titles (Cambridge/Investopedia definitions), MD (managing director: common in UK/Commonwealth, often equivalent to CEO), VP (US corporate title), HR, PM (project vs product manager), line manager/direct report (Cambridge). Titles vary by organisation — stated in lesson.',
};

export default lesson;
