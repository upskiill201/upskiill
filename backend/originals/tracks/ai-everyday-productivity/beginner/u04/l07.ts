import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 7. Before/After: better flashcards. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'Better flashcards',
  summary: 'Lucía asks AI for flashcards and gets twelve cards that are each a paragraph long. She remembers none of them. See what changed when she asked for small cards, in her own context.',
  minutes: 12,
  outcomes: [
    'Ask AI for small flashcards with one idea each',
    'Put cards in your own context',
    'Add cards for the mistakes you actually make',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Flashcard 3',
      before: {
        label: 'Prompt: "Make flashcards for my Portuguese opening."',
        text: 'Front: Greetings and thanks in Brazilian Portuguese\nBack: "Bom dia" is used in the morning, "boa tarde" in the afternoon, and "boa noite" in the evening. To thank someone you say "obrigado" if you are male and "obrigada" if you are female. "Muito obrigado/a" adds emphasis. The plural form "estarem" is used when...',
      },
      after: {
        label: 'Prompt: "One idea per card. Spanish on the front, Portuguese on the back, with a short example from my call. Add a card for every mistake I made this week."',
        text: 'Front: Gracias (me, a woman)\nBack: Obrigada\nExample: "Muito obrigada por estarem aqui."\n\nFront: Exquisito (delicious, in Spanish). Careful!\nBack: In Portuguese, "esquisito" means strange. Say "delicioso".\nExample: "Os nossos snacks são deliciosos."',
      },
      notes: [
        'One idea per card. A card you can answer in two seconds gets practised; a paragraph gets skipped.',
        'Spanish to Portuguese, so she practises recalling the Portuguese, the direction she needs on the call.',
        'Examples come from her own call, so each card is something she\'ll actually say.',
        'Her mistakes become cards. "Obrigado" was her most common one. And "esquisito" would have been a disaster: telling distributors their snacks are strange.',
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Flashcard prompt: "One idea per card. [My language] on the front. A short example from my real life. Add cards for the mistakes I keep making."',
    },
  ],
  apply: {
    scenario: 'Making flashcards that work.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What was wrong with the first flashcard?',
        options: [
          { text: 'Wrong language', why: 'The facts were fine.' },
          { text: 'It was a paragraph, with many ideas on one card' },
          { text: 'It was too short', why: 'The opposite.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Good flashcard, or bad flashcard?',
        groups: ['Good', 'Bad'],
        items: [
          { text: 'Front: Gracias (me) / Back: Obrigada', group: 0 },
          { text: 'Front: All Portuguese greetings / Back: a paragraph', group: 1 },
          { text: 'Front: Exquisito, careful! / Back: say "delicioso"', group: 0 },
          { text: 'Front: Grammar / Back: everything', group: 1 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The flashcard rule.',
        template: 'One [[1]] per card, with an example from my real [[2]].',
        blanks: [['idea'], ['life', 'call']],
        distractors: ['page', 'textbook'],
      },
      {
        kind: 'chatReply',
        from: 'sofia',
        message: 'Why do you add your mistakes as cards?',
        prompt: 'Lucía\'s answer?',
        options: [
          { text: 'To feel bad about them.', why: 'It\'s practical, not punishment.' },
          { text: 'Because the AI said to.', why: 'She has a better reason.' },
          { text: 'Because those are exactly the things I\'ll get wrong on the call. Practising them is the best use of 20 minutes.' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the false friend to its real meaning in Portuguese.',
        pairs: [
          ['Esquisito', 'Strange'],
          ['Polvo', 'Octopus'],
          ['Delicioso', 'Delicious'],
          ['Obrigada', 'Thank you (said by a woman)'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line in Lucía\'s draft opening would be a disaster?',
        lines: [
          'Bom dia a todos.',
          'Os nossos snacks são esquisitos.',
          'Estamos muito felizes em começar essa parceria.',
        ],
        bug: 1,
        fix: 'Os nossos snacks são deliciosos.',
        explanation: '"Esquisito" means strange in Portuguese. A flashcard caught it.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'In Portuguese, what does "esquisito" mean? (One word.)',
        answers: ['strange', 'weird', 'odd'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Why put Spanish on the front and Portuguese on the back?',
        options: [
          { text: 'So she practises producing the Portuguese, which is what the call needs' },
          { text: 'Spanish is easier to print', why: 'It\'s about which direction she practises.' },
          { text: 'No reason', why: 'The direction matters.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which prompt makes good flashcards for Marta\'s driving theory?',
        options: [
          { text: 'Make flashcards about driving.', why: 'Too broad.' },
          { text: 'Explain all road signs.', why: 'A lecture, not cards.' },
          { text: 'One sign per card: the sign\'s description on the front, its meaning on the back, with one real situation. Add cards for the 5 I got wrong today.' },
        ],
        answer: 2,
      },
      {
        kind: 'orderLines',
        prompt: 'Order Lucía\'s flashcard routine.',
        lines: ['Ask for one-idea cards', 'Add her week\'s mistakes', 'Practise front to back', 'Mark the hard ones', 'Review the hard ones tomorrow'],
      },
    ],
  },
  reflect: {
    prompt: 'What mistake do you keep making (a word, a spelling, a step at work)? Write it as one small flashcard.',
    starters: ['Front:...', 'Back:...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Ask an AI tool for 10 one-idea flashcards on something you\'re learning, with examples from your life. Practise them front to back for five minutes, twice this week.',
  },
  notes: 'False friends checked: Portuguese "esquisito" = strange (Spanish "exquisito" = exquisite/delicious); Portuguese "polvo" = octopus (Spanish "polvo" = dust). Minimum-information principle for flashcards (Wozniak, "20 rules of formulating knowledge").',
};

export default lesson;
