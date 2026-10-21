import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 4. Explain cards: the rule of three. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'The rule of three',
  summary: 'Lucía has seven things to say on Monday. Carmen will remember two. Sofía suggests the rule of three: pick three, say how many, then say them.',
  minutes: 12,
  outcomes: [
    'Group what you say into three points',
    'Signpost them out loud',
    'Know why listeners can\'t hold seven',
  ],
  learn: [
    {
      kind: 'text',
      html: '<p>Listeners can\'t scroll back. Psychologist Nelson Cowan (2001) reviewed the evidence and concluded that working memory holds only about <strong>four chunks</strong> at once. Seven separate points won\'t survive a two-minute update.</p><table><tr><th>Do</th><th>Example</th></tr><tr><td><strong>Pick three</strong></td><td>Sales, stock, next step. The rest go in a follow-up email.</td></tr><tr><td><strong>Say how many</strong></td><td>"Three things this week."</td></tr><tr><td><strong>Number them out loud</strong></td><td>"First, sales... Second, stock... Third, the reorder."</td></tr><tr><td><strong>Group the small stuff</strong></td><td>The photo shoot, agency and packaging become one point: "the campaign is on schedule".</td></tr></table><p>Three isn\'t magic. It\'s a comfortable fit for working memory, and easy to signpost.</p>',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Pick three, say "three things", number them out loud. Send the rest in writing.',
    },
  ],
  apply: {
    scenario: 'The rule of three.',
    items: [
      {
        kind: 'mcq',
        prompt: 'About how many chunks did Cowan (2001) conclude working memory holds?',
        options: [
          { text: 'About four' },
          { text: 'About twenty', why: 'Much fewer.' },
          { text: 'Unlimited', why: 'About four.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Say it on Monday, or send it in writing?',
        groups: ['Say it', 'Send it'],
        items: [
          { text: 'Sales are 38% above target', group: 0 },
          { text: 'The full agency invoice list', group: 1 },
          { text: 'The reorder decision', group: 0 },
          { text: 'Photo shoot timings', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many things did Lucía originally want to say?',
        answers: ['7', 'seven'],
        placeholder: 'A number',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the technique to the example.',
        pairs: [
          ['Say how many', '"Three things this week."'],
          ['Number them', '"First, sales..."'],
          ['Group the small stuff', '"The campaign is on schedule."'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'But all seven things matter.',
        prompt: "Sofía\'s best reply?",
        options: [
          { text: 'They do. Say three, and send the other four in an email after. Nothing\'s lost, and Carmen remembers the three.' },
          { text: 'Then say all seven quickly.', why: 'Listeners can\'t hold seven.' },
          { text: 'Pick one and forget the rest.', why: 'Send the rest in writing.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The tip.',
        template: 'Pick [[1]], say how many, [[2]] them out loud.',
        blanks: [['three'], ['number']],
        distractors: ['seven', 'whisper'],
      },
      {
        kind: 'mcq',
        prompt: 'Why can\'t listeners handle seven points?',
        options: [
          { text: 'They can\'t scroll back, and working memory is small' },
          { text: 'They\'re not interested', why: 'It\'s about memory.' },
          { text: 'Seven is an unlucky number', why: 'It\'s about memory.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Lucía\'s update breaks the rule of three?',
        lines: [
          'Three things this week.',
          'First, sales are 38% above target.',
          'Second, stock is tight in Guadalajara.',
          'Third, fourth, fifth and sixth: let me run through the rest quickly...',
        ],
        bug: 3,
        fix: 'Third, I need a yes on the reorder by Thursday.',
        explanation: 'Three became six. Send the rest in writing.',
      },
      {
        kind: 'sortGroups',
        prompt: 'One grouped point, or separate points?',
        groups: ['Group into one', 'Keep separate'],
        items: [
          { text: 'Photo shoot, agency, packaging', group: 0 },
          { text: 'The reorder decision', group: 1 },
          { text: 'Small timing updates on three tasks', group: 0 },
          { text: 'Sales against target', group: 1 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Order how Lucía prepares Monday.',
        lines: ['List everything', 'Pick three', 'Group the small stuff', 'Write the follow-up email for the rest'],
      },
    ],
  },
  reflect: {
    prompt: 'Take something you need to say this week. Cut it to three points. What goes in writing instead?',
    starters: ['My three:...', 'In writing:...'],
  },
  deepen: {
    title: 'Why three feels right',
    summary: 'Speeches, jokes and slogans often use three. It\'s short enough to remember and long enough to feel complete, which makes it a reliable default.',
  },
  notes: 'Cowan (2001), Behavioral and Brain Sciences, "The magical number 4 in short-term memory": capacity about 3-5 chunks. Rule of three: rhetorical tradition, used here as a practical default, not a law.',
};

export default lesson;
