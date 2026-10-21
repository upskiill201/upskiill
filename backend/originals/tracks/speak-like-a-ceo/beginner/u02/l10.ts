import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 10. Unit Challenge: the leadership meeting, round two. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Challenge: round two with the CEO',
  summary: 'A week later, Lucía is back in the leadership meeting with a recommendation. Everything from Chapter 2.',
  minutes: 14,
  milestone: 'UNIT_CHALLENGE',
  outcomes: ['Get a decision from senior leaders', 'Use everything from Chapter 2 together'],
  learn: [
    {
      kind: 'reading',
      title: 'Tuesday, 4 p.m.',
      html: '<p><em>"I recommend two things: make chili-lime permanent, and take it to 1,200 convenience stores in Monterrey from October.</em></p><p><em>Why: 38% above target for nine weeks. Risk: the Toluca plant is at 85%, so we\'d add a Saturday shift. We looked at a national launch; it\'s too fast for the plant.</em></p><p><em>Can I have a yes today?"</em></p><p>Señora Ibarra cuts in at minute two: "What does the Saturday shift cost?" Lucía answers in one line, skips her next slide, and goes to the ask.</p><p>On the price rise, she gives her one contribution: test it in one region first. Finance agrees.</p><p>Señora Ibarra: "Yes to both. Good recommendation."</p>',
    },
    {
      kind: 'story',
      title: 'After the meeting',
      beats: [
        { speaker: 'carmen', text: 'She said "recommendation". She never says that. Now the big one: the Encuentro is in three weeks.' },
        { speaker: 'carmen', text: 'Fifteen minutes, 300 people, slides. Tell them what chili-lime taught us.' },
        { speaker: 'tey', text: 'That\'s Chapter 2: recommend, four questions, speak up, disagree well, answer cut-ins. Next: build the talk.' },
      ],
    },
  ],
  apply: {
    scenario: 'Chapter 2 challenge: round two.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What did Señora Ibarra say at the end?',
        options: [
          { text: '"Yes to both. Good recommendation."' },
          { text: '"So what do you want us to do?"', why: 'That was round one.' },
          { text: '"Come back next month."', why: 'She said yes.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which Chapter 2 skill is this?',
        groups: ['Recommend', 'Speak up'],
        items: [
          { text: '"I recommend two things..."', group: 0 },
          { text: 'Test the price rise in one region', group: 1 },
          { text: '"Can I have a yes today?"', group: 0 },
          { text: 'One contribution on another topic', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'At which minute did the CEO cut in?',
        answers: ['2', 'two'],
        placeholder: 'A number',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the moment to the check.',
        pairs: [
          ['Answering the Saturday shift question', 'Answer cut-ins first'],
          ['"We looked at a national launch"', 'What else did you consider?'],
          ['The price rise point', 'One contribution'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Fifteen minutes in front of 300 people. Where do I even start?',
        prompt: "Carmen\'s best reply?",
        options: [
          { text: 'Same place as today: one message. What should 300 people remember on the bus home? Build everything around that.' },
          { text: 'Start with the slides.', why: 'Start with the message.' },
          { text: 'Start with your opening joke.', why: 'Start with the message.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Chapter 2 in one line.',
        template: 'Bring a [[1]], not a report, and answer [[2]].',
        blanks: [['recommendation'], ['first']],
        distractors: ['chart', 'later'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line from round one would fail talk card v2?',
        lines: [
          '"I recommend we make chili-lime permanent."',
          '"Risk: the plant at 85%, so a Saturday shift."',
          '"So, nine weeks of charts, starting with week one..."',
          '"Can I have a yes today?"',
        ],
        bug: 2,
        fix: 'Delete it.',
        explanation: 'That\'s a report, not a recommendation.',
      },
      {
        kind: 'mcq',
        prompt: 'What did finance agree to?',
        options: [
          { text: 'Testing the price rise in one region first' },
          { text: 'Cancelling chili-lime', why: 'A one-region test.' },
          { text: 'A national launch', why: 'A one-region test.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many minutes is Lucía\'s Encuentro talk?',
        answers: ['15', 'fifteen'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order Lucía\'s round two.',
        lines: ['The recommendation', 'Why, risk, what else', 'Answer the cut-in', 'The ask', 'One contribution on price'],
      },
    ],
  },
  reflect: {
    prompt: 'Take a decision you need from someone senior. Prepare it with talk card v2 and ask for it this week.',
    starters: ['I need...', 'They said...'],
  },
  deepen: {
    title: 'From meetings to stages',
    summary: 'Senior meetings and big talks share a core: one message, said first, supported by a few strong reasons. The stage just needs more structure around it.',
  },
  notes: 'Chapter 2 challenge (fictional): CEO approves chili-lime permanent + Monterrey from October, and a one-region price test. Hook: Encuentro in three weeks, 15 minutes, 300 people, slides.',
};

export default lesson;
