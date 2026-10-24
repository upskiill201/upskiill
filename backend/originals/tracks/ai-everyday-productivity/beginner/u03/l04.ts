import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 4. Chat with Tey: the tone dial. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'The tone dial',
  summary: 'One invitation, three audiences: Abuela, the cousins\' group chat, and Papá\'s old colleagues from the school. Tey shows Lucía how to turn the tone dial without rewriting from scratch.',
  minutes: 11,
  outcomes: [
    'Adjust one message for different readers',
    'Use tone words AI understands: warmer, firmer, simpler, more formal',
    'Keep the facts identical across versions',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'One message, three readers. Abuela is 89 and reads every word. The cousins read nothing longer than a meme. Papá\'s colleagues from the school are polite and formal.', replies: ['So three messages?', 'Can\'t I send one?'] },
        { tey: 'Three versions of one message. Write it once, then turn the dial. "Make it warmer and simpler for my 89-year-old grandmother, bigger on the date and place."', replies: ['And the cousins?'] },
        { tey: '"Make it two lines, casual, one joke." For the colleagues: "More formal, still warm, include how to confirm."', replies: ['What other dials are there?'] },
        { tey: 'Warmer or cooler. Firmer or softer. Simpler. Shorter. More or less formal. Two or three dials at a time is plenty.', replies: ['What could go wrong?'] },
        { tey: 'The facts drift. One version says the 30th, another says "end of the month", one forgets the address. So the last prompt is: "Check that all three versions have the same date, time and place."', replies: ['A fact check across versions. Nice.'] },
        { tey: 'Tone changes. Facts don\'t. That\'s the rule.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Tone dials: warmer, firmer, simpler, shorter, more formal. Turn two at most. Then check every version has the same facts.',
    },
  ],
  apply: {
    scenario: 'Three readers, one message.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match the reader to the dial.',
        pairs: [
          ['Abuela, 89', 'Warmer and simpler, big date and place'],
          ['The cousins', 'Two lines, casual, one joke'],
          ['Papá\'s colleagues', 'More formal, still warm'],
          ['The internet company', 'Calm and firm'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What must stay identical in all three versions?',
        options: [
          { text: 'The jokes', why: 'Jokes can change; facts can\'t.' },
          { text: 'The length', why: 'Length is one of the dials.' },
          { text: 'The facts: date, time and place' },
        ],
        answer: 2,
      },
      {
        kind: 'chatReply',
        from: 'tomas',
        message: 'I asked it to make my message "better". Now it\'s twice as long.',
        prompt: 'Lucía\'s tip?',
        options: [
          { text: '"Better" isn\'t a dial. Say which way: shorter, warmer, firmer, simpler.' },
          { text: 'Ask for "even better".', why: 'Still not a direction.' },
          { text: 'Longer is better.', why: 'Not for most readers.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'A clear tone dial, or vague?',
        groups: ['Clear dial', 'Vague'],
        items: [
          { text: 'Shorter, 2 lines', group: 0 },
          { text: 'Make it pop', group: 1 },
          { text: 'More formal, still warm', group: 0 },
          { text: 'Better vibes', group: 1 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: '[[1]] changes. Facts [[2]].',
        blanks: [['Tone', 'tone'], ['don\'t', 'do not']],
        distractors: ['Price', 'disappear'],
      },
      {
        kind: 'findBug',
        prompt: 'Which version has a fact that drifted?',
        lines: [
          'Abuela: "Saturday the 30th, 6 p.m., Casa Lupe, Oaxaca."',
          'Cousins: "End of the month, Oaxaca, be there."',
          'Colleagues: "Saturday 30th at 6 p.m., Casa Lupe, Oaxaca."',
        ],
        bug: 1,
        fix: '"Sat 30th, 6 p.m., Casa Lupe, Oaxaca."',
        explanation: '"End of the month" lost the date, time and venue. Tone can change; facts can\'t.',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which prompt makes the version for Abuela?',
        options: [
          { text: 'Rewrite this for my 89-year-old grandmother: warmer and simpler, date and place on their own line. Keep all the facts.' },
          { text: 'Make it for old people.', why: 'Vague, and a bit rude.' },
          { text: 'Make it longer.', why: 'Longer isn\'t what she needs.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Name one tone dial from the lesson.',
        answers: ['warmer', 'firmer', 'simpler', 'shorter', 'more formal', 'formal', 'softer', 'cooler', 'less formal'],
        placeholder: 'One dial',
      },
      {
        kind: 'orderLines',
        prompt: 'Order Lucía\'s three-version method.',
        lines: ['Write the message once', 'Turn the dial for Abuela', 'Turn it for the cousins', 'Turn it for the colleagues', 'Check all facts match'],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'How many versions of the invitation did you end up with?',
        prompt: 'Lucía\'s answer?',
        options: [
          { text: 'One. Everyone gets the same.', why: 'She made three.' },
          { text: 'Thirty. I kept asking for better.', why: '"Better" isn\'t a dial.' },
          { text: 'Three, same facts, different tone. The cousins\' one is two lines and a joke about Papá\'s dancing.' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Who are three very different people you message regularly? Which dial would you turn for each?',
    starters: ['For... I\'d make it...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Write one message you need to send to two very different people. Ask an AI tool for both versions using tone dials, then ask it to check the facts match.',
  },
  notes: 'Casa Lupe is the fictional Oaxaca venue run by Doña Lupe (narrated). Abuela narrated.',
};

export default lesson;
