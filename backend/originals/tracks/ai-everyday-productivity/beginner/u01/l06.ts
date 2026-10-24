import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 6. Before/After: give it an example. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'Show it what good looks like',
  summary: 'The AI\'s invitation reads like a bank letter. Mamá would never send it. Lucía fixes it with one move: she shows the AI how her family actually writes.',
  minutes: 12,
  outcomes: [
    'Paste an example so the AI copies the style you want',
    'Describe a style with a few concrete words',
    'Never let the example\'s facts sneak into the new text',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'The save-the-date',
      before: {
        label: 'Prompt: "Write a save-the-date for my parents\' 35th anniversary."',
        text: 'Dear Guest, You are cordially invited to celebrate the 35th wedding anniversary of Mr and Mrs Hernández. Kindly reserve the date. Further details will follow. Sincerely, The Family',
      },
      after: {
        label: 'Same prompt, plus: "Write it in the style of this message my mum sent last year:" and her message.',
        text: 'Familia!! Save the date: 35 years of Rosa and Ernesto putting up with each other. Party in Oaxaca on the 30th, food, music and Papá dancing badly. More details soon, don\'t make plans! Love, Lucía and Mateo',
      },
      notes: [
        'The example taught it the family\'s tone: warm, teasing, lots of energy. No list of adjectives does that as well.',
        'Lucía also gave it real details (names, place, date), so it didn\'t have to invent any.',
        'She checked the new text didn\'t copy facts from Mamá\'s old message (last year\'s party was a christening).',
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Show, don\'t describe. "Write it like this:" plus a real example beats ten adjectives. Then check it borrowed the style, not the facts.',
    },
  ],
  apply: {
    scenario: 'Examples and style.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why did the first save-the-date sound like a bank letter?',
        options: [
          { text: 'AI can only write formally', why: 'It can write in almost any style if you show it.' },
          { text: 'It had no idea how this family writes, so it went safe and formal' },
          { text: 'Save-the-dates must be formal', why: 'Families write them however they like.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which helps the AI match your style best?',
        groups: ['Strong', 'Weak'],
        items: [
          { text: 'A real message your family sent', group: 0 },
          { text: '"Make it nice"', group: 1 },
          { text: '"Warm and teasing, like this: ..."', group: 0 },
          { text: '"Good vibes"', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'tomas',
        message: 'I pasted my old cover letter as an example and the new one says I worked at my old company until 2030.',
        prompt: 'Lucía\'s best reply?',
        options: [
          { text: 'Check the facts. It borrowed details from your example. Tell it: "copy the style only, use these facts."' },
          { text: 'Don\'t use examples ever.', why: 'Examples are powerful; just check the facts.' },
          { text: 'Send it anyway.', why: 'A wrong date on a cover letter can cost the job.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: '[[1]], don\'t describe. Then check it copied the [[2]], not the facts.',
        blanks: [['show', 'Show'], ['style', 'tone']],
        distractors: ['tell', 'dates'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line of the new invitation came from Mamá\'s old message by mistake?',
        lines: [
          'Familia!! Save the date.',
          '35 years of Rosa and Ernesto.',
          'Come and celebrate baby Sofi\'s christening!',
          'Party in Oaxaca on the 30th.',
        ],
        bug: 2,
        fix: 'Delete it. Last year\'s christening was in the example, not this party.',
        explanation: 'Examples can leak facts. Always read for details that don\'t belong.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the example to the style it teaches.',
        pairs: [
          ['Mamá\'s family message', 'Warm and teasing'],
          ['A work email from Carmen', 'Short and direct'],
          ['A wedding invitation card', 'Formal and elegant'],
          ['Mateo\'s texts', 'Memes and no punctuation'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What should you paste so the AI copies a writing style? (One word.)',
        answers: ['example', 'an example', 'examples', 'a sample', 'sample'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which prompt will match Lucía\'s family style best?',
        options: [
          { text: 'Write a fun invitation.', why: 'Fun how? It has to guess.' },
          { text: 'Write an invitation in a very informal, very family, very Mexican style.', why: 'Better, but still a description.' },
          { text: 'Write the invitation in the style of this message: [Mamá\'s message]. Use only these facts: Oaxaca, the 30th, 35 years.' },
        ],
        answer: 2,
      },
      {
        kind: 'orderLines',
        prompt: 'Order how to use an example.',
        lines: ['Find a real message in the style you want', 'Paste it: "write it like this"', 'Give the new facts', 'Read for borrowed facts', 'Fix anything that doesn\'t belong'],
      },
      {
        kind: 'mcq',
        prompt: 'Lucía wants her thank-you notes after the party to sound like her. What\'s the best example to give?',
        options: [
          { text: 'A famous author\'s letter', why: 'That would sound like the author, not her.' },
          { text: 'A message she wrote herself that she\'s proud of' },
          { text: 'No example, just "sound like me"', why: 'It doesn\'t know how she sounds.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'Find a message you wrote that sounds exactly like you. What makes it sound like you: the words, the length, the jokes?',
    starters: ['It sounds like me because...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Ask an AI tool to write a short message to a friend. Then ask again, pasting one of your real messages first with "write it in this style". Which one would you actually send?',
  },
  notes: 'Giving examples ("few-shot" prompting) is standard guidance in AI providers\' prompting guides. Names: Lucía\'s parents Rosa and Ernesto Hernández, brother Mateo (narrated). Sofi in the old message is a baby cousin, not cast Sofía.',
};

export default lesson;
