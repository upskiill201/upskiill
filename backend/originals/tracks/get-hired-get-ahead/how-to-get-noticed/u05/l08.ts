import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 1 · Chapter 5 · Lesson 8 — skills and recommendations, honestly. Step-by-step. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'Skills and recommendations',
  summary: 'Clinton\'s friends have endorsed him for 34 skills, including "Leadership", "Python" and, somehow, "Accounting". Miracle shows him how to keep skills honest and how to ask for a recommendation that actually means something.',
  minutes: 12,
  outcomes: ['Choose a short, honest skills list', 'Ask for a specific recommendation', 'Write one for someone else'],
  learn: [
    {
      kind: 'steps',
      title: 'Skills and recommendations in four steps',
      steps: [
        { title: '1. Keep skills relevant and true', body: 'List the skills you\'d be happy to be tested on, and that matter for the roles you want. Remove anything you can\'t back up, even if a friend endorsed it. "Accounting" goes.' },
        { title: '2. Put the important ones first', body: 'Pin your top three: the ones in your headline and the adverts you\'re targeting. For Clinton: JavaScript, Python, explaining technical ideas.' },
        { title: '3. Ask for a specific recommendation', body: 'A recommendation is a short written reference on your profile. Ask someone who has seen your work, and be specific: "Could you write two or three lines about the meet-up venue night and how I handled it?" Specific requests get useful recommendations.' },
        { title: '4. Give before you ask', body: 'Write an honest recommendation for someone else first. It\'s generous, it helps them, and people often return the favour. Never write a fake one or trade fake praise.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'One specific recommendation from a real supervisor or mentor is worth more than fifty endorsements from friends.',
    },
  ],
  apply: {
    scenario: 'Clinton tidies his skills and asks for a recommendation.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the steps in order.',
        lines: ['Keep skills relevant and true', 'Put the important ones first', 'Ask for a specific recommendation', 'Give before you ask'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Keep on Clinton\'s skills list, or remove?',
        groups: ['Keep', 'Remove'],
        items: [
          { text: 'JavaScript', group: 0 },
          { text: 'Accounting (a friend clicked it)', group: 1 },
          { text: 'Explaining technical ideas', group: 0 },
          { text: 'Machine learning (watched two videos)', group: 1 },
          { text: 'Event organising', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which recommendation request is best?',
        options: [
          { text: '"Write me a recommendation pls."', why: 'Too vague, and gives them nothing to write about.' },
          { text: '"Mrs Ewane, could you write two or three lines about how I ran the meet-up venue switch? It would help my graduate applications."' },
          { text: '"Say I\'m the best student ever."', why: 'Asking for exaggeration. Ask for something specific and true.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'david',
        message: 'Let\'s write each other amazing recommendations! You say I\'m a genius, I say you are.',
        options: [
          { text: 'Deal, genius for genius.', why: 'Swapped flattery reads as fake. Honest and specific is stronger.' },
          { text: 'No recommendations ever.', why: 'Real ones are valuable. Just keep them honest.' },
          { text: 'Let\'s write honest, specific ones instead: what we\'ve actually seen each other do.' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the weak recommendation.',
        lines: ['"When our venue cancelled an hour before, Clinton moved 40 people to the library calmly; 38 came."', '"Clinton is great. Highly recommend."', '"He explained Git to 12 new members; 9 shipped a project within a month."'],
        bug: 1,
        explanation: 'Kind, but says nothing anyone can picture. Specific beats general.',
      },
      {
        kind: 'mcq',
        prompt: 'Why remove a skill a friend endorsed?',
        options: [
          { text: 'If you can\'t back it up, it can be tested and expose you' },
          { text: 'Endorsements are illegal', why: 'They\'re fine. Untrue skills aren\'t.' },
          { text: 'To have fewer skills', why: 'It\'s about honesty, not the number.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each person to what they could recommend Clinton for.',
        pairs: [
          ['Mrs Ewane', 'Preparation and attention to detail'],
          ['The meet-up\'s sponsor', 'Organising and reliability'],
          ['His mum\'s njangi treasurer', 'Building something useful'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Miracle\'s tip.',
        template: 'One [[1]] recommendation from a real supervisor beats fifty [[2]] from friends.',
        blanks: [['specific'], ['endorsements']],
        distractors: ['vague', 'likes', 'jokes'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many top skills should Clinton pin first? (a number)',
        answers: ['3', 'three'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why write a recommendation for someone else first?',
        options: [
          { text: 'So they owe you a fake one', why: 'Never trade fake praise.' },
          { text: 'It\'s required before asking', why: 'Not required, just kind and effective.' },
          { text: 'It\'s generous, it helps them, and people often return the favour' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Who has seen your work closely enough to write two specific, honest lines about you? What would you ask them to mention?',
    starters: ['I could ask...', 'I\'d ask them to mention...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Write one honest, specific recommendation for a classmate, colleague or volunteer partner today. Then trim your skills list to ones you could be tested on.',
  },
  notes: 'LinkedIn skills, endorsements and recommendations per current platform features (2026). Honesty line consistent with the course (Ch1 l11, Ch3 l11).',
};

export default lesson;
