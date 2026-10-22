import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 6. Reading: asking without backlash. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'Asking without backlash',
  summary: 'Ngozi asks: "Didn\'t you worry Tobi would think you were pushy?" Ada did. Lucía sends her the research on why some askers get pushback, and how the way you frame an ask changes it.',
  minutes: 12,
  outcomes: [
    'Know what the research says about backlash for asking',
    'Frame an ask around the relationship and shared goals',
    'Stay firm without sounding demanding',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'Why some asks land badly',
      html: '<p>In a set of experiments, Hannah Riley Bowles, Linda Babcock and Lei Lai (2007) asked people to watch or read job candidates negotiating pay. Evaluators were often <strong>less willing to work with women who asked for more</strong>, even when the ask was identical to a man\'s. That\'s the backlash Ada was afraid of, and it\'s real.</p><p>Later research by Bowles and Babcock (2013) tested ways to ask that reduced it. What helped was a <strong>"relational account"</strong>: explaining why the ask is good for the relationship or the team, not just for you. It also helped to show you care about the organisation\'s concerns.</p><p>Ada\'s ask did both:</p><ul><li><em>"I want to keep doing the work the team relies on, and lead the design system properly."</em> (the team)</li><li><em>"I know budgets are set by quarter. Could we find something that works this quarter?"</em> (his concerns)</li></ul><p>This isn\'t asking for less. Ada still said ₦480,000. It\'s about framing. The unfairness belongs to the evaluators, not the askers, but until it changes, framing helps everyone.</p>',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Frame your ask around shared goals and their concerns. Ask for just as much; just explain it as good for the relationship too.',
    },
  ],
  apply: {
    scenario: 'Backlash.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What did Bowles, Babcock and Lai (2007) find?',
        options: [
          { text: 'Nobody minds anyone asking', why: 'They found real backlash.' },
          { text: 'Evaluators were often less willing to work with women who negotiated, even for the same ask' },
          { text: 'Women shouldn\'t ask', why: 'The problem is the evaluators\' bias, not asking.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'What kind of "account" reduced backlash in the 2013 research? (one word)',
        answers: ['relational', 'Relational'],
        placeholder: 'One word',
      },
      {
        kind: 'sortGroups',
        prompt: 'Relational framing, or self-only?',
        groups: ['Relational', 'Self-only'],
        items: [
          { text: '"I want to keep doing the work the team relies on."', group: 0 },
          { text: '"I just want more money."', group: 1 },
          { text: '"I know budgets are set by quarter."', group: 0 },
          { text: '"I deserve it, full stop."', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the framing to its effect.',
        pairs: [
          ['Shared goal', 'Shows the ask helps the team'],
          ['Their concerns', 'Shows you understand their limits'],
          ['Same number', 'You still ask for full value'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'So I should ask for less, to be safe?',
        prompt: "Lucía's best reply?",
        options: [
          { text: 'Yes, ask for less.', why: 'The research is about framing, not lowering.' },
          { text: 'Don\'t ask at all.', why: 'Not asking costs far more.' },
          { text: 'No. Ask for the same ₦480,000. Change the framing, not the number.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'Change the [[1]], not the [[2]].',
        blanks: [['framing', 'frame'], ['number', 'amount']],
        distractors: ['job', 'manager'],
      },
      {
        kind: 'mcq',
        prompt: 'Who does the unfairness belong to?',
        options: [
          { text: 'The people asking', why: 'Asking isn\'t the problem.' },
          { text: 'The evaluators who react with bias' },
          { text: 'Nobody, it\'s fair', why: 'Identical asks were judged differently.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Which line in Ada\'s ask is the self-only framing?',
        lines: [
          'I want to lead the design system properly.',
          'I know budgets are set by quarter.',
          'Honestly, I just want the money.',
          'Could we find something that works for both of us?',
        ],
        bug: 2,
        fix: 'It would let me keep doing the work the team relies on.',
        explanation: 'Same ask, framed around the team.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'In what year did Bowles, Babcock and Lai publish their backlash study?',
        answers: ['2007'],
        placeholder: 'A year',
      },
      {
        kind: 'orderLines',
        prompt: 'Order a relational ask.',
        lines: ['Name the shared goal', 'Show you understand their concerns', 'State your full number', 'Ask how to make it work together'],
      },
    ],
  },
  reflect: {
    prompt: 'Rewrite your own ask so it explains why it\'s good for the relationship or team, without lowering the number.',
    starters: ['This would help us because...', 'I know you\'re concerned about...'],
  },
  deepen: {
    title: 'Fixing the system',
    summary: 'Researchers also point to organisational fixes: clear pay ranges, telling everyone that offers are negotiable, and judging asks by their content. Framing helps individuals; transparency helps everyone.',
  },
  notes: 'Bowles, Babcock & Lai (2007), "Social incentives for gender differences in the propensity to initiate negotiations: Sometimes it does hurt to ask", OBHDP 103(1). Bowles & Babcock (2013), "How can women escape the social incentives against negotiating? Relational accounts", Psychology of Women Quarterly 37(1).',
};

export default lesson;
