import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 2 · Chapter 1 · Lesson 20 — Chapter Challenge: the Monday call with Kmer Logistics; a part-time internship offer. */
const lesson: OriginalLesson = {
  key: 'l20',
  title: 'Chapter Challenge: the job nobody posted',
  summary: 'Monday, 10am. Mr Tamba, Kmer Logistics\' founder, calls: "We\'d like you to join us part-time for three months, helping on the delivery tracker. Interested?" Everything from this chapter, and piece 1 of your new kit.',
  minutes: 15,
  milestone: 'UNIT_CHALLENGE',
  outcomes: ['Use weak ties, advice requests and follow-ups together', 'Turn a conversation into an opportunity', 'Finish your network map and weekly plan'],
  learn: [
    {
      kind: 'story',
      title: 'Monday, 10am',
      beats: [
        { speaker: 'narrator', text: 'Monday, 10am. Mr Tamba, the founder of Kmer Logistics, on the phone.' },
        { speaker: 'narrator', text: '"Your delivery sketch was exactly what we\'ve been arguing about. We\'d like you to join us part-time for three months, helping on the tracker. Interested?"' },
        { speaker: 'clinton', text: 'Yes. Very. Thank you. Could you send me the details in writing, so I can plan it around my exams?' },
        { speaker: 'miracle', text: 'A job that was never advertised. From one meet-up speaker, one good message and one useful follow-up.' },
        { speaker: 'tey', text: 'Let\'s put the whole chapter together.' },
      ],
    },
    {
      kind: 'steps',
      title: 'Your job-search kit, piece 1',
      steps: [
        { title: 'Your network map', body: 'Everyone you know, stars by people near your field, and your first five with one line each.' },
        { title: 'Your message templates (in your words)', body: 'An advice request to someone you know a little; a message to someone you\'ve never met; a speculative pitch. Personalise every time.' },
        { title: 'Your four questions', body: 'For informational calls, plus "Who else should I talk to?"' },
        { title: 'Your weekly rhythm and tracker', body: 'Five messages, follow-ups, one conversation, one update, two applications.' },
        { title: 'Next chapter: A foot in the door', body: 'Clinton starts at Kmer as one of five interns, while the Njangi Pay interview gets closer.' },
      ],
    },
  ],
  apply: {
    scenario: 'Chapter Challenge: the job nobody posted.',
    items: [
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'What led to the Kmer offer?',
        options: [
          { text: 'A weak tie, a good message, a useful follow-up' },
          { text: 'A job board advert', why: 'There was no advert.' },
          { text: '200 template messages', why: 'One careful message did it.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Put Clinton\'s path to Kmer in order.',
        lines: ['Mapped his network', 'Sent Tchami an advice request', 'Had a 15-minute call and asked who else to talk to', 'Sent the founder a speculative pitch', 'Followed up with a useful sketch'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Close tie or weak tie?',
        groups: ['Close', 'Weak'],
        items: [
          { text: 'Tchami', group: 1 },
          { text: 'David', group: 0 },
          { text: 'Arjun', group: 1 },
          { text: 'His mum', group: 0 },
          { text: 'Etienne from the event', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the weak part of this advice request.',
        lines: ['Hi Tchami, I\'m Clinton from the UB meet-up.', 'Any jobs? Pls send.', 'Whenever suits you.'],
        bug: 1,
        explanation: 'Ask for advice, not a job: "Could I ask you three quick questions?"',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply to the offer.',
        from: 'clinton',
        message: 'Mr Tamba just offered me three months part-time. What do I say?',
        options: [
          { text: 'Thank him, say I\'m very interested, and ask for the details in writing.' },
          { text: 'Say yes to anything, right now, without details.', why: 'Get it in writing first, so you can plan.' },
          { text: 'Say I\'ll think about it for a month.', why: 'Too long. Ask for details and reply soon.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each kit piece to what it\'s for.',
        pairs: [
          ['Network map', 'Who you already know'],
          ['Speculative pitch', 'A company with no advert'],
          ['Tracker', 'Who you contacted and what\'s next'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Arjun replied three weeks late. What did Clinton learn?',
        options: [
          { text: 'Silence usually means busy, not no' },
          { text: 'Never message strangers', why: 'His message worked, just slowly.' },
          { text: 'Follow up daily', why: 'One kind follow-up is enough.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Fact', 'Myth'],
        items: [
          { text: 'Many roles move through people first', group: 0 },
          { text: 'Exactly 80% of jobs are hidden', group: 1 },
          { text: 'Introverts can network one-to-one', group: 0 },
          { text: 'Networking is just using people', group: 1 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the speculative-pitch rule.',
        template: 'Write about their [[1]], show [[2]], and make one small [[3]].',
        blanks: [['problem'], ['proof'], ['ask']],
        distractors: ['salary', 'luck', 'demand'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many months is the Kmer part-time role? (a number)',
        answers: ['3', 'three'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Should Clinton stop preparing for Njangi Pay now?',
        options: [
          { text: 'No: Kmer is a door, not the end. He keeps preparing.' },
          { text: 'Yes, he has a job now', why: 'A part-time internship is a great start, not the finish.' },
          { text: 'Yes, cancel the interview', why: 'Keep every door open.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'miracle',
        message: 'Who should you thank today?',
        options: [
          { text: 'Tchami, for the introduction. And I\'ll tell Arjun his webhooks tip helped.' },
          { text: 'Nobody, I did it myself.', why: 'Thank and report back. That\'s how relationships last.' },
          { text: 'Only Mr Tamba.', why: 'Thank Tchami too: he made the introduction.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Look at your network map. Who is the one person most likely to lead you to a job nobody posted? What\'s your first message to them?',
    starters: ['The person is...', 'My first message: "Hi ___, ..."'],
  },
  deepen: {
    title: 'Your kit, piece 1',
    summary: 'Finish piece 1: your network map, three message templates in your words, your four questions, and your weekly tracker. Send your first five messages this week.',
  },
  notes: 'Chapter Challenge. Reviews the whole chapter. Mr Tamba and Kmer Logistics are invented (named extra, not a CastId; story beats narrate his lines). The internship\'s pay and terms come in Chapter 2 ("A foot in the door"). Where you live: internship rules (paid or unpaid, contracts, student permits) differ by country; check locally.',
};

export default lesson;
