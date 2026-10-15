import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 13. Tap to explore: Pauline's CRM screen — CRM, lead, prospect, pipeline, deal stage, conversion, churn, account. */
const lesson: OriginalLesson = {
  key: 'l13',
  title: 'Customers: CRM, lead, pipeline, churn',
  summary: 'Pauline from Marketing shows Remi the CRM so he can add delivery data to it. Her screen is a wall of sales words: leads, pipeline, churn. Tap to decode.',
  minutes: 12,
  outcomes: [
    'Decode CRM, lead, prospect, pipeline, conversion, churn and account',
    'Follow a customer from first contact to signed deal',
    'Explain why churn matters so much',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Pauline\'s CRM dashboard',
      text: 'Synergix CRM, October. New leads: 42. Qualified prospects: 15. Pipeline: KSh 38M across 9 deals. Deal stage: proposal sent (4). Conversion rate: 18%. Churn: 3 accounts lost this quarter. Key account at risk: Mama Mboga Fresh (late deliveries).',
      hotspots: [
        { phrase: 'CRM', note: 'Customer relationship management: the system where a company keeps every customer, every conversation and every deal.' },
        { phrase: 'leads', note: 'People or companies who MIGHT become customers: they filled in a form, called, or were met at an event.' },
        { phrase: 'prospects', note: 'Leads who have been checked and look like a real possibility. "Qualified" = they have the need and the budget.' },
        { phrase: 'Pipeline', note: 'All the deals in progress, often with their total value. "A healthy pipeline" = lots of likely future business.' },
        { phrase: 'Deal stage', note: 'How far along each deal is: first contact, meeting, proposal sent, negotiating, won or lost.' },
        { phrase: 'Conversion rate', note: 'The share of leads that become customers. 18% = about 18 of every 100 leads sign.' },
        { phrase: 'Churn', note: 'Customers who stop buying from you. Low churn is good. High churn means you\'re losing customers as fast as you win them.' },
        { phrase: 'Key account', note: 'An important customer, usually with their own dedicated contact person. Losing one hurts.' },
      ],
    },
    {
      kind: 'story',
      beats: [
        { speaker: 'pauline', text: 'See that? Our biggest grocery customer is at risk. Why? Late deliveries.' },
        { speaker: 'remi', text: 'So my delivery tracker isn\'t just a Strategy thing. It\'s a churn thing.' },
        { speaker: 'pauline', text: 'Exactly. Every late delivery makes a customer think about leaving.' },
        { speaker: 'tey', text: "Remember Pauline. You'll meet her again in a few weeks, and the two of them will end up working on the same idea." },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Lead → prospect → deal in the pipeline → customer (account). Churn is customers leaving at the other end.',
    },
  ],
  apply: {
    scenario: 'Friday morning. Pauline\'s CRM, explained.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put a customer\'s journey in order.',
        lines: ['Lead: they fill in a form', 'Prospect: they look like a real possibility', 'Deal in the pipeline: proposal sent', 'Customer (account): they sign'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the customer words.',
        pairs: [
          ['CRM', 'The system that tracks customers'],
          ['Pipeline', 'All the deals in progress'],
          ['Churn', 'Customers who stop buying'],
          ['Conversion rate', 'Share of leads that sign'],
        ],
      },
      {
        kind: 'mcq',
        prompt: '"Churn went up this quarter." Good or bad?',
        options: [
          { text: 'Good: more customers joined', why: 'Churn is customers LEAVING.' },
          { text: 'Neutral', why: 'Losing customers is rarely neutral.' },
          { text: 'Bad: more customers stopped buying' },
        ],
        answer: 2,
      },
      {
        kind: 'chatReply',
        from: 'pauline',
        message: 'Our pipeline looks healthy, but churn is creeping up. What\'s your read?',
        prompt: 'What\'s the best plain-words answer from Remi?',
        options: [
          { text: 'We\'re winning plenty of new deals, but losing existing customers, maybe because of late deliveries.' },
          { text: 'Pipelines are for oil.', why: 'Remi\'s literal brain, again.' },
          { text: 'Sounds great overall!', why: 'Rising churn is a warning sign.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'CRM = customer ___ management. (one word)',
        answers: ['relationship'],
        placeholder: 'One word',
      },
      {
        kind: 'sortGroups',
        prompt: 'Lead or customer?',
        groups: ['Lead', 'Customer'],
        items: [
          { text: 'A shop that filled in a contact form', group: 0 },
          { text: 'Mama Mboga Fresh, signed for two years', group: 1 },
          { text: 'A factory met at a trade fair', group: 0 },
          { text: 'A supermarket paying monthly', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Zanele\'s notes. Which one is wrong?',
        lines: [
          'Lead: someone who might become a customer.',
          'Key account: an important customer.',
          'Churn: new customers signing up.',
        ],
        bug: 2,
        fix: 'Churn: customers who stop buying.',
        explanation: 'Churn is the opposite of signing up.',
      },
      {
        kind: 'mcq',
        prompt: 'A conversion rate of 18% means...',
        options: [
          { text: '18 customers left', why: 'That would be churn.' },
          { text: 'About 18 in every 100 leads become customers' },
          { text: 'Revenue went up 18%', why: 'That\'s a revenue number.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Review.',
        pairs: [
          ['MVP', 'Smallest version people can use'],
          ['NDA', 'Promise to keep things secret'],
          ['Revenue', 'All the money from sales'],
        ],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Remi\'s insight.',
        tiles: ['Late', 'deliveries', 'cause', 'churn.'],
        distractors: ['pipeline', 'leads'],
      },
    ],
  },
  reflect: {
    prompt: 'Think of a shop, app or service you stopped using. What made you "churn"? What could they have done to keep you?',
    starters: ['I stopped using...', 'They could have kept me by...'],
  },
  deepen: {
    title: 'You are in a pipeline',
    summary: 'Next time you sign up for a newsletter or a free trial, notice what happens next: the emails, the offers, the reminders. You\'re a lead moving through someone\'s pipeline.',
  },
  notes: 'CRM, lead, (qualified) prospect, pipeline, deal stage, conversion rate, churn, key account — standard sales/marketing terms (Cambridge Business English, HubSpot/Salesforce glossaries). Mama Mboga Fresh is fictional ("mama mboga" = Kenyan vegetable seller).',
};

export default lesson;
