import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 10. Unit Challenge: the reply to Mr Pryce. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Challenge: the reply to Mr Pryce',
  summary: 'Tuesday morning. Three drafts of the reply sit on Arjun\'s screen: Joel\'s, Kavya\'s and his own. Only one keeps the deal alive and the price on the table. Everything from Chapter 1.',
  minutes: 14,
  milestone: 'UNIT_CHALLENGE',
  outcomes: ['Write a calm, firm reply to an extreme offer', 'Use everything from Chapter 1 together'],
  learn: [
    {
      kind: 'reading',
      title: 'Three drafts',
      html: '<p><strong>Joel\'s:</strong> "Thank you! We can make £28,000 work. Looking forward to it!"</p><p><strong>Kavya\'s:</strong> "Your offer shows a complete lack of respect for our work. £48,000 is our price."</p><p><strong>Arjun\'s:</strong> "Thanks for coming back so quickly, Mr Pryce. £28,000 doesn\'t cover the 16-week scope in our quote, but we\'d really like to work with Harlow &amp; Finch. Could we have a 30-minute call on Wednesday? I\'d like to understand how you reached £28,000, what matters most to Ms Okafor-Lane\'s team, and what the spring launch needs. Then we can look at options together."</p><p>He sends his. An hour later: <em>"Wednesday 2 p.m. UK. I\'ll bring Ms Okafor-Lane."</em></p>',
    },
    {
      kind: 'story',
      title: 'Wednesday, 2 p.m.',
      beats: [
        { speaker: 'grace', text: 'You didn\'t give in, didn\'t fight, and you got the person who needs the app on the call.' },
        { speaker: 'kavya', text: 'Fine. Mine was better for my blood pressure, though.' },
        { speaker: 'tey', text: 'That\'s Chapter 1: pause, the balcony, people vs problem, names for feelings, questions. Next: the tactics.' },
      ],
    },
  ],
  apply: {
    scenario: 'Chapter 1 challenge: the reply.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Whose draft did this?',
        groups: ['Joel', 'Kavya', 'Arjun'],
        items: [
          { text: 'Gave in to the anchor', group: 0 },
          { text: 'Attacked the person', group: 1 },
          { text: 'Asked for a call with questions', group: 2 },
          { text: 'Said no to the number, yes to talking', group: 2 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What did Arjun\'s reply achieve?',
        options: [
          { text: 'It accepted £28,000', why: 'It said £28,000 doesn\'t cover the scope.' },
          { text: 'It ended the negotiation', why: 'It opened a call.' },
          { text: 'It kept the deal alive and brought Ms Okafor-Lane onto the call' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the part of Arjun\'s reply to its job.',
        pairs: [
          ['"Thanks for coming back so quickly"', 'Soft on the person'],
          ['"Doesn\'t cover the 16-week scope"', 'Hard on the problem'],
          ['"How you reached £28,000"', 'A cooling question'],
          ['"Look at options together"', 'Shared problem-solving'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How long a call did Arjun ask for, in minutes?',
        answers: ['30', 'thirty'],
        placeholder: 'A number',
      },
      {
        kind: 'chatReply',
        from: 'joel',
        message: 'Why didn\'t we just repeat £48,000 in the reply?',
        prompt: "Arjun's best reply?",
        options: [
          { text: 'Because £48,000 was wrong.', why: 'The quote stands; it\'s about timing.' },
          { text: 'Repeating it starts a tug of war. First I want to know what they need. The price conversation is on the call.' },
          { text: 'Because we\'ll accept £28,000.', why: 'He said it doesn\'t cover the scope.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'The reply in a line.',
        template: 'No to the [[1]], yes to the [[2]].',
        blanks: [['number', 'price'], ['conversation', 'call']],
        distractors: ['client', 'insult'],
      },
      {
        kind: 'mcq',
        prompt: 'Why ask about "what the spring launch needs"?',
        options: [
          { text: 'The launch date is a real constraint and a reason to choose a team that can deliver' },
          { text: 'To change the subject', why: 'It\'s the core of their need.' },
          { text: 'To sound busy', why: 'It finds the deal.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which line would ruin Arjun\'s reply?',
        lines: [
          'Thanks for coming back so quickly.',
          '£28,000 doesn\'t cover the 16-week scope.',
          'Between us, we could go down to £36,000.',
          'Could we have a call on Wednesday?',
        ],
        bug: 2,
        fix: 'Delete it.',
        explanation: 'It reveals his walk-away.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Arjun\'s quote minus his walk-away: £48,000 − £36,000. How much room, in pounds?',
        answers: ['12000', '12,000', '£12,000'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order Arjun\'s reply.',
        lines: ['Thank him', 'Say the number doesn\'t cover the scope', 'Say you want to work together', 'Ask for a call with questions', 'Offer to look at options'],
      },
    ],
  },
  reflect: {
    prompt: 'Write a calm, firm reply to an extreme offer or demand you\'ve had, using Arjun\'s structure.',
    starters: ['Thanks for...', '... doesn\'t work because...'],
  },
  deepen: {
    title: 'Get the right people in the room',
    summary: 'Hard negotiations often get easier when the person who needs the result joins. Asking questions about their needs is a polite way to invite them.',
  },
  notes: 'Chapter 1 challenge (fictional): three drafts; Arjun\'s reply gets a Wednesday 2 p.m. UK call with Mr Pryce and Ms Okafor-Lane. Quote £48,000; walk-away £36,000.',
};

export default lesson;
