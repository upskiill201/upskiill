import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 3. Explain cards: pace and pauses. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'Pace and pauses',
  summary: 'Lucía\'s first fix: slow down. Diego shows her where pauses do the most work, and how to practise a pace that feels slow to her and normal to them.',
  minutes: 12,
  outcomes: [
    'Slow down without sounding flat',
    'Place pauses where they help most',
    'Practise a new pace',
  ],
  learn: [
    {
      kind: 'text',
      html: '<p>To nervous speakers, a good pace feels slow. Many coaches suggest somewhere around 130 to 160 words a minute for a talk, a little slower than chatting. Lucía\'s 190 left no room to think, for her or the audience.</p><table><tr><th>Pause...</th><th>Why</th><th>Example</th></tr><tr><td><strong>After the message</strong></td><td>Lets it land</td><td>"We listened, and it worked." <em>(two seconds)</em></td></tr><tr><td><strong>Before a key number</strong></td><td>Builds attention</td><td>"Sales were..." <em>(pause)</em> "38% above target."</td></tr><tr><td><strong>At a signpost</strong></td><td>Shows a new part is starting</td><td>"That\'s the first lesson." <em>(pause)</em> "The second..."</td></tr><tr><td><strong>Instead of "um"</strong></td><td>Thinking time, silently</td><td><em>(pause)</em></td></tr></table><p>Practice: read one part aloud while marking full stops with a slash. Pause at every slash. It will feel too slow. Record it: it won\'t sound too slow.</p>',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Pause after the message, before key numbers, at signposts, and instead of "um". Slow feels slower to you than to them.',
    },
  ],
  apply: {
    scenario: 'Pace and pauses.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match the pause to its job.',
        pairs: [
          ['After the message', 'Lets it land'],
          ['Before a key number', 'Builds attention'],
          ['At a signpost', 'Shows a new part'],
          ['Instead of "um"', 'Silent thinking time'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What pace do many coaches suggest for a talk?',
        options: [
          { text: 'Around 130 to 160 words a minute' },
          { text: 'Around 190', why: 'That\'s Lucía\'s rushed pace.' },
          { text: 'Around 60', why: 'Too slow.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Good place to pause, or not?',
        groups: ['Good place', 'Not ideal'],
        items: [
          { text: 'After "We listened, and it worked."', group: 0 },
          { text: 'In the middle of a word', group: 1 },
          { text: 'Before "38% above target"', group: 0 },
          { text: 'Between "the" and "plant"', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'When I pause, it feels like forever. People will think I\'ve forgotten.',
        prompt: "Diego\'s best reply?",
        options: [
          { text: 'Two seconds feels like ten to you. To them it sounds calm. Watch the recording: you\'ll see.' },
          { text: 'Then don\'t pause.', why: 'Pauses help them.' },
          { text: 'Pause for a full minute.', why: 'Two seconds.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The practice.',
        template: 'Mark full stops with a [[1]], and [[2]] at every one.',
        blanks: [['slash'], ['pause']],
        distractors: ['star', 'shout'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many seconds should Lucía pause after her message?',
        answers: ['2', 'two'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why pause before a key number?',
        options: [
          { text: 'It builds attention for it' },
          { text: 'To remember it', why: 'It builds attention.' },
          { text: 'You shouldn\'t', why: 'It builds attention.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which line in Lucía\'s marked script misplaces a pause?',
        lines: [
          'We listened, and it worked. / ',
          'Sales were / 38% above target.',
          'That\'s the first / lesson. The second...',
          'That\'s the first lesson. / The second...',
        ],
        bug: 2,
        fix: 'That\'s the first lesson. / The second...',
        explanation: 'A pause mid-phrase breaks the meaning.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order the pace practice.',
        lines: ['Mark full stops with a slash', 'Read aloud, pausing at slashes', 'Record it', 'Listen back'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Sounds rushed or sounds calm?',
        groups: ['Rushed', 'Calm'],
        items: [
          { text: '190 words a minute, no pauses', group: 0 },
          { text: 'Pauses at signposts', group: 1 },
          { text: 'Sentences running into each other', group: 0 },
          { text: 'A beat after the message', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Mark one paragraph of something you\'ll say with slashes. Record it with pauses. How did it sound?',
    starters: ['It felt...', 'It sounded...'],
  },
  deepen: {
    title: 'Silence is part of speech',
    summary: 'Pauses give listeners time to process what you just said. Speakers who pause well often seem more in control, even when they feel nervous.',
  },
  notes: 'Pace guidance (~130-160 wpm for talks) is common coaching advice, not a single study; rates vary by language and speaker.',
};

export default lesson;
