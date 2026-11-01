import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 8. Card deck: staying consistent without being rigid (Moscovici minority influence; Mugny on rigidity). */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'Steady, not stubborn',
  summary: 'Some people at Synergix still roll their eyes at "the refund project". A manager in Sales calls it "Remi\'s little crusade". Remi wonders if he should push harder, or quietly give up. Tey deals out cards on how small groups change big ones.',
  minutes: 11,
  outcomes: [
    'Know how a small group can change a bigger one',
    'Stay consistent on the goal while staying flexible on details',
    'Avoid sounding rigid or preachy',
  ],
  learn: [
    {
      kind: 'text',
      html: "<p>Social psychologist <strong>Serge Moscovici</strong> studied how minorities, small groups without power, sometimes change what the majority thinks. His experiments in the 1960s and 70s suggested one quality matters most: <strong>consistency</strong>. Here are the cards.</p>",
    },
    {
      kind: 'text',
      html: "<h3>Card 1: Same message, every time</h3><p>In Moscovici's studies, a small group that consistently gave the same answer shifted the majority's views. A group that wavered had little effect. For Remi: the same goal, the same number, every week.</p><h3>Card 2: Consistent, not rigid</h3><p>Later research by <strong>Gabriel Mugny</strong> found that minorities who seem rigid and unwilling to give an inch lose influence. Be firm on the goal and flexible on the how. Felix's Week 5 change is a detail. \"Five days\" is the goal.</p><h3>Card 3: Show evidence, not just conviction</h3><p>Repeating \"this matters\" isn't enough. The weekly chart is evidence. Sceptics can argue with opinions. It's harder to argue with a line going down.</p>",
    },
    {
      kind: 'text',
      html: "<h3>Card 4: Don't preach</h3><p>\"Customers deserve better!\" every day starts to sound like a lecture. Let results and other people's voices do the work: Njeri telling her team, Wanjiku telling Finance.</p><h3>Card 5: Win the curious, not the cynics</h3><p>You don't need everyone. Focus on the people who are curious. Cynics often come round once most people around them have.</p><h3>Card 6: Expect it to take time</h3><p>Minority influence often works slowly, and sometimes shows up later than expected. Sales' eye-rolling today may be curiosity next month.</p>",
    },
    {
      kind: 'check',
      question: 'What made minorities lose influence in Mugny\'s research?',
      options: ['Seeming rigid and unwilling to give an inch', 'Being consistent', 'Showing evidence'],
      answer: 0,
      explanation: 'Firm on the goal, flexible on the details.',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Same goal, every time. Flexible on the how. Show evidence. Don\'t preach. Win the curious. Give it time.',
    },
  ],
  apply: {
    scenario: '"Remi\'s little crusade."',
    items: [
      {
        kind: 'mcq',
        prompt: 'According to Moscovici, what helps a small group change a bigger one?',
        options: [
          { text: 'Volume', why: 'Louder isn\'t the finding.' },
          { text: 'Seniority', why: 'Minorities by definition lack it.' },
          { text: 'Consistency' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Steady or stubborn?',
        groups: ['Steady', 'Stubborn'],
        items: [
          { text: 'Same goal every week', group: 0 },
          { text: 'Refusing any change to the plan', group: 1 },
          { text: 'Moving the screen to Week 5', group: 0 },
          { text: '"My way or no way."', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'zanele',
        message: 'Sales called it "Remi\'s little crusade". Should we email them the chart?',
        prompt: 'Remi\'s best reply?',
        options: [
          { text: 'Not to win an argument. Let\'s just keep sharing the chart where people already look. The curious ones will ask.' },
          { text: 'Yes, and a long email about why they\'re wrong.', why: 'Preaching to cynics.' },
          { text: 'Maybe they\'re right and we should stop.', why: 'The line is going down. Stay steady.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Firm on the goal, ___ on the details. (one word)',
        answers: ['flexible', 'Flexible'],
        placeholder: 'One word',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the card to the move.',
        pairs: [
          ['Same message', '"Five days" every week'],
          ['Show evidence', 'The chart going down'],
          ['Win the curious', 'Answer people who ask'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why let Njeri and Wanjiku tell the story instead of Remi?',
        options: [
          { text: 'Remi is shy', why: 'It\'s about how the message lands.' },
          { text: 'Other voices sound like evidence; one voice repeating sounds like preaching' },
          { text: 'They outrank him', why: 'They don\'t, mostly.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Remi\'s plan for the sceptics. Which line is preachy?',
        lines: [
          'Keep the chart on the Finance door and warehouse board.',
          'Remind Sales daily that customers deserve better.',
          'Answer anyone who asks, with the numbers.',
        ],
        bug: 1,
        fix: 'Let the results speak, and answer when Sales asks.',
        explanation: 'Daily lectures turn sceptics into opponents.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put staying steady in order.',
        lines: ['Keep the goal the same', 'Adjust the details when needed', 'Share the evidence', 'Let others tell the story'],
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: '[[1]], not stubborn. Show [[2]], don\'t [[3]].',
        blanks: [['Steady', 'Consistent', 'steady'], ['evidence', 'results'], ['preach', 'lecture']],
        distractors: ['Loud', 'hide'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Remi\'s mantra.',
        tiles: ['Same', 'goal,', 'every', 'week.'],
        distractors: ['new'],
      },
    ],
  },
  reflect: {
    prompt: 'Is there an idea you believe in that most people around you don\'t yet? How could you be steady about it without being stubborn or preachy?',
    starters: ['The idea is...', 'Steady, for me, would mean...'],
  },
  deepen: {
    title: 'Find the curious one',
    summary: 'For an idea you care about, find one curious person (not the loudest sceptic) and share your evidence with them. Let them tell the next person.',
  },
  notes: 'Serge Moscovici, Elisabeth Lage & Martine Naffrechoux (1969), "Influence of a consistent minority on the responses of a majority in a color perception task", Sociometry 32(4); Moscovici, Social Influence and Social Change (1976). Gabriel Mugny (1982), The Power of Minorities: rigid vs flexible negotiating styles. Delayed/indirect minority influence: Wood et al. (1994) meta-analysis, hedged.',
};

export default lesson;
