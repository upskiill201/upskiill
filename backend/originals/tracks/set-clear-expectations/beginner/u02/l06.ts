import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 6. Step-by-step: team working agreements (team charters; Mathieu & Rapp 2009). */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'How we work together',
  summary: 'Day 9. Kavya works 11 a.m. to 9 p.m. and expects instant replies. Joel works 7 a.m. to 4 p.m. and reads messages twice a day. Both think the other is being difficult. Neither ever said how they work. Tey suggests a working agreement.',
  minutes: 12,
  outcomes: [
    'Know what a working agreement is',
    'Write one with your team in five steps',
    'Use it to settle friction without making it personal',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'A working agreement in five steps',
      steps: [
        { title: '1. Write it together', body: 'Not Arjun\'s rules. A 30-minute call where everyone adds lines. Research by John Mathieu and Tammy Rapp (2009) found that teams that created good team charters early tended to perform better over time.' },
        { title: '2. Hours and replies', body: '"Overlap hours 11 a.m. to 4 p.m. Urgent: call. Normal: reply the same day." Kavya and Joel\'s whole conflict, settled in two lines.' },
        { title: '3. How work moves', body: '"Every change goes through a pull request. Reviews within 24 hours. Nobody merges their own work." The rules for handing work over.' },
        { title: '4. When things go wrong', body: '"If you\'re stuck for more than an hour, say so. If you break something, say so straight away. No blame." Write the hard things down while everyone is calm.' },
        { title: '5. Review it', body: 'Check it every week for two minutes: "Is anything not working?" Agreements are living documents, not laws.' },
      ],
    },
    {
      kind: 'compare',
      title: 'Kavya and Joel, before and after',
      before: { label: 'No agreement', text: 'Kavya, 8:40 p.m.: "Joel?? Need you on this." Joel, 7:05 a.m.: "Sorry, just seen this." Kavya thinks Joel is slow. Joel thinks Kavya is pushy.' },
      after: { label: 'Working agreement', text: 'Kavya, 8:40 p.m.: posts it for the morning, marked "normal". Joel answers at 7:05 a.m. Both are following the same rules, so nobody is "difficult".' },
      notes: ['The friction was never about character. It was unspoken expectations.', 'The agreement makes the rule the issue, not the person.', 'Written together, so nobody feels ruled.'],
    },
  ],
  apply: {
    scenario: 'Day 9, the friction.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the five steps in order.',
        lines: ['Write it together', 'Hours and replies', 'How work moves', 'When things go wrong', 'Review it'],
      },
      {
        kind: 'mcq',
        prompt: 'What was the real cause of Kavya and Joel\'s friction?',
        options: [
          { text: 'Unspoken expectations about hours and replies' },
          { text: 'Joel is slow', why: 'He works different hours.' },
          { text: 'Kavya is pushy', why: 'She works different hours.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Good working-agreement line, or not?',
        groups: ['Good line', 'Not a good line'],
        items: [
          { text: 'Overlap hours 11 a.m. to 4 p.m.', group: 0 },
          { text: 'Be nice', group: 1 },
          { text: 'Stuck over an hour? Say so.', group: 0 },
          { text: 'Work hard', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'joel',
        message: 'Do I have to be online at 9 p.m. now?',
        prompt: 'Arjun\'s best reply?',
        options: [
          { text: 'Yes, to match Kavya.', why: 'That\'s one person\'s habit becoming everyone\'s rule.' },
          { text: 'Up to you.', why: 'Then nothing is agreed.' },
          { text: 'No. Overlap is 11 to 4. Outside that, normal messages wait for the morning. Urgent ones are a call, and those should be rare.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Mathieu and Rapp found early team ___ were linked to better performance. (one word)',
        answers: ['charters', 'Charters', 'charter'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Why write down "when things go wrong" rules early?',
        options: [
          { text: 'To have something to punish people with', why: 'It\'s "no blame", on purpose.' },
          { text: 'Nothing will go wrong', why: 'It always does.' },
          { text: 'It\'s easier to agree the hard things while everyone is calm' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Arjun\'s draft agreement. Which line breaks step 1?',
        lines: [
          'Overlap hours 11 a.m. to 4 p.m.',
          'These are my rules; I\'ll send them tonight.',
          'Reviews within 24 hours.',
        ],
        bug: 1,
        fix: 'We\'ll write these together on Thursday\'s call.',
        explanation: 'Rules handed down feel like control. Rules written together feel like ours.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the line to the step.',
        pairs: [
          ['"Reply the same day"', 'Hours and replies'],
          ['"Nobody merges their own work"', 'How work moves'],
          ['"Broke something? Say so."', 'When things go wrong'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'Make the [[1]] the issue, not the [[2]].',
        blanks: [['rule', 'agreement'], ['person']],
        distractors: ['team', 'client'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the review question.',
        tiles: ['Is', 'anything', 'not', 'working?'],
        distractors: ['Who'],
      },
    ],
  },
  reflect: {
    prompt: 'What\'s one unspoken expectation in a group you\'re part of (reply times, hours, how work is shared)? What would the written line be?',
    starters: ['The unspoken expectation is...', 'The written line: ...'],
  },
  deepen: {
    title: 'Three lines',
    summary: 'With one group you work with, agree three lines: when you overlap, how fast you reply, and what to do when stuck. Review them in a week.',
  },
  notes: 'John E. Mathieu & Tammy L. Rapp (2009), "Laying the foundation for successful team performance trajectories: The roles of team charters and performance strategies", J. Applied Psychology 94(1). Working agreements: common agile team practice. Fictional details.',
};

export default lesson;
