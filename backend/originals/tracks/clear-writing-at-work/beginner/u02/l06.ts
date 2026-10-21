import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 6. Before/After: Brian's notice, rewritten. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'Brian\'s notice, rewritten',
  summary: 'The driver notice before and after. Same information, a fraction of the words, and every driver can answer "when do I work and what do I get?" in ten seconds.',
  minutes: 11,
  outcomes: [
    'Rewrite a jargon-heavy notice in plain words',
    'Lead with what the reader needs to do',
    'Keep the facts and lose the fog',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'The driver notice',
      before: {
        label: 'Brian\'s draft',
        text: '"Going forward, we will leverage cross-functional synergies to operationalise weekend throughput. It has been decided that Saturday resourcing will be allocated by depot management in alignment with remuneration frameworks. Please do not hesitate to reach out to touch base regarding any queries."',
      },
      after: {
        label: 'Plain version',
        text: '"Saturday shifts start on 6 May.\n- The depot opens 7 a.m. to 3 p.m. on Saturdays.\n- Saturday work is voluntary in May.\n- It pays time and a half, shown on your May payslip.\n- Mrs Mwangi will send rotas by each Wednesday.\nQuestions? Call or message Mrs Mwangi."',
      },
      notes: [
        'The plain version answers: when, what pay, who to ask.',
        'It\'s more specific than the original: times, pay rate, a name.',
        'Bullets make it readable on a phone in seconds.',
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'A notice should answer: what changes, when, what it means for me, and who to ask.',
    },
  ],
  apply: {
    scenario: 'The rewrite.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'From Brian\'s draft or the plain version?',
        groups: ['Brian\'s draft', 'Plain'],
        items: [
          { text: '"Leverage cross-functional synergies"', group: 0 },
          { text: '"Opens 7 a.m. to 3 p.m."', group: 1 },
          { text: '"Remuneration frameworks"', group: 0 },
          { text: '"Pays time and a half"', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match Brian\'s phrase to its plain meaning.',
        pairs: [
          ['"Operationalise weekend throughput"', '"The depot opens on Saturdays"'],
          ['"Remuneration frameworks"', '"It pays time and a half"'],
          ['"Touch base regarding queries"', '"Questions? Call Mrs Mwangi"'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What makes the plain version more specific?',
        options: [
          { text: 'It gives times, the pay rate and a named contact' },
          { text: 'It\'s longer', why: 'It\'s shorter.' },
          { text: 'It uses more adjectives', why: 'It uses facts.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Order what a good notice answers.',
        lines: ['What changes', 'When', 'What it means for me', 'Who to ask'],
      },
      {
        kind: 'chatReply',
        from: 'brian',
        message: 'It\'s very... short. Is it too simple for Synergix?',
        prompt: "Zanele's best reply?",
        options: [
          { text: 'It answers every question the drivers will have, in their first read. That\'s exactly what Synergix needs from it.' },
          { text: 'You\'re right, let me add synergies back.', why: 'That undoes the clarity.' },
          { text: 'It\'s fine, drivers don\'t read anyway.', why: 'They will read this.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Pay line.',
        template: 'It pays time and a [[1]], shown on your May [[2]].',
        blanks: [['half'], ['payslip']],
        distractors: ['quarter', 'calendar'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'At what time does the depot open on Saturdays? (e.g. 7 a.m.)',
        answers: ['7', '7 am', '7am', '7 a.m.', '07:00'],
        placeholder: 'A time',
      },
      {
        kind: 'findBug',
        prompt: 'Which bullet still needs plain words?',
        lines: [
          'Saturday shifts start on 6 May.',
          'Saturday work is voluntary in May.',
          'Resourcing will be aligned with stakeholder expectations.',
          'Questions? Call Mrs Mwangi.',
        ],
        bug: 2,
        fix: 'Mrs Mwangi will send rotas by each Wednesday.',
        explanation: 'It says nothing a driver can act on.',
      },
      {
        kind: 'mcq',
        prompt: 'Why bullets for this notice?',
        options: [
          { text: 'Drivers read on phones; separate facts are easier to scan' },
          { text: 'Bullets look important', why: 'They make facts scannable.' },
          { text: 'No reason', why: 'They help phone readers.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Something a driver can act on, or not?',
        groups: ['Can act on', 'Can\'t'],
        items: [
          { text: 'Rota by Wednesday', group: 0 },
          { text: 'Cross-functional synergies', group: 1 },
          { text: 'Call Mrs Mwangi', group: 0 },
          { text: 'Alignment with frameworks', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Rewrite a notice or announcement you\'ve received so it answers: what changes, when, what it means for me, who to ask.',
    starters: ['What changes:...', 'Who to ask:...'],
  },
  deepen: {
    title: 'Notices people read',
    summary: 'Notices fail when readers can\'t find what affects them. Leading with dates, actions and contacts gets them read, and cuts the follow-up questions.',
  },
  notes: 'Fictional notice: Saturdays from 6 May, 7 a.m.–3 p.m., voluntary in May, time and a half, rotas by Wednesday; Mrs Mwangi (depot manager, narrated).',
};

export default lesson;
