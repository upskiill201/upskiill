import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 4. Chat with Tey: polite requests — could you, would you mind, I was wondering, is there any chance; and "kindly" around the world. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Polite requests: "could you", "would you mind"',
  summary: 'Remi needs things from people every day: numbers, access, time. "Send me the file" works with Zanele. It does not work with Finance. Tey teaches him the request ladder.',
  minutes: 12,
  outcomes: [
    'Make requests at the right level of politeness',
    'Use could you, would you mind, I was wondering and is there any chance',
    'Know how "kindly" reads in different countries',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        {
          tey: "Monday, 11:00. Remi needs Wanjiku's October numbers. His first draft: \"Send me the October numbers.\" Grammatically perfect. How does it sound to you?",
          replies: ['A bit bossy?', 'Fine, it\'s clear.'],
        },
        {
          tey: "It's clear, which is good. But a bare command can sound like an order, especially to someone who doesn't report to you. English softens requests by turning them into questions. Here's the ladder, from direct to very polite.",
          replies: ['Show me.'],
        },
        {
          tey: "\"Can you send...?\" casual and direct. \"Could you send...?\" the everyday polite default. \"Would you mind sending...?\" softer, good when it's extra work for them. \"I was wondering if you could send...\" gentle, for bigger asks or senior people.",
          replies: ['And "is there any chance"?'],
        },
        {
          tey: "\"Is there any chance you could send them today?\" That's for when you're asking for something difficult, like a fast deadline. It politely admits it might not be possible.",
          replies: ['What about "kindly"?'],
        },
        {
          tey: "Great question, because it depends on where you are. In Kenya, Nigeria, India and many other places, \"Kindly send the numbers\" is normal, polite business English. In the UK or the US, it can sound stiff, or even a little bossy. Neither is wrong. If your reader might be from elsewhere, \"Could you...?\" works everywhere.",
          replies: ['So which do I use for Wanjiku?'],
        },
        {
          tey: "\"Hi Wanjiku, could you send me the October numbers when you get a chance? They're for the KPI deck. Thanks!\" A polite question, a reason, and thanks. Three seconds longer to write. People say yes faster.",
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Can you → Could you → Would you mind → I was wondering if → Is there any chance. Climb the ladder as the request gets bigger or the person more senior.',
    },
  ],
  apply: {
    scenario: 'Monday, 11:00. Requests to send.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order these from most direct to most polite.',
        lines: ['Send me the numbers.', 'Can you send me the numbers?', 'Could you send me the numbers?', 'Would you mind sending me the numbers?', 'I was wondering if you could send me the numbers.'],
      },
      {
        kind: 'mcq',
        prompt: 'Remi needs Wanjiku to stay late to finish numbers by 6 p.m. Which request fits?',
        options: [
          { text: 'Send them by 6.', why: 'A big ask phrased as an order.' },
          { text: 'Can u do 6?', why: 'Too casual for a difficult ask.' },
          { text: 'Is there any chance you could get them to me by 6? I know it\'s tight.' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the request to the situation.',
        pairs: [
          ['Could you...?', 'Everyday request'],
          ['Would you mind...?', 'It\'s extra work for them'],
          ['Is there any chance...?', 'A difficult ask'],
          ['I was wondering if...', 'A big ask, or a senior person'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'emeka',
        message: 'Kindly share the tracker link when convenient.',
        prompt: 'Zanele whispers, "Is Emeka annoyed with you?" What does Remi say?',
        options: [
          { text: 'No, in Nigeria "kindly" is just polite business English. I\'ll send it now.' },
          { text: 'Yes, "kindly" means he\'s cross.', why: 'In Nigerian English, "kindly" is normal, polite business language.' },
          { text: 'I don\'t know, I\'ll ignore it.', why: 'It\'s a simple, polite request.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'The everyday polite default: "___ you send me the file?" (one word)',
        answers: ['could'],
        placeholder: 'One word',
      },
      {
        kind: 'findBug',
        prompt: 'Remi\'s request to Finance. Which line makes it sound like an order?',
        lines: [
          'Hi Wanjiku,',
          'Send me the October numbers now.',
          'They\'re for the KPI deck. Thanks!',
        ],
        bug: 1,
        fix: 'Could you send me the October numbers when you get a chance?',
        explanation: 'A bare command to someone who doesn\'t report to you can sound like an order.',
      },
      {
        kind: 'sortGroups',
        prompt: 'Good request, or sounds like an order?',
        groups: ['Good request', 'Sounds like an order'],
        items: [
          { text: 'Could you check this when you have a moment?', group: 0 },
          { text: 'Check this.', group: 1 },
          { text: 'Would you mind looking over my draft?', group: 0 },
          { text: 'Do it today.', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why add a reason ("They\'re for the KPI deck")?',
        options: [
          { text: 'To make the message longer', why: 'It\'s one short sentence that makes "yes" easier.' },
          { text: 'People help faster when they know why it matters' },
          { text: 'It\'s required by law', why: 'Just good practice.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Review.',
        pairs: [
          ['Kind regards', 'Polite, safe sign-off'],
          ['Good morning, Mrs Achieng', 'Formal greeting'],
          ['ETA', 'When it will arrive or be ready'],
        ],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build a polite request to Felix.',
        tiles: ['Would', 'you', 'mind', 'checking', 'my', 'access', 'again?'],
        distractors: ['now', 'kindly'],
      },
    ],
  },
  reflect: {
    prompt: 'Think of a request you need to make this week. Write it at the right step of the ladder, with a reason and a thank you.',
    starters: ['The request is...', 'I\'ll write: "..."'],
  },
  deepen: {
    title: 'Know your "kindly"',
    summary: 'Notice how people in your workplace phrase requests. Is "kindly" normal? "Please"? "Could you"? Use what\'s normal there, and "could you" with people from elsewhere.',
  },
  notes: 'Politeness strategies in requests (indirect questions, modal verbs) — standard pragmatics/ELT teaching. "Kindly" as a polite imperative is standard in Indian, Kenyan, Nigerian English (documented in World Englishes literature); can read as stiff/officious in UK/US. Lesson presents both as valid.',
};

export default lesson;
