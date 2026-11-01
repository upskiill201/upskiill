import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 8. Explain cards: pricing your own time (Ama's posters). */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'Pricing your own time',
  summary: 'Miracle\'s friend Ama designs event posters and charges "whatever people offer", usually 3,000. Clinton shows her the same method he used for WashDay, this time for her hours.',
  minutes: 12,
  outcomes: [
    'Work out a minimum hourly rate for your own work',
    'Turn an hourly rate into a price for a job',
    'Price above the minimum when the value is high',
  ],
  learn: [
    {
      kind: 'text',
      html: '<p>Ama designs posters for campus events. She charges whatever people offer, usually 3,000 FCFA, and each poster takes her about 3 hours. That\'s 1,000 an hour, before her costs.</p><p>Clinton walks her through it:</p><table><tr><th>Step</th><th>Ama\'s numbers</th></tr><tr><td>Monthly costs (design app, data, laptop savings)</td><td>15,000 FCFA</td></tr><tr><td>What she wants to earn a month</td><td>60,000 FCFA</td></tr><tr><td>Hours she can really bill a month (not all her hours: messages and edits take time too)</td><td>30</td></tr><tr><td><strong>Minimum rate: (15,000 + 60,000) ÷ 30</strong></td><td><strong>2,500 FCFA an hour</strong></td></tr></table><p>A 3-hour poster: 3 × 2,500 = <strong>7,500 FCFA</strong>. That\'s her floor, the least she can charge.</p><p>But a poster for a 500-person concert is worth more to the organiser than a poster for a study group. For events with tickets, Ama now charges <strong>10,000</strong>: a value price, above the floor. Same method as WashDay: know the floor, then price the value.</p>',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Minimum hourly rate = (monthly costs + income you need) ÷ hours you can really bill.',
    },
  ],
  apply: {
    scenario: 'Ama\'s rate.',
    items: [
      {
        kind: 'typeAnswer',
        prompt: 'Ama\'s old way: 3,000 for 3 hours. How much was she earning per hour, in FCFA?',
        answers: ['1000', '1,000'],
        placeholder: 'A number',
      },
      {
        kind: 'typeAnswer',
        prompt: '(15,000 + 60,000) ÷ 30. What is Ama\'s minimum rate per hour, in FCFA?',
        answers: ['2500', '2,500'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why does Ama divide by 30 hours, not all the hours she works?',
        options: [
          { text: 'She only works 30 hours', why: 'She works more; only 30 are billable.' },
          { text: 'It makes the rate look lower', why: 'It makes it higher, and honest.' },
          { text: 'Messages, edits and finding clients take time nobody pays for' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the WashDay idea to Ama\'s version.',
        pairs: [
          ['Cost per bag', 'Monthly costs per billable hour'],
          ['Price floor', '7,500 for a 3-hour poster'],
          ['Value price', '10,000 for a ticketed event'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Floor price or value price?',
        groups: ['Floor', 'Value'],
        items: [
          { text: '7,500 for a study-group poster', group: 0 },
          { text: '10,000 for a 500-person concert', group: 1 },
          { text: 'Hours × minimum rate', group: 0 },
          { text: 'What the result is worth to the client', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'clinton',
        message: 'Ama says 7,500 feels too much to ask a friend.',
        prompt: "Miracle's best reply?",
        options: [
          { text: 'Then 3,000 is fine.', why: 'It doesn\'t cover her costs and income.' },
          { text: 'At 3,000 she\'s paying to work. She can do a favour for a friend now and then, but her price should keep her going.' },
          { text: 'Charge friends double.', why: 'Fair, not punishing.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'The method.',
        template: 'Know your [[1]], then price the [[2]].',
        blanks: [['floor', 'costs'], ['value']],
        distractors: ['logo', 'friends'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'A 4-hour poster at Ama\'s minimum rate. What is the floor price, in FCFA?',
        answers: ['10000', '10,000'],
        placeholder: 'A number',
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Ama\'s new price message is the mistake?',
        lines: [
          'Event posters from 7,500 FCFA.',
          'Ticketed events: 10,000 FCFA.',
          'Two rounds of changes included.',
          'Or pay whatever you think it\'s worth.',
        ],
        bug: 3,
        fix: 'Delete it: she has a price now.',
        explanation: '"Whatever you think" took her back to 3,000.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order the steps to price your time.',
        lines: ['Add up monthly costs', 'Decide the income you need', 'Count hours you can bill', 'Divide to get the minimum rate', 'Price above it when value is high'],
      },
    ],
  },
  reflect: {
    prompt: 'Work out your own minimum hourly rate. How does it compare with what you charge now?',
    starters: ['My costs are...', 'My minimum rate is...'],
  },
  deepen: {
    title: 'Underpricing yourself',
    summary: 'Freelancers who start out often price by what feels polite to ask. Writing down costs, needed income and billable hours turns a feeling into a number you can defend.',
  },
  notes: 'Fictional: Ama (Miracle\'s friend, poster designer). Old: 3,000 for 3 hours (1,000/h). Minimum rate (15,000 + 60,000) ÷ 30 billable hours = 2,500 FCFA/h; 3-hour floor 7,500; value price 10,000 for ticketed events.',
};

export default lesson;
