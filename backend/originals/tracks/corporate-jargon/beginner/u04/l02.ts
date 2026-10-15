import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 2. Card deck: casual, neutral, formal — what actually changes between registers. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'Casual, neutral, formal: three ways to say it',
  summary: 'Brian stops laughing long enough to draw Remi a ladder on the whiteboard. Same message, three steps. Here is exactly what changes on each step.',
  minutes: 12,
  outcomes: [
    'Know the five things that change between casual, neutral and formal English',
    'Rewrite one message at all three levels',
    'Know that neutral is the safe default at work',
  ],
  learn: [
    {
      kind: 'text',
      html: "<p>Brian draws three steps on the whiteboard and writes one message on each.</p><ul><li><strong>Casual:</strong> \"hey, can u send me the deck? thx\"</li><li><strong>Neutral:</strong> \"Hi Remi, could you send me the deck? Thanks.\"</li><li><strong>Formal:</strong> \"Good afternoon, Remi. Would you be able to send me the deck when you have a moment? Many thanks.\"</li></ul><p>\"Same message,\" says Brian. \"Five things changed. Find them.\"</p>",
    },
    {
      kind: 'text',
      html: "<h3>1. The greeting</h3><p>Casual: hey, yo, hiya. Neutral: Hi, Hello. Formal: Good morning, Dear.</p><h3>2. Spelling and shortcuts</h3><p>Casual: u, thx, pls, lol. Neutral and formal: full words, full stops, capital letters.</p><h3>3. How you ask</h3><p>Casual: \"send me\". Neutral: \"could you send me\". Formal: \"would you be able to\", \"when you have a moment\".</p>",
    },
    {
      kind: 'text',
      html: "<h3>4. Slang and filler</h3><p>Casual: gonna, wanna, yeah, stuff, kinda. Neutral: going to, want to, yes, things. Formal: the same as neutral, often a little longer.</p><h3>5. The sign-off</h3><p>Casual: thx, cheers, nothing at all. Neutral: Thanks, Best. Formal: Many thanks, Kind regards.</p>",
    },
    {
      kind: 'check',
      question: 'Which register should Remi use for most everyday messages to colleagues?',
      options: ['Casual', 'Neutral', 'Formal'],
      answer: 1,
      explanation: 'Neutral is the safe default: friendly, clear, no slang.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Five dials: greeting, spelling, how you ask, slang, sign-off. Turn them up for senior people and outsiders; turn them down for close teammates.',
    },
  ],
  apply: {
    scenario: 'Monday morning. Brian\'s whiteboard ladder.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Which step of the ladder?',
        groups: ['Casual', 'Neutral', 'Formal'],
        items: [
          { text: 'thx', group: 0 },
          { text: 'Thanks', group: 1 },
          { text: 'Many thanks', group: 2 },
          { text: 'gonna', group: 0 },
          { text: 'Kind regards', group: 2 },
          { text: 'Hi Remi', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Remi messages Wanjiku, a colleague he works with every day, for some numbers. Which register?',
        options: [
          { text: 'Neutral: "Hi Wanjiku, could you send me the October numbers? Thanks!"' },
          { text: 'Formal: "Good afternoon, Wanjiku. Would you be able to..."', why: 'Fine, but a bit stiff for someone he works with daily.' },
          { text: 'Casual: "yo wanjiku numbers pls"', why: 'Too casual for a colleague he doesn\'t know very well yet.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Casual to neutral: match each word to its neutral version.',
        pairs: [
          ['gonna', 'going to'],
          ['wanna', 'want to'],
          ['yeah', 'yes'],
          ['u', 'you'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'brian',
        message: 'Quick test: write "can u send me the deck" in neutral.',
        prompt: 'Remi\'s answer?',
        options: [
          { text: 'Can you send me the deck.', why: 'Better spelling, but still a bit blunt. Add "could" and thanks.' },
          { text: 'Pursuant to our discussion, kindly furnish the deck.', why: 'That\'s jumped two steps past formal into a legal letter.' },
          { text: 'Hi Brian, could you send me the deck? Thanks.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'The safe default register for everyday work messages is ... (one word)',
        answers: ['neutral'],
        placeholder: 'One word',
      },
      {
        kind: 'findBug',
        prompt: 'Remi\'s formal email. Which part slipped back to casual?',
        lines: [
          'Good afternoon, Mrs Achieng,',
          'Would you be able to share the board calendar when you have a moment?',
          'thx!!',
        ],
        bug: 2,
        fix: 'Many thanks, Remi',
        explanation: 'The sign-off is one of the five dials. "thx!!" undoes the formal tone of everything above it.',
      },
      {
        kind: 'mcq',
        prompt: 'Is formal always better than casual at work?',
        options: [
          { text: 'Yes, always be formal', why: 'Too formal with close teammates can sound cold or sarcastic.' },
          { text: 'No, casual is always friendlier', why: 'Not with the CEO in a lift.' },
          { text: 'No: match the person and the situation. Neutral fits most of the time' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Review.',
        pairs: [
          ['CFO', 'Chief financial officer'],
          ['NDA', 'Non-disclosure agreement'],
          ['To recap', 'Repeat the decisions'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Turn Remi\'s casual message into neutral.',
        template: '[[1]] Brian, [[2]] you send me the tracker notes? [[3]]!',
        blanks: [['Hi', 'Hello'], ['could', 'can'], ['Thanks']],
        distractors: ['yo', 'thx'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the formal version.',
        tiles: ['Would', 'you', 'be', 'able', 'to', 'send', 'it', 'when', 'you', 'have', 'a', 'moment?'],
      },
    ],
  },
  reflect: {
    prompt: 'Write the same request three times: casually to a friend, neutrally to a colleague or classmate, and formally to someone senior.',
    starters: ['Casual: ...', 'Neutral: ...', 'Formal: ...'],
  },
  deepen: {
    title: 'The ladder test',
    summary: 'Before you send an important message, ask: who is this person, and which step of the ladder do they need? Check the five dials: greeting, spelling, how you ask, slang, sign-off.',
  },
  notes: 'Register levels (casual/neutral/formal) as a simplified teaching model. Norms vary by company and country; neutral is a widely applicable workplace default.',
};

export default lesson;
