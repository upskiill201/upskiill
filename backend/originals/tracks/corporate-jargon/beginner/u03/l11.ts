import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 11. Story with a choice: document acronyms — RFP, NDA, SOW, SOP, MoU — and Zanele nearly sends the customer list. */
const lesson: OriginalLesson = {
  key: 'l11',
  title: 'Documents: NDA, SOW, RFP, SOP, MoU',
  summary: 'A new courier wants Synergix\'s business. Their email mentions an RFP, an NDA and a SOW. Zanele is about to attach the full customer list. Remi has about ten seconds.',
  minutes: 12,
  outcomes: [
    'Decode the document acronyms: RFP, NDA, SOW, SOP, MoU',
    'Know the usual order they come in',
    'Know why you check for an NDA before sharing information',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Thursday, 3:30 p.m.',
      beats: [
        { speaker: 'narrator', text: 'An email from Kestrel Logistics, a courier that wants to replace Swift Freight: "Thanks for the RFP. Before we send our proposal, could you share your delivery volumes by customer? Happy to sign an NDA first. If selected, we\'ll draft a SOW."' },
        { speaker: 'zanele', text: 'They want volumes by customer! Easy. I\'ll attach my spreadsheet. It has every customer, every address, every price...' },
        { speaker: 'remi', text: '(Wait. "Happy to sign an NDA FIRST.")' },
        { speaker: 'tey', text: "Every acronym in that email is a document, and they come in a particular order. One of them exists precisely to stop what Zanele is about to do." },
      ],
      choice: {
        prompt: 'Zanele\'s cursor is on Send. What should Remi say?',
        options: [
          {
            text: '"Send it, they asked nicely."',
            outcome: 'Kestrel now has Synergix\'s full customer list and prices, with no NDA. Wanjiku goes very quiet when she finds out. Legal goes very loud.',
          },
          {
            text: '"Stop! They offered an NDA first. Let\'s check with Brian whether one is signed, and send only what\'s needed."',
            outcome: 'Brian confirms: no NDA yet. Legal sends one; Kestrel signs it the next morning. Then Zanele sends totals by region, not names and prices. Nobody goes loud.',
            best: true,
          },
          {
            text: '"Ignore the email. Too many acronyms."',
            outcome: 'Kestrel follows up twice, then withdraws. Synergix loses a courier that might have been cheaper.',
          },
        ],
      },
    },
    {
      kind: 'text',
      html: "<p>The documents, in the order they usually come:</p><ol><li><strong>RFP</strong> (request for proposal): a company describes what it needs and invites suppliers to say how they'd do it, and for how much. Synergix sent one to couriers.</li><li><strong>NDA</strong> (non-disclosure agreement): a contract where both sides promise to keep shared information secret. Signed BEFORE sharing anything sensitive.</li><li><strong>SOW</strong> (statement of work): once a supplier is chosen, it describes exactly what work will be done, by when, for what price. (Not the pig. Remi checked.)</li><li><strong>SOP</strong> (standard operating procedure): the step-by-step way something is always done. \"Our SOP for late deliveries is...\"</li></ol><p>And one more: <strong>MoU</strong> (memorandum of understanding): a written agreement of intent between two organisations, often less binding than a full contract. Common with governments, NGOs and partners.</p>",
    },
    {
      kind: 'callout',
      tone: 'warning',
      text: 'Before you share customer names, prices or anything private with another company: check for an NDA, and send only what\'s needed. When in doubt, ask your manager or Legal.',
    },
  ],
  apply: {
    scenario: 'Thursday, 3:30. The Kestrel email.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match the documents.',
        pairs: [
          ['RFP', 'Invites suppliers to propose'],
          ['NDA', 'A promise to keep things secret'],
          ['SOW', 'Exactly what work, when, for how much'],
          ['SOP', 'The standard way something is done'],
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Put the documents in the order they usually come.',
        lines: ['RFP: Synergix asks couriers to propose', 'NDA: both sides agree to keep shared data secret', 'Proposal: Kestrel says how and how much', 'SOW: the agreed work, dates and price'],
      },
      {
        kind: 'mcq',
        prompt: 'Why sign an NDA before sharing customer volumes?',
        options: [
          { text: 'It\'s just a formality', why: 'It\'s legal protection for sensitive information.' },
          { text: 'So the other company is legally bound to keep the information secret' },
          { text: 'So Kestrel pays less', why: 'NDAs are about secrecy, not price.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        from: 'zanele',
        message: 'NDA is signed now! So I can send the full spreadsheet with every customer and price, right?',
        prompt: 'What does Remi say?',
        options: [
          { text: 'Even with an NDA, send only what they need: volumes by region, not names and prices.' },
          { text: 'Yes, send everything!', why: 'An NDA protects you; it doesn\'t mean share more than needed.' },
          { text: 'Never send anything to anyone.', why: 'They need some data to make a proposal.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'SOP = standard operating ... (one word)',
        answers: ['procedure'],
        placeholder: 'One word',
      },
      {
        kind: 'sortGroups',
        prompt: 'Which document?',
        groups: ['NDA', 'SOW', 'SOP'],
        items: [
          { text: '"Neither side will share the other\'s data."', group: 0 },
          { text: '"Kestrel will run 3 routes from 1 Dec at KSh X per delivery."', group: 1 },
          { text: '"Step 1: log the late delivery. Step 2: call the customer."', group: 2 },
          { text: '"Deliverables: weekly delivery report."', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Remi\'s notes. Which line is wrong?',
        lines: [
          'RFP: request for proposal.',
          'MoU: memorandum of understanding.',
          'SOW: a female pig.',
        ],
        bug: 2,
        fix: 'SOW: statement of work.',
        explanation: 'The search engine was wrong. Well, it was right about pigs.',
      },
      {
        kind: 'mcq',
        prompt: 'Synergix agrees to work with a university on research, without a full contract yet. Which document fits?',
        options: [
          { text: 'An MoU' },
          { text: 'An SOP', why: 'That\'s an internal step-by-step procedure.' },
          { text: 'An RFP', why: 'That invites suppliers to bid.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Review.',
        pairs: [
          ['B2B', 'Sells to other businesses'],
          ['ROI', 'Return on investment'],
          ['FYI', 'For your information'],
        ],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Remi\'s safety question.',
        tiles: ['Have', 'we', 'signed', 'an', 'NDA', 'with', 'them', 'yet?'],
        distractors: ['SOW', 'RFP'],
      },
    ],
  },
  reflect: {
    prompt: 'Have you ever been asked to share information (at work, school or online) where you weren\'t sure you should? What would you check now?',
    starters: ['I was asked to share...', 'Now I\'d check...'],
  },
  deepen: {
    title: 'Know your company\'s rules',
    summary: 'Find out who handles contracts and NDAs where you work (often Legal or Procurement), and what counts as confidential. It\'s much easier to ask before than to explain after.',
  },
  notes: 'RFP, NDA, SOW, SOP, MoU — standard business/legal terms (Cambridge Business English, Investopedia). General information only, not legal advice; lesson directs learners to Legal/their manager. Kestrel Logistics is fictional.',
};

export default lesson;
