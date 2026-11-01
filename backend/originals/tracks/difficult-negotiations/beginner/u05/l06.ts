import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 6. Reading: repairing after a hard round. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'Repairing after a hard round',
  summary: 'The deal is signed, but weeks of pressure have left a chill. Kavya still bristles at Pryce\'s name. Grace sends research on why how people feel after a deal matters for years.',
  minutes: 12,
  outcomes: [
    'Know why feelings after a deal affect the future',
    'Repair a relationship after a tough negotiation',
    'Start the working relationship on a good note',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'The deal after the deal',
      html: '<p>Jared Curhan and colleagues studied <strong>subjective value</strong>: how people feel about a negotiation, about the outcome, the process, themselves and the relationship. In one study of job negotiations, how people felt about the process predicted their job satisfaction and their wish to leave a year later, more than the salary they agreed.</p><p>For Arjun, Harlow &amp; Finch isn\'t a one-off. Phase two, references, other chains: all depend on how both sides feel now.</p><p><strong>Simple repairs after a hard round:</strong></p><ul><li><strong>Acknowledge it lightly:</strong> "That was a tough few weeks. Thanks for pushing us to a better package."</li><li><strong>Own your part:</strong> if anything you said was sharp, say so: "Sorry if our walk-away email felt abrupt."</li><li><strong>Separate the roles from the people:</strong> Pryce did his job. Kavya can be irritated by the tactics and still be kind to the person.</li><li><strong>Start with a good experience:</strong> a smooth kick-off and an early win rebuild trust faster than any words.</li></ul>',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'How people feel after a deal shapes everything that follows. Acknowledge the hard round, own your part, and start with an early win.',
    },
  ],
  apply: {
    scenario: 'After the hard round.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What did Curhan\'s research find about job negotiations?',
        options: [
          { text: 'Only the salary mattered', why: 'Feelings mattered more for later satisfaction.' },
          { text: 'Nothing mattered', why: 'Subjective value predicted outcomes.' },
          { text: 'How people felt about the process predicted satisfaction a year later, more than the salary' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Repairs the relationship, or strains it?',
        groups: ['Repairs', 'Strains'],
        items: [
          { text: '"Thanks for pushing us to a better package."', group: 0 },
          { text: 'Ignoring Pryce on the kick-off call', group: 1 },
          { text: '"Sorry if our email felt abrupt."', group: 0 },
          { text: 'Reminding him how low his first offer was', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the repair to an example.',
        pairs: [
          ['Acknowledge it', '"That was a tough few weeks."'],
          ['Own your part', '"Sorry if our email felt abrupt."'],
          ['Early win', 'A smooth, organised kick-off'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'kavya',
        message: 'I can\'t pretend I like Pryce.',
        prompt: "Grace's best reply?",
        options: [
          { text: 'Then be cold to him.', why: 'That hurts the next deal.' },
          { text: 'You don\'t have to like his tactics. He was doing his job. Be professional and kind with the person; the deal is done.' },
          { text: 'Tell him you dislike him.', why: 'It helps nobody.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Subjective value.',
        template: 'How people [[1]] about a deal shapes everything that [[2]].',
        blanks: [['feel'], ['follows']],
        distractors: ['pay', 'stops'],
      },
      {
        kind: 'mcq',
        prompt: 'What rebuilds trust fastest after a hard round?',
        options: [
          { text: 'A long apology letter', why: 'Actions rebuild trust faster.' },
          { text: 'Avoiding them', why: 'That makes it worse.' },
          { text: 'A good early experience, like a smooth kick-off' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Which line in Arjun\'s kick-off email strains things?',
        lines: [
          'Looking forward to building this together.',
          'Thanks for pushing us to a better package.',
          'Hopefully the rest of the project is less painful than the negotiation!',
          'Agenda for Monday\'s kick-off attached.',
        ],
        bug: 2,
        fix: 'Delete it.',
        explanation: 'A "joke" that reminds them of the conflict.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Curhan\'s research is about "subjective" what? (one word)',
        answers: ['value'],
        placeholder: 'One word',
      },
      {
        kind: 'sortGroups',
        prompt: 'About the role, or about the person?',
        groups: ['The role', 'The person'],
        items: [
          { text: 'Pushing for savings', group: 0 },
          { text: 'Asking about his weekend', group: 1 },
          { text: 'Insisting on a deadline', group: 0 },
          { text: 'Thanking him for his time', group: 1 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Order the repair.',
        lines: ['Acknowledge the hard round', 'Own your part', 'Separate role from person', 'Deliver an early win'],
      },
    ],
  },
  reflect: {
    prompt: 'Is there a relationship strained by a past negotiation? Write one sentence you could say to repair it.',
    starters: ['I could say...'],
  },
  deepen: {
    title: 'The golden bridge',
    summary: 'Ury calls it building a golden bridge: making it easy for the other side to move towards you, and to feel good about it afterwards. The bridge matters after the deal too.',
  },
  notes: 'Curhan, Elfenbein & Kilduff (2009), "Getting off on the right foot: Subjective value versus economic value in predicting longitudinal job outcomes from job offer negotiations", Journal of Applied Psychology 94(2). Ury, Getting Past No: "build them a golden bridge".',
};

export default lesson;
