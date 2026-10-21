import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 6. Explain cards: structure and signposts. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'Structure and signposts',
  summary: 'Lucía has a message and 12 slides. Now she needs a shape: how to open, how to move from part to part, and how to end so people remember.',
  minutes: 12,
  outcomes: [
    'Structure a 15-minute talk in parts',
    'Use signposts so listeners don\'t get lost',
    'Open and close with the message',
  ],
  learn: [
    {
      kind: 'text',
      html: '<p>Listeners can\'t see your outline, so you have to say it. A simple shape for a 15-minute talk:</p><table><tr><th>Part</th><th>Time</th><th>Lucía\'s version</th></tr><tr><td><strong>Open</strong></td><td>1 min</td><td>A moment, not "thank you for having me": "In March, a shop owner in Guadalajara told Sofía what to make."</td></tr><tr><td><strong>Say the message</strong></td><td>30 sec</td><td>"We listened, and it worked. Today: three things it taught us."</td></tr><tr><td><strong>Three parts</strong></td><td>11 min</td><td>What we heard, what we did, what happened.</td></tr><tr><td><strong>Close</strong></td><td>2 min</td><td>Repeat the message, plus one thing to do: "Talk to one customer this month."</td></tr></table><p><strong>Signposts</strong> are the short phrases that move people between parts: "That\'s the first lesson. The second is..." or "So, what happened?" They feel obvious to you and are a relief to listeners.</p>',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Open with a moment, say the message, three parts with signposts, close with the message and one action.',
    },
  ],
  apply: {
    scenario: 'Structure.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the talk.',
        lines: ['Open with a moment', 'Say the message', 'Three parts', 'Close with the message and one action'],
      },
      {
        kind: 'mcq',
        prompt: 'Why use signposts?',
        options: [
          { text: 'Listeners can\'t see your outline' },
          { text: 'To fill time', why: 'They guide listeners.' },
          { text: 'They\'re just filler', why: 'They guide listeners.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Strong opening or weak opening?',
        groups: ['Strong', 'Weak'],
        items: [
          { text: '"In March, a shop owner told Sofía what to make."', group: 0 },
          { text: '"Thank you for having me, I\'ll try not to bore you."', group: 1 },
          { text: '"What if our best idea came from a corner shop?"', group: 0 },
          { text: '"So, um, I\'m Lucía, and this is the agenda."', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many minutes does the three-part middle take?',
        answers: ['11', 'eleven'],
        placeholder: 'A number',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the part to Lucía\'s line.',
        pairs: [
          ['Open', '"A shop owner told Sofía what to make."'],
          ['Message', '"We listened, and it worked."'],
          ['Signpost', '"That\'s the first lesson. The second..."'],
          ['Close', '"Talk to one customer this month."'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Saying "the second lesson is" feels so obvious.',
        prompt: "Carmen\'s best reply?",
        options: [
          { text: 'To you, it is. To 300 people hearing it once, it\'s a handrail. Keep it.' },
          { text: 'Then cut it.', why: 'Listeners need it.' },
          { text: 'Say it three times each.', why: 'Once is enough.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The close.',
        template: 'Close with the [[1]] and one [[2]].',
        blanks: [['message'], ['action']],
        distractors: ['agenda', 'apology'],
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the action in Lucía\'s close?',
        options: [
          { text: '"Talk to one customer this month."' },
          { text: '"Buy more chips."', why: 'Talk to one customer.' },
          { text: 'There isn\'t one', why: 'Talk to one customer.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Lucía\'s close is the mistake?',
        lines: [
          '"So: we listened, and it worked."',
          '"Let\'s keep listening."',
          '"Oh, and one more thing about packaging, and the plant..."',
          '"Talk to one customer this month. Thank you."',
        ],
        bug: 2,
        fix: 'Delete it.',
        explanation: 'New material in the close blurs the message.',
      },
      {
        kind: 'sortGroups',
        prompt: 'Signpost or not?',
        groups: ['Signpost', 'Not a signpost'],
        items: [
          { text: '"So, what happened?"', group: 0 },
          { text: '"38% above target."', group: 1 },
          { text: '"That\'s the first lesson."', group: 0 },
          { text: '"Guadalajara had ten days of stock."', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Sketch your next talk in four parts: open, message, three parts, close. Write one signpost for each change.',
    starters: ['Open:...', 'Signposts:...'],
  },
  deepen: {
    title: 'Tell them three times',
    summary: 'An old speaking rule: tell them what you\'ll tell them, tell them, then tell them what you told them. Saying the message at the start and end does exactly that.',
  },
  notes: 'Talk structure and signposting: standard presentation practice. Time split is a suggestion for a 15-minute talk.',
};

export default lesson;
