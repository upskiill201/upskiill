import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 2 · Chapter 1 · Lesson 16 — networking and hidden-job myths. Myth or Fact. */
const lesson: OriginalLesson = {
  key: 'l16',
  title: 'Networking myths',
  summary: '"Networking is just using people." "80% of jobs are hidden." "Introverts can\'t network." The final-year group chat has opinions again. Myth or fact?',
  minutes: 11,
  outcomes: ['Spot common networking myths', 'Know which hidden-job statistics to distrust', 'Network in a way that suits you'],
  learn: [
    {
      kind: 'myth',
      statements: [
        { text: 'Networking is just using people for favours.', isFact: false, explain: 'Done well, it\'s asking for advice, saying thank you, and helping back. Clinton reported back to Tchami and shared his notes with the meet-up. That\'s a relationship, not a transaction.' },
        { text: 'Exactly 80% of jobs are never advertised.', isFact: false, explain: 'This number is everywhere, but nobody has found a solid study behind it. What is well supported: many roles are filled through referrals and networks, sometimes before they\'re posted.' },
        { text: 'People you know only a little can help your job search a lot.', isFact: true, explain: 'The weak-ties research (Granovetter, 1973; the LinkedIn study in Science, 2022) found moderately weak ties led to the most job moves.' },
        { text: 'Introverts can\'t network.', isFact: false, explain: 'One-to-one calls, thoughtful written messages and small events suit many introverts better than big parties. Networking isn\'t one style.' },
        { text: 'You should only network when you need a job.', isFact: false, explain: 'It\'s much easier to ask for help from people you\'ve already been in touch with. Keep in touch even when you\'re not looking.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Distrust exact "hidden jobs" percentages. Trust what\'s well supported: people, conversations and weak ties matter.',
    },
  ],
  apply: {
    scenario: 'Clinton busts the group chat\'s networking myths.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Fact', 'Myth'],
        items: [
          { text: 'Weak ties can help a lot', group: 0 },
          { text: 'Exactly 80% of jobs are hidden', group: 1 },
          { text: 'Introverts can\'t network', group: 1 },
          { text: 'Many roles are filled through networks', group: 0 },
          { text: 'Only network when you need a job', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What\'s wrong with "80% of jobs are hidden"?',
        options: [
          { text: 'Nobody has found a solid study behind the exact number' },
          { text: 'The real number is 99%', why: 'No reliable study gives an exact number either way.' },
          { text: 'Nothing, it\'s proven', why: 'It\'s widely repeated, not proven.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'david',
        message: 'I\'m an introvert. Networking events make me want to hide in the toilet.',
        options: [
          { text: 'Then start with one-to-one calls and written messages. Networking isn\'t only big parties.' },
          { text: 'Then you can\'t get a job.', why: 'False, and unkind. There are other styles.' },
          { text: 'Force yourself to talk to 50 people.', why: 'Start with what suits you.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the myth.',
        lines: ['Asking for advice is a good way to start.', 'Networking is just using people.', 'Saying thank you and reporting back builds relationships.'],
        bug: 1,
        explanation: 'Done well, it\'s a two-way relationship: advice, thanks and helping back.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each myth to the truth.',
        pairs: [
          ['Networking is using people', 'It\'s advice, thanks and helping back'],
          ['Introverts can\'t network', 'One-to-one calls and messages work well'],
          ['Only network when job hunting', 'Keep in touch when you\'re not looking'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which sentence should Clinton use in his meet-up talk?',
        options: [
          { text: '"Many roles are filled through people, sometimes before they\'re posted."' },
          { text: '"Exactly 80% of jobs are hidden."', why: 'No solid source. Use the safe wording.' },
          { text: '"No jobs are ever advertised."', why: 'False. Many are.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the safe wording.',
        template: 'Many roles are filled through [[1]] and networks, sometimes before they\'re [[2]].',
        blanks: [['referrals'], ['posted', 'advertised']],
        distractors: ['luck', 'hired', 'robots'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'In what year did Granovetter publish The Strength of Weak Ties? (a number)',
        answers: ['1973'],
        placeholder: 'A year',
      },
      {
        kind: 'sortGroups',
        prompt: 'Good for an introvert, or harder?',
        groups: ['Often easier', 'Often harder'],
        items: [
          { text: 'A written message to one person', group: 0 },
          { text: 'A loud party of 200', group: 1 },
          { text: 'A 15-minute video call', group: 0 },
          { text: 'Shouting across a crowded room', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'Someone says I should stop talking to Tchami now he\'s helped me. Fair?',
        options: [
          { text: 'No: I\'ll keep in touch, report back and help him if I can. That\'s how it works.' },
          { text: 'Yes, I\'ve got what I needed.', why: 'Relationships last longer than one favour.' },
          { text: 'Ask him for a bigger favour next.', why: 'Give back, too.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Which myth have you believed about networking? How would you network in a way that suits your personality?',
    starters: ['I used to think...', 'My style could be...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Next time you see a "X% of jobs are hidden" claim, search for its source. Notice how often there isn\'t one.',
  },
  notes: 'Per the outline facts list: no "70–80% of jobs are hidden" statistic; the lesson teaches distrust of it. Weak ties: Granovetter (1973); Rajkumar et al., Science (2022).',
};

export default lesson;
