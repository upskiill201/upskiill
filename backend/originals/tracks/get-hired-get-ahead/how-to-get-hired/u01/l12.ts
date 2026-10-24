import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 2 · Chapter 1 · Lesson 12 — where hidden jobs live. Card deck (text). */
const lesson: OriginalLesson = {
  key: 'l12',
  title: 'Where hidden jobs live',
  summary: 'Miracle draws Clinton a map of the places jobs show up before they\'re advertised, if they ever are. Some are online. Most are in rooms, chats and conversations he\'s already near.',
  minutes: 11,
  outcomes: ['Name five places hidden jobs show up', 'Choose the ones that fit your field', 'Watch for signs a company is about to hire'],
  learn: [
    {
      kind: 'text',
      html: '<p><strong>1. People in the field.</strong> The weak ties from lesson 2: meet-up speakers, alumni, friends of friends. They hear "we need someone" before HR writes an advert.</p>',
    },
    {
      kind: 'text',
      html: '<p><strong>2. Communities and events.</strong> Meet-ups, hackathons, conferences, professional groups, WhatsApp and Telegram communities in your field. People often mention openings there first: "Anyone know a junior developer?"</p>',
    },
    {
      kind: 'text',
      html: '<p><strong>3. Your university.</strong> Careers offices, lecturers and alumni networks hear directly from employers. Mrs Ewane gets emails like "Do you have a student who could help us for three months?" that never become adverts.</p>',
    },
    {
      kind: 'check',
      question: 'A founder posts in a developer WhatsApp group: "Anyone know a junior developer?" What is that?',
      options: ['Spam', 'A hidden job opening', 'Nothing useful'],
      answer: 1,
      explanation: 'That\'s exactly how many roles show up before, or instead of, an advert.',
    },
    {
      kind: 'text',
      html: '<p><strong>4. Growing companies.</strong> Watch for signals: a company just raised money, launched a new product, opened a new office or won a big contract. Growing teams need people, often before they\'ve had time to write an advert.</p>',
    },
    {
      kind: 'text',
      html: '<p><strong>5. Small companies and start-ups.</strong> They often hire by asking around because they don\'t have an HR team. A short, specific message to the founder can arrive at exactly the right moment.</p>',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'People, communities, your university, growing companies, small companies. Be near them, and listen.',
    },
  ],
  apply: {
    scenario: 'Clinton looks for hidden jobs.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'A hidden-job place, or a visible one?',
        groups: ['Hidden', 'Visible'],
        items: [
          { text: 'A developer WhatsApp group', group: 0 },
          { text: 'A national job board', group: 1 },
          { text: 'The careers office\'s inbox', group: 0 },
          { text: 'A company\'s published graduate scheme', group: 1 },
          { text: 'A hackathon', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Which news suggests a company might hire soon?',
        options: [
          { text: 'It changed its logo colour', why: 'Not a hiring signal.' },
          { text: 'It just raised money for a new product' },
          { text: 'Its CEO went on holiday', why: 'Not a hiring signal. Look for growth.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each place to an example.',
        pairs: [
          ['Communities', 'A founder posting in a developer chat'],
          ['Your university', 'An employer emailing Mrs Ewane'],
          ['Growing companies', 'A start-up that just opened a Douala office'],
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'Kmer Logistics just won a contract with a big supermarket chain. Is that useful to know?',
        options: [
          { text: 'No, it\'s just business news.', why: 'Growth is a hiring signal.' },
          { text: 'I\'ll demand a job because they\'re rich now.', why: 'Use it as a reason to talk, politely.' },
          { text: 'Yes: a growing team might need help soon. I\'ll mention it when I message the founder.' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the wrong idea.',
        lines: ['Small companies often hire by asking around.', 'Start-ups always post every role on big job boards.', 'Careers offices hear from employers directly.'],
        bug: 1,
        explanation: 'Many small companies skip adverts and ask their network instead.',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which community should Clinton join first?',
        options: [
          { text: 'A Douala developer group where fintech people talk' },
          { text: 'A celebrity fan page', why: 'Not his field.' },
          { text: 'A group selling exam answers', why: 'Never. And it\'s not his field.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Miracle\'s map.',
        template: 'Growing teams need [[1]] before they\'ve written an [[2]].',
        blanks: [['people'], ['advert', 'ad']],
        distractors: ['money', 'office', 'email'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many places are on Miracle\'s map? (a number)',
        answers: ['5', 'five'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Hiring signal, or not?',
        groups: ['Signal', 'Not a signal'],
        items: [
          { text: 'Opened a new office', group: 0 },
          { text: 'Launched a new product', group: 0 },
          { text: 'Posted a birthday message', group: 1 },
          { text: 'Won a big contract', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why do small companies often skip adverts?',
        options: [
          { text: 'Adverts are illegal for them', why: 'Not illegal. They just ask their network.' },
          { text: 'They never hire', why: 'They hire, often quietly.' },
          { text: 'They often have no HR team, so they ask around' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Which of the five places are you nearest to already? Which one could you join this month?',
    starters: ['I\'m already near...', 'This month I\'ll join...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Find two communities (online or in person) in your field near you. Join them, and just listen for a week before posting.',
  },
  notes: 'Places hidden roles appear: common careers-service guidance; no statistics used. Kmer Logistics is invented. Where you live: community platforms differ by country (WhatsApp, Telegram, Slack, Discord); check what people in your field use locally.',
};

export default lesson;
