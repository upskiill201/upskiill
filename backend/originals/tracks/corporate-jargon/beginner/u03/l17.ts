import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 17. Before/After: when acronyms backfire — spell out on first use, cut the ones readers won't know. */
const lesson: OriginalLesson = {
  key: 'l17',
  title: 'When acronyms backfire',
  summary: 'Remi drafts a welcome email to Kestrel, the new courier. Proud of his new vocabulary, he uses nine acronyms in four sentences. Then he imagines being Kestrel.',
  minutes: 12,
  outcomes: [
    'Spell out an acronym the first time you use it',
    'Cut acronyms your reader might not know',
    'Never invent your own acronyms in shared writing',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Remi\'s welcome email to Kestrel',
      before: {
        label: 'Acronym showcase',
        text: 'Hi Kestrel team, welcome aboard! Per the SOW, the PoC on the MSA route starts EOM. Pls share your SLA + POD SOP ASAP so our CS team can update the CRM. TBC: the KPI review cadence. BR, Remi',
      },
      after: {
        label: 'Kind to the reader',
        text: 'Hi Kestrel team, welcome aboard! As agreed in the statement of work, the trial on the Mombasa route starts at the end of the month. Could you send us your service level agreement and your proof-of-delivery process by Wednesday? Our customer service team needs them to update our customer records. We\'ll confirm how often we\'ll review results next week. Best regards, Remi',
      },
      notes: [
        '"MSA route" was Remi\'s own invented shortcut for Mombasa. Kestrel had no chance.',
        'Everything is spelled out because Kestrel is new and from outside.',
        '"ASAP" became "by Wednesday".',
        '"KPI review cadence" became "how often we\'ll review results".',
        'Longer, yes. But nobody has to reply asking what it means, which saves a day.',
      ],
    },
    {
      kind: 'text',
      html: "<p><strong>Three rules for acronyms in writing:</strong></p><ol><li><strong>Spell it out the first time, with the acronym in brackets:</strong> \"service level agreement (SLA)\". After that, the acronym alone is fine.</li><li><strong>Cut the ones your reader won't know.</strong> If they're new, outside your company, or from another country, write the words.</li><li><strong>Never invent your own.</strong> Your private shortcut (MSA for Mombasa) means nothing to anyone else, and can clash with a real one: in contracts, MSA usually means master services agreement.</li></ol>",
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'First time: words (ACRONYM). After that: ACRONYM. Outsider reading? Just words.',
    },
  ],
  apply: {
    scenario: 'Friday, 12:15. Remi\'s email to Kestrel, take two.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Which is the right way to use "SLA" for the first time in a document?',
        options: [
          { text: 'SLA', why: 'The reader might not know it yet.' },
          { text: 'Service level agreement (SLA)' },
          { text: 'S.L.A. (look it up)', why: 'Unkind to the reader.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Spell it out, or acronym is fine?',
        groups: ['Spell it out', 'Acronym is fine'],
        items: [
          { text: 'First email to a new supplier', group: 0 },
          { text: 'Quick chat with Brian about the KPI deck', group: 1 },
          { text: 'A report for people in another country', group: 0 },
          { text: 'Second mention in a document, after spelling it out', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Remi\'s draft. Which line will confuse Kestrel the most?',
        lines: [
          'Welcome aboard!',
          'The PoC on the MSA route starts EOM.',
          'Best regards, Remi',
        ],
        bug: 1,
        fix: 'The trial on the Mombasa route starts at the end of the month.',
        explanation: 'Three acronyms in one line, one of them invented.',
      },
      {
        kind: 'chatReply',
        from: 'zanele',
        message: 'I made a new acronym! "TPTD" = "the printer thing, deferred". I\'m putting it in all my notes.',
        prompt: 'What does Remi say?',
        options: [
          { text: 'Iconic. Use it everywhere.', why: 'Nobody else will know what it means.' },
          { text: 'Ha! Fine in your own notes. In shared ones, just write "printer issue on hold".' },
          { text: 'Acronyms are banned.', why: 'Not banned. Just not invented ones in shared writing.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'The first time you use an acronym, put the acronym in ___ after the words. (one word)',
        answers: ['brackets', 'parentheses', 'parenthesis'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Why is the longer email better for Kestrel?',
        options: [
          { text: 'Longer emails look more professional', why: 'Length isn\'t the point. Clarity is.' },
          { text: 'Kestrel can act on it without asking what anything means' },
          { text: 'It uses more acronyms', why: 'It uses fewer.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Put the acronym rules in order of when you\'d use them while writing.',
        lines: ['Ask: does my reader know this one?', 'If not sure, spell it out with the acronym in brackets', 'After that, use the acronym alone', 'Never invent your own in shared writing'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Review.',
        pairs: [
          ['PR (Marketing)', 'Public relations'],
          ['Pipeline', 'Deals in progress'],
          ['Scope', 'What\'s in and out of a project'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Fix the first mention.',
        template: 'Please send your [[1]] of delivery ([[2]]) process.',
        blanks: [['proof'], ['POD']],
        distractors: ['SOP', 'point'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Rewrite "Pls share SLA ASAP" for a new supplier.',
        tiles: ['Please', 'send', 'your', 'service', 'level', 'agreement', 'by', 'Wednesday.'],
        distractors: ['ASAP', 'SLA'],
      },
    ],
  },
  reflect: {
    prompt: 'Find a document, email or post you wrote that used acronyms. Would a newcomer understand it? Rewrite one sentence.',
    starters: ['The sentence was...', 'Rewritten: ...'],
  },
  deepen: {
    title: 'The newcomer test',
    summary: 'Before you send anything important, read it as if it\'s your first day. Every acronym you\'d have stumbled on: spell it out or cut it.',
  },
  notes: 'First-use spelling-out rule is standard style-guide advice (e.g. government and academic style guides). MSA = master services agreement (contracts). POD = proof of delivery (logistics). EOM = end of month.',
};

export default lesson;
