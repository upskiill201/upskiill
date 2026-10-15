import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 18. Reading: acronyms by industry — logistics, banking, NGOs, tech, health. */
const lesson: OriginalLesson = {
  key: 'l18',
  title: 'Acronyms by industry',
  summary: 'Over lunch, Ada sends a voice note from Lagos: "You think YOUR office has acronyms? My fintech has KYC, AML and APIs before breakfast." Every industry has its own alphabet. Here are five.',
  minutes: 12,
  outcomes: [
    'Recognise common acronyms from logistics, banking, NGOs, tech and health',
    'Know which ones travel between industries and which don\'t',
    'Learn a new industry\'s alphabet quickly',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'Five industries, five alphabets',
      html: "<p>Every industry builds its own shortcuts. When you change jobs, you don't just learn a new office: you learn a new alphabet. Here are some of the most common, so you're not lost on day one.</p><h3>Logistics (Remi's world)</h3><ul><li><strong>POD:</strong> proof of delivery: the signature or photo that shows a parcel arrived.</li><li><strong>SKU:</strong> stock keeping unit: a code for each product a business stocks.</li><li><strong>3PL:</strong> third-party logistics: a company you pay to store and deliver your goods. Synergix is one.</li></ul><h3>Banking and fintech (Ada's world)</h3><ul><li><strong>KYC:</strong> know your customer: checking who a customer really is before they can open an account.</li><li><strong>AML:</strong> anti-money laundering: rules and checks to stop criminals hiding money.</li><li><strong>API:</strong> application programming interface: a way for two pieces of software to talk to each other. (Also big in tech.)</li></ul><h3>NGOs and development</h3><ul><li><strong>NGO:</strong> non-governmental organisation: a non-profit group working on social causes.</li><li><strong>M&E:</strong> monitoring and evaluation: measuring whether a programme is working.</li><li><strong>ToR:</strong> terms of reference: a document describing the purpose and scope of a project or a consultant's job.</li></ul><h3>Tech</h3><ul><li><strong>UX / UI:</strong> user experience / user interface: how something feels to use / what it looks like.</li><li><strong>QA:</strong> quality assurance: testing that things work before they launch.</li><li><strong>Bug:</strong> not an acronym, but you'll hear it constantly: a mistake in software.</li></ul><h3>Health</h3><ul><li><strong>OPD:</strong> outpatient department: patients who visit but don't stay overnight.</li><li><strong>ICU:</strong> intensive care unit.</li></ul><p><strong>The trick for any new industry:</strong> keep a list for your first month, ask a friendly colleague to check it, and notice which acronyms appear in everything. Those five or ten matter most. The rest you'll pick up.</p>",
    },
    {
      kind: 'check',
      question: 'Ada says her bank has to "do KYC" before opening an account. What does that mean?',
      options: ['Check who the customer really is', 'Give the customer a free gift', 'Close the account'],
      answer: 0,
      explanation: 'KYC = know your customer: identity checks.',
    },
    {
      kind: 'story',
      beats: [
        { speaker: 'ada', text: '(voice note) And when I started, I thought KYC was a fried chicken place. I told my boss I\'d "grab KYC" for lunch.' },
        { speaker: 'remi', text: '(voice note back) I searched "SOW" and got pigs. We\'re even.' },
        { speaker: 'tey', text: "Every professional you admire once mixed up an acronym. The good ones laughed, wrote it down, and never mixed it up again." },
      ],
    },
  ],
  apply: {
    scenario: 'Friday lunch. Voice notes with Ada.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each acronym to its industry.',
        pairs: [
          ['POD', 'Logistics'],
          ['KYC', 'Banking'],
          ['M&E', 'NGOs'],
          ['ICU', 'Health'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'A courier sends Remi "POD attached". What is it?',
        options: [
          { text: 'A podcast', why: 'In logistics, POD is proof of delivery.' },
          { text: 'Proof that the parcel was delivered' },
          { text: 'A new product', why: 'That would have a SKU.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which world is it from?',
        groups: ['Tech', 'Banking', 'NGOs'],
        items: [
          { text: 'UX', group: 0 },
          { text: 'AML', group: 1 },
          { text: 'ToR', group: 2 },
          { text: 'QA', group: 0 },
          { text: 'KYC', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'Quiz! What\'s an API? No googling.',
        prompt: 'Remi answers.',
        options: [
          { text: 'A type of bank account.', why: 'APIs are about software, not accounts.' },
          { text: 'A fruit.', why: 'Ada is not impressed.' },
          { text: 'A way for two pieces of software to talk to each other.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'NGO = non-governmental ... (one word)',
        answers: ['organisation', 'organization'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Remi starts a new job in a hospital admin team. What\'s the smartest first step?',
        options: [
          { text: 'Keep a list of new acronyms for the first month and ask a colleague to check it' },
          { text: 'Pretend to know them all', why: 'Day-one Remi tried that.' },
          { text: 'Ban acronyms in the hospital', why: 'Ambitious. Unlikely.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Remi\'s industry notes. Which one is wrong?',
        lines: [
          '3PL: third-party logistics.',
          'SKU: stock keeping unit.',
          'UX: user exit, when users leave an app.',
        ],
        bug: 2,
        fix: 'UX: user experience.',
        explanation: 'UX is how something feels to use.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Review.',
        pairs: [
          ['AFAIK', 'As far as I know'],
          ['NDA', 'Non-disclosure agreement'],
          ['ROI', 'Return on investment'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Ada explains her job in plain words.',
        template: 'Before someone can open an account, we do [[1]] to check who they are, and [[2]] checks to stop criminals hiding money.',
        blanks: [['KYC'], ['AML']],
        distractors: ['POD', 'UX'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Tey\'s rule for any new industry.',
        tiles: ['Keep', 'a', 'list,', 'ask', 'a', 'colleague,', 'learn', 'the', 'top', 'ten.'],
        distractors: ['pretend'],
      },
    ],
  },
  reflect: {
    prompt: 'Which industry do you work in, or want to work in? List three acronyms from it, or find them out.',
    starters: ['My industry is...', 'Three acronyms: ...'],
  },
  deepen: {
    title: 'Build your industry list',
    summary: 'Search "[your industry] glossary" from a professional body or regulator in your country. Pick the ten acronyms that appear most and add them to your notebook.',
  },
  notes: 'POD, SKU, 3PL (logistics), KYC, AML (banking; regulator usage e.g. Central Bank of Kenya, CBN), API, UX/UI, QA (tech), NGO, M&E, ToR (development sector), OPD, ICU (health). Definitions general and widely standard.',
};

export default lesson;
