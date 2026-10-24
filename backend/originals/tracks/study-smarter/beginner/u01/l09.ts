import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 9 — when it still doesn't click: change the angle, not the volume. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: "When it still doesn't click, ask differently",
  summary: 'Efua explains moles better than the AI did, using rice at Makola Market. The lesson: change the angle, not the volume.',
  minutes: 12,
  outcomes: [
    'Ask for an explanation from a different angle',
    'Ask for an analogy from something you know well',
    'Know when to ask a person instead',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Rice at Makola',
      beats: [
        { speaker: 'narrator', text: 'Wednesday, lunch break. Kofi is stuck again. Limiting reagents. He has asked the AI three times and got three longer versions of the same explanation.' },
        { speaker: 'efua', text: 'Show me. ... Kofi, forget the AI for one minute. Imagine you\'re making jollof for the class at home.' },
        { speaker: 'efua', text: 'Each pot needs one cup of rice and two tomatoes. Your mum bought 5 cups of rice at Makola but only 6 tomatoes. How many pots?' },
        { speaker: 'kofi', text: 'Three. The tomatoes run out first.' },
        { speaker: 'efua', text: "That's a limiting reagent. The tomatoes limit you. You had extra rice, but it doesn't matter." },
        { speaker: 'tey', text: "Efua didn't explain it louder or longer. She explained it from a different angle: something Kofi already knows really well. You can ask the AI to do exactly that." },
      ],
      choice: {
        prompt: 'Next time an AI explanation doesn\'t click, what should Kofi ask?',
        options: [
          {
            text: "\"That didn't click. Explain it again with an analogy from cooking or football, and keep it under 80 words.\"",
            outcome: 'The AI compares it to a football team that needs 11 players and 1 ball: you can have 30 players, but 2 balls means only 2 matches. Different angle, same idea. It clicks.',
            best: true,
          },
          {
            text: '"Explain it again in more detail."',
            outcome: 'A fourth, even longer version of the same explanation. More of what already didn\'t work.',
          },
          {
            text: '"I\'m too stupid for chemistry."',
            outcome: 'The AI is kind about it, but nothing changes. He wasn\'t stupid. He needed a different angle.',
          },
        ],
      },
    },
    {
      kind: 'text',
      html: '<p>When an explanation doesn\'t click, asking for <em>more</em> of it rarely helps. Change the angle instead:</p><ul><li><strong>An analogy from your world:</strong> "Explain it using football / cooking / music."</li><li><strong>A picture in words:</strong> "Describe what it would look like if I could see it."</li><li><strong>Start from your mistake:</strong> "Here\'s what I think it means. Where does my idea go wrong?"</li><li><strong>The smallest example:</strong> "Show me the simplest possible case first."</li></ul><p>And if three different angles still don\'t work, <strong>ask a person</strong>: a classmate, a teacher, a mentor. That isn\'t failing. Efua just did in one minute what the AI couldn\'t.</p>',
    },
    {
      kind: 'check',
      question: 'An explanation didn\'t click twice. What is the best next ask?',
      options: ['"More detail please"', '"Explain it with an analogy from football"', '"Same again"'],
      answer: 1,
    },
  ],
  apply: {
    scenario: 'The group learns to change the angle.',
    items: [
      {
        kind: 'typeAnswer',
        prompt: 'Each pot of jollof needs 1 cup of rice and 2 tomatoes. You have 5 cups of rice and 8 tomatoes. How many pots can you make?',
        answers: ['4', 'four'],
        placeholder: 'Number',
        explanation: '8 tomatoes ÷ 2 = 4 pots. Tomatoes run out first, so they are the limiting ingredient.',
      },
      {
        kind: 'sortGroups',
        prompt: 'New angle, or just more volume?',
        groups: ['New angle', 'More volume'],
        items: [
          { text: 'Explain it with a cooking analogy', group: 0 },
          { text: 'Explain it again in more detail', group: 1 },
          { text: 'Here is my idea. Where does it go wrong?', group: 0 },
          { text: 'Make it longer', group: 1 },
          { text: 'Show me the simplest case first', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'david',
        message: "I've asked the AI about electric current five times. Still nothing. Maybe I'm just bad at Physics.",
        prompt: 'What should Kofi say?',
        options: [
          { text: 'Ask it a sixth time.', why: 'Same question, same angle, same result.' },
          { text: "You're not bad at it, you need a new angle. Ask it to explain current using water in a pipe. And bring it to Thursday's call." },
          { text: 'Skip that topic.', why: 'It will be in the exam.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        prompt: 'Why did Efua\'s jollof explanation work when the AI\'s didn\'t?',
        options: [
          { text: 'It was longer', why: 'It was much shorter.' },
          { text: 'Efua used harder words', why: 'She used everyday words.' },
          { text: 'It used something Kofi already knew well' },
        ],
        answer: 2,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build a "new angle" request.',
        tiles: ['Explain', 'it', 'with', 'an', 'analogy', 'from', 'football'],
        distractors: ['more', 'louder'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the angle to the request.',
        pairs: [
          ['Analogy', '"Explain it using cooking"'],
          ['Picture in words', '"What would it look like if I could see it?"'],
          ['Start from my mistake', '"Here\'s my idea. Where does it go wrong?"'],
          ['Smallest example', '"Show me the simplest case first"'],
        ],
      },
      {
        kind: 'findBug',
        prompt: "Which part of Kofi's plan isn't a good idea?",
        lines: [
          'Ask for an analogy from football.',
          'If that fails, ask for a picture in words.',
          'If three angles fail, give up on the topic.',
        ],
        bug: 2,
        fix: 'If three angles fail, ask a person: a classmate, teacher or mentor.',
        explanation: 'Asking a person is the next move, not giving up.',
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Tey\'s rule.',
        template: 'Change the [[1]], not the [[2]].',
        blanks: [['angle'], ['volume', 'length']],
        distractors: ['topic', 'subject'],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Kofi thinks a catalyst gets used up in a reaction. Which question finds his mistake fastest?',
        options: [
          { text: 'What is a catalyst?', why: 'A new explanation, but it might not touch his mistake.' },
          { text: 'I think a catalyst gets used up in a reaction. Where does my idea go wrong?' },
          { text: 'Explain catalysts in more detail.', why: 'More volume, not a new angle.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Ask the AI again with a new angle, or ask a person?',
        groups: ['New AI angle', 'Ask a person'],
        items: [
          { text: 'The first explanation was too wordy', group: 0 },
          { text: 'Three different angles still haven\'t worked', group: 1 },
          { text: 'You need to know exactly what your teacher expects', group: 1 },
          { text: 'You want a football analogy', group: 0 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'What do you know really well (a sport, cooking, music, a game)? Write one topic you could ask the AI to explain using it.',
    starters: ['Something I know really well is...', 'I could ask for an analogy about...'],
  },
  deepen: {
    title: 'Try it tonight',
    summary: "Take one topic that hasn't clicked and ask for it from two new angles: an analogy from your world, and \"here's my idea, where does it go wrong?\"",
  },
  notes: 'Makola Market is a major market in Accra. Limiting reagent analogy (recipe) is a standard teaching analogy. Catalyst: speeds a reaction without being permanently used up. Electric current water-pipe analogy is a standard (imperfect) analogy.',
};

export default lesson;
