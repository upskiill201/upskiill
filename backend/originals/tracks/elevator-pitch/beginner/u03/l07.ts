import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 7. Before/After: vague vs vivid (concreteness). */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'Vague vs vivid',
  summary: 'Ada\'s draft says "a seamless, innovative solution for community finance". Arjun asks: "Can you take a photo of that?" She can\'t. That\'s the problem.',
  minutes: 11,
  outcomes: [
    'Spot vague, abstract words in a pitch',
    'Replace them with concrete details people can picture',
    'Use the "can you photograph it?" test',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Vague vs vivid',
      before: {
        label: 'Vague',
        text: 'Ajo Tracker is a seamless, innovative solution that empowers communities to optimise their collective financial engagement.',
      },
      after: {
        label: 'Vivid',
        text: 'Every month, a woman in Surulere used to chase forty church members on WhatsApp to see who\'d paid. Now she opens one screen and sees it in two seconds.',
      },
      notes: [
        'A real place (Surulere), a real person, a real number (forty).',
        'An action you can picture: chasing people on WhatsApp.',
        'The benefit as a moment: "one screen, two seconds".',
      ],
    },
    {
      kind: 'text',
      html: "<p><strong>Why concrete wins.</strong> Researchers have long found that concrete words (\"notebook\", \"WhatsApp\", \"two seconds\") are easier to remember than abstract ones (\"solution\", \"engagement\", \"optimise\"). One explanation: concrete words create a picture as well as a meaning, so the brain has two ways to store them. The book <em>Made to Stick</em> lists \"concrete\" as one of six things that make ideas memorable.</p><p><strong>The photo test:</strong> for each phrase, ask \"Could I take a photo of this?\" You can photograph a notebook. You can't photograph \"collective financial engagement\".</p>",
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'If you can\'t photograph it, people can\'t picture it. Swap buzzwords for people, places, objects and moments.',
    },
  ],
  apply: {
    scenario: 'Arjun\'s photo test.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Could you photograph it?',
        groups: ['Yes (concrete)', 'No (abstract)'],
        items: [
          { text: 'A battered notebook', group: 0 },
          { text: 'Seamless innovation', group: 1 },
          { text: 'Forty WhatsApp messages', group: 0 },
          { text: 'Collective financial engagement', group: 1 },
          { text: 'One screen, two seconds', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why are concrete words easier to remember?',
        options: [
          { text: 'One explanation: they create a picture as well as a meaning' },
          { text: 'They\'re longer', why: 'Often shorter.' },
          { text: 'They sound more professional', why: 'Abstract words usually sound more "professional", and are forgotten.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Swap the buzzword for something vivid.',
        pairs: [
          ['"Optimises collection"', '"No more chasing 40 people on WhatsApp"'],
          ['"Empowers communities"', '"A church treasurer gets her Sundays back"'],
          ['"Seamless experience"', '"One screen, two seconds"'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'But "innovative solution" sounds so professional!',
        prompt: 'What does Arjun say?',
        options: [
          { text: 'True, add "disruptive" too.', why: 'More buzzwords, less memory.' },
          { text: 'It sounds like everyone else\'s pitch. "A woman in Surulere chasing 40 people" sounds like YOURS.' },
          { text: 'Use it ten times.', why: 'Still not a picture.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Arjun\'s test: could you take a ___ of it? (one word)',
        answers: ['photo', 'picture', 'photograph'],
        placeholder: 'One word',
      },
      {
        kind: 'findBug',
        prompt: 'Ada\'s pitch. Which line fails the photo test?',
        lines: [
          'Ten colleagues, one battered notebook.',
          'Our synergistic platform leverages holistic paradigms.',
          'Now the treasurer checks one screen in two seconds.',
        ],
        bug: 1,
        fix: 'Now nobody has to chase anyone on WhatsApp.',
        explanation: 'Pure buzzwords. Nobody can picture a "holistic paradigm".',
      },
      {
        kind: 'mcq',
        prompt: 'Which is the most vivid way to describe Ada\'s benefit?',
        options: [
          { text: '"Improved transparency."', why: 'Abstract.' },
          { text: '"Better efficiency for groups."', why: 'Still abstract.' },
          { text: '"Tunde can\'t say he paid when he didn\'t. It\'s right there on the screen."' },
        ],
        answer: 2,
      },
      {
        kind: 'orderLines',
        prompt: 'Put the vivid line together.',
        lines: ['Every month, a woman in Surulere', 'chased forty church members on WhatsApp.', 'Now she opens one screen', 'and sees it in two seconds.'],
      },
      {
        kind: 'fillBlank',
        prompt: 'The vivid version.',
        template: 'She used to [[1]] forty members on [[2]]. Now she sees it in two [[3]].',
        blanks: [['chase'], ['WhatsApp'], ['seconds']],
        distractors: ['optimise', 'paradigms'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the benefit as a moment.',
        tiles: ['One', 'screen,', 'two', 'seconds.'],
        distractors: ['seamless'],
      },
    ],
  },
  reflect: {
    prompt: 'Find the most abstract word in your pitch ("solution", "passionate", "innovative"...). Replace it with a person, a place, an object or a moment.',
    starters: ['Abstract word: ...', 'Vivid replacement: ...'],
  },
  deepen: {
    title: 'Buzzword hunt',
    summary: 'Read your pitch, CV or bio and highlight every word you couldn\'t photograph. Replace at least three with something concrete.',
  },
  notes: 'Concreteness effect and dual-coding theory: Paivio (1971, 1986) — concrete words are better remembered, plausibly because they are encoded verbally and as images (stated as "one explanation"). Made to Stick (Heath & Heath, 2007): SUCCESs principles include Concrete. The Surulere treasurer is fictional (the 40-member church group from Chapter 2).',
};

export default lesson;
